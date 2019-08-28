import * as bcrypt from "bcryptjs";
import {
	Entity,
	Column,
	BaseEntity,
	PrimaryGeneratedColumn,
	BeforeInsert,
	OneToMany
} from "typeorm";
import { Snippet } from "./Snippet";
import { Comment } from "./Comment";
import { Following } from "./Following";

@Entity("users")
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid") id: string;

	@Column("varchar", { length: 255 })
	email: string;

	@Column("text") password: string;

	@Column("text") username: string;

	@Column("boolean", { default: false }) confirmed: boolean;

	@Column("boolean", { default: false }) forgotPasswordLocked: boolean;

	@OneToMany(() => Snippet, snippet => snippet.user) snippets: Snippet[];

	@OneToMany(() => Comment, comment => comment.user) comments: Comment[];

	@OneToMany(() => Following, following => following.followed)
	following: Following[];

	@BeforeInsert()
	async hashPasswordBeforeInsert() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
