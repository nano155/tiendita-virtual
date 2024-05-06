import { UserEntity } from '../../domain';
import { UserDatasource } from '../../domain/datasources/user.datasource';
import { LoginUserDto, RegisterUserDto } from '../../domain/dto';
import { UserRepository } from '../../domain/repositories/user.repository';


export class UserRepositoryImpl implements UserRepository{

    constructor(
        public readonly UserService:UserDatasource
    ){}
    validateEmail(token: string): Promise<Boolean> {
        return this.UserService.validateEmail(token)
    }
    loginUser(userDto: LoginUserDto): Promise<{ userEntity: Omit<UserEntity, 'password'>; token: any; }> {
        return this.UserService.loginUser(userDto)
    }
    registerUser(user: RegisterUserDto): Promise<{ userEntity: Omit<UserEntity, 'password'>; token: any }>  {
        return this.UserService.registerUser(user)
    }

}