import {
	Entity,
	BaseEntity,
	PrimaryColumn,
	ManyToOne,
	JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Following extends BaseEntity {
	@PrimaryColumn()
	followed: string;

	@PrimaryColumn()
	following: string;

	@ManyToOne(() => User, user => user.username)
	@JoinColumn({ name: "followed" })
	followedUser: User;

	@ManyToOne(() => User, user => user.id, { primary: true })
	@JoinColumn({ name: "following" })
	followingUser: Promise<User>;
}
