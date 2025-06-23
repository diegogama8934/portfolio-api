import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  createdAt: Date;

  @Column()
  place: string;

  @Column()
  email: string;
}
