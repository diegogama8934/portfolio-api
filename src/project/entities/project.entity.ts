import { Reference } from 'src/references/entities/reference.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Reference, (reference) => reference.project)
  references: Reference[];

  @Column({ nullable: true })
  enResume: string;

  @Column({ nullable: true })
  esResume: string;

  @Column({ default: false })
  published: boolean;
}
