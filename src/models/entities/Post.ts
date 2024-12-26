import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostCategory } from "./PostCategory";

@Index("fk_constraint_category", ["categoryId"], {})
@Entity("post", { schema: "sdoctor" })
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("int", { name: "author_id" })
  authorId: number;

  @Column("datetime", { name: "public_date", nullable: true })
  publicDate: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("varchar", { name: "status", length: 100 })
  status: string;

  @Column("int", { name: "category_id" })
  categoryId: number;

  @Column("int", { name: "views", nullable: true })
  views: number | null;

  @Column("varchar", { name: "featured_image", nullable: true, length: 500 })
  featuredImage: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => PostCategory, (postCategory) => postCategory.posts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "postCategoryId" }])
  category: PostCategory;
}
