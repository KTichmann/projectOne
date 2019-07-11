import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import { Snippet } from "./Snippet";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text")
  content: string;

  @Column("date", { default: new Date() })
  created_at: Date;

  @ManyToOne(() => User, user => user.comments) user: User;

  @ManyToOne(() => Snippet, snippet => snippet.id) snippet: Snippet;
}
