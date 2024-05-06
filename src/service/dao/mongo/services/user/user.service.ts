import {
  BcryptAdapter,
  envs,
  JwtAdapter,
  Validator,
} from "../../../../../config";
import {
  LoginUserDto,
  RegisterUserDto,
  Role,
  UserDatasource,
  UserEntity,
} from "../../../../../domain";
import { userModel } from "../../models/user.model";
import { CartService } from "../cart/cart.service";
import { EmailService } from "../email/email.service";

export class UserService implements UserDatasource {
  constructor(private readonly emailService: EmailService) {}
 

  async loginUser(
    userDto: LoginUserDto
  ): Promise<{ userEntity: Omit<UserEntity, "password">; token: any }> {
    try {
      const userFind = await userModel.findOne({ email: userDto.email });
      if (!userFind) throw new Error(`Invalid credentials`);

      const isMatch = BcryptAdapter.compare(
        userDto.password,
        userFind.password
      );

      if (!isMatch) throw new Error("Invalid credentials");

      const userEntity = UserEntity.fromObject({
        first_name: userFind.first_name,
        last_name: userFind.last_name,
        email: userFind.email,
        age: userFind.age,
        password: userFind.password,
        cart: userFind.cart._id.toString(),
        role: userFind.role === Role.admin ? Role.admin : Role.user,
      });

      const { password, ...userEntityWhithoutPassword } = userEntity;

      const token = await JwtAdapter.generateToken(userEntity);

      return {
        userEntity: userEntityWhithoutPassword,
        token: token,
      };
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  async registerUser(
    userDto: RegisterUserDto
  ): Promise<{ userEntity: Omit<UserEntity, "password">; token: any }> {
    try {
      const cartService = new CartService();
      const userFind = await userModel.findOne({ email: userDto.email });

      if (userFind) {
        throw new Error(
          `Ya existe un usuario con el correo electrónico ${userDto.email}`
        );
      }
      const cart = await cartService.createCart();
      if (!cart) throw new Error("Internal server error");

      const validatorId = Validator.isMongoId(cart.id);

      if (!validatorId) throw new Error("Mongo Id is not valid!!");

      const user = new userModel({
        first_name: userDto.first_name,
        last_name: userDto.last_name,
        email: userDto.email,
        age: userDto.age,
        password: BcryptAdapter.hash(userDto.password),
        cart: cart.id.toString(),
        role: userDto.role,
      });

      if (!user) throw new Error("Internal server error");

      await user.save();

      

      await this.sendEmailValidationLink(user.email);

      const userEntity = UserEntity.fromObject({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        password: BcryptAdapter.hash(user.password),
        cart: cart.id.toString(),
        role: user.role === Role.admin ? Role.admin : Role.user,
      });

      const { password, ...userEntityWhithoutPassword } = userEntity;

      const token = await JwtAdapter.generateToken(userEntity);

      return {
        userEntity: userEntityWhithoutPassword,
        token: token,
      };
    } catch (error) {
      throw Error(`Error${error}`);
    }
  }

  private async sendEmailValidationLink(email: string) {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw new Error("Error obteniendo token!");
    

    const link = `${envs.WEBSERVICE_URL}/users/validate-email/${token}`;

    const html = `
    <h1> Valida tu email</h1>
    <p> Click en el enlace para validar tu email! </p>
    <a  href="${link}">Valida tu email: ${email}</a> 
    `;
    const options = {
      to: email,
      subject: "Valida tu email",
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw new Error("Error sending email");
  }
  

  public async validateEmail(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw new Error("Invalid token");

    

    const { email } = (payload as { payload: { email: string } }).payload;
    
    console.log(email);
    
    

    if (!email) throw new Error("Email not in token");

    const user = await userModel.findOne({ email: email });

    if (!user) throw new Error("Email no existe");

    user.emailValidate = true

    await user.save()

    return true
  }
}
