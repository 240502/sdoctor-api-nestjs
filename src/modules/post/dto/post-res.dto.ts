import { Expose, Transform } from 'class-transformer';

export class PostResDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose({ name: 'author_id' })
  authorId: number;

  @Expose({ name: 'public_date' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  publicDate: Date | null;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  updatedAt: Date | null;

  @Expose({ name: 'status' })
  status: string;

  @Expose({ name: 'category_id' })
  categoryId: number;

  @Expose({ name: 'featured_image' })
  featuredImage: string;

  @Expose({ name: 'full_name' })
  fullName: string;

  @Expose()
  image: string;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  createdAt: Date;

  @Expose({ name: 'RecordCount' })
  recordCount: number;
}
