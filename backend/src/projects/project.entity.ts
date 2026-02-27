import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ default: true })
  active!: boolean;
}
