import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity("post_category", { schema: "sdoctor" })
export class PostCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "post_category_id" })
  postCategoryId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 255 })
  image: string | null;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
