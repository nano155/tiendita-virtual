

export enum Role {
  admin = "admin",
  user = "user",
}

export class UserEntity {
    public first_name: string;
    public last_name: string;
    public email: string;
    public age: number;
    public password: string;
    public cart: string;
    public role: Role;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    age: number,
    password: string,
    cart: string,
    role?: Role
  ) {
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.age = age
    this.password = password
    this.cart = cart
    this.role = role? role:Role.user
  }

  static fromObject(user: UserEntity): UserEntity {
    const { first_name, last_name, email, age, password, cart, role } = user;

    

    return new UserEntity(
      first_name,
      last_name,
      email,
      age,
      password,
      cart,
      role
    );
  }
}
