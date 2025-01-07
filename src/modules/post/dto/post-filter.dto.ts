export class PostFilterDto {
  searchContent: string | null;
  categoryId: number | null;
  pageIndex: number | null;
  pageSize: number | null;
  status: string;
  authorId: number;
}
