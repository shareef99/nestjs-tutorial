import { IsEmail, IsString, IsEnum, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(["ADMIN", "INTERN"])
  role: "ADMIN" | "INTERN";
}
