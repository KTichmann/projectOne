import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity("snippets")
export class Snippet extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  content: string;

  @Column("date", { default: new Date() })
  createdAt: Date;

  @Column("varchar", { length: 255 }) language: string;

  @Column("text") visibility: string;

  @Column("text", { array: true }) tags: string[];

  @Column("text")
  @ManyToOne(() => User, user => user.snippets)
  user: string;
}
