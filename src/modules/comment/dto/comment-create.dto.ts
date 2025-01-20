import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CommentCreateDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  starCount: number;

  @IsNotEmpty()
  dateBooking: string;
}
