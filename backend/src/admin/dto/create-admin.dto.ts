import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAdminDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
 
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    salt: string;

    @IsNotEmpty()
    roles: string[];
}
