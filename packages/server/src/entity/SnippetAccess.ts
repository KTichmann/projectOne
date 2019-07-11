import {
  Entity,
  BaseEntity,
  OneToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn
} from "typeorm";
import { Snippet } from "./Snippet";

@Entity("snippetAccess")
export class SnippetAccess extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;
  @OneToOne(() => Snippet)
  @JoinColumn()
  snippet: Snippet;

  @Column({ type: "integer", array: true })
  id_array: number[];
}
