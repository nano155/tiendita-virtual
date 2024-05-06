import { Validator } from "../../../config";

export class LoginUserDto{
    public email:string;
    public password:string;
    private constructor(
        email:string,
        password:string
    ){
        this.email=email
        this.password=password
    }

    static create(loginDto:{[key:string]:any}):[string?, LoginUserDto?]{
        try {
            const loginUser = Validator.validatorUserDataTypeLogin(loginDto)
            const {email, password} = loginUser
            return [undefined, new LoginUserDto(email, password)]            
        } catch (error) {
            if (error instanceof Error) {
                return [error.message, undefined];
            } else {
                return ['Unknown error occurred', undefined];
            }  
        }


    }
}