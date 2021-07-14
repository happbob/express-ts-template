import { IsUUID, Contains, IsInt, Length, IsEmail, IsFQDN,
    IsDate, Min, Max } from "class-validator";
  
export class postUserDto{
    constructor(req:any){
        this.email = req.email;
        this.password = req.password;
        this.nickname = req.nickname;
    }

    @IsEmail()
    public email: string;

    @Length(10, 20)
    public password: string;

    @Length(10, 20)
    public nickname: string;
};