import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsPhoneNumber,
} from 'class-validator';

export class CommentCreateDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  starCount: number;
}
