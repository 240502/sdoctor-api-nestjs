import { Expose } from 'class-transformer';

export class HomeMenuResDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  url: string;

  @Expose()
  visible: number;
}
