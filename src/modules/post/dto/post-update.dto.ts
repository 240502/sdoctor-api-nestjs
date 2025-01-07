import { IsNotEmpty, IsNumber } from 'class-validator';
import { PostCreateDto } from './post-create.dto';

export class PostUpdateDto extends PostCreateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
