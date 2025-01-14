import { Expose } from 'class-transformer';

export class PostCategoryResDto {
  @Expose({ name: 'post_category_id' })
  postCategoryId: number;

  @Expose({ name: 'name' })
  name: string;

  @Expose()
  description: string;

  @Expose()
  image: string;
}
