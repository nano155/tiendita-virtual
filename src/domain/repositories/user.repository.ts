import { LoginUserDto, RegisterUserDto } from "../dto";
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository{

    abstract registerUser(userDto:RegisterUserDto): Promise<{ userEntity: Omit<UserEntity, 'password'>; token: any }>
    abstract  loginUser(userDto:LoginUserDto):Promise<{userEntity: Omit<UserEntity, 'password'>; token: any}> 
    abstract validateEmail(token:string):Promise<Boolean>
  
} 