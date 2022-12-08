import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches('[0-9a-zA-Z]{6,}', '', {
    message: 'Your password must have a minimun length of 6 ',
  })
  password: string;
}
