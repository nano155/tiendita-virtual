
export enum Eerrors {
ROUTING_ERROR = 1,
INVALID_TYPES_ERROR = 2,
DATABASE_ERROR = 3
}

export interface objectError {
    name:string,
    cause:string,
    message:string,
    code:Eerrors
}

export class CustomError extends Error{
    
    public cause;
    public code;

    private constructor (
        {name="Error", cause, message, code=1 }:objectError
    ){
        super()
        this.name = name;
        this.message= message;
        this.cause = cause;
        this.code = code;
    }


    static createError({name="Error", cause, message, code=1 }: objectError){
        const error = new CustomError({name, cause, message, code})
        throw error
    }
}