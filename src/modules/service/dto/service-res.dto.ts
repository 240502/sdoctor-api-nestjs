import { Expose } from 'class-transformer';

export class ServiceResDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  summary: string;

  @Expose()
  price: string;

  @Expose({ name: 'clinic_id' })
  clinicId: number;

  @Expose({ name: 'category_id' })
  categoryId: number;

  @Expose({ name: 'image' })
  image: string;

  @Expose({ name: 'preparation_process' })
  preparationProcess: string;

  @Expose({ name: 'views' })
  views: number;

  @Expose({ name: 'service_detail' })
  serviceDetail: string;

  @Expose({ name: 'clinic_name' })
  clinicName: string;

  @Expose({ name: 'cover_image' })
  coverImage: string;

  @Expose({ name: 'location' })
  location: string;

  @Expose({ name: 'category_name' })
  categoryName: string;

  @Expose({ name: 'RecordCount' })
  recordCount: number;
}
