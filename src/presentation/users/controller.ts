import { Request, Response } from "express";
import { LoginUserDto, RegisterUserDto, UserRepository } from "../../domain";

export class UsersController {
  constructor(public readonly userRepository: UserRepository) {}

  public login = (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body);

    if (error) return res.status(500).send(error);

    this.userRepository
      .loginUser(loginDto!)
      .then((user) => {
        res.cookie("token", user.token);
        return res.json(user);
      })
      .catch((error) => res.status(500).json({error: error.message}));
  };

  public register = async (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(500).json({error:error});

    this.userRepository
      .registerUser(registerDto!)
      .then((user) => {
        res.cookie("token", user.token);
        return res.json(user);
      })
      .catch((error) => res.status(500).json({error: error.message}));
  };

  public logout = (req:Request, res:Response )=>{

    res.cookie('token', '', {
        expires: new Date(0)
    })
    res.sendStatus(200)
  }
}
