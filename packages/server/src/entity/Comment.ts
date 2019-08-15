import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Snippet } from "./Snippet";

@Entity("comments")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text")
  content: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column("text")
  @ManyToOne(() => User, user => user.comments)
  user: string;

  @Column("text")
  @ManyToOne(() => Snippet, snippet => snippet.id)
  snippet: string;
}
