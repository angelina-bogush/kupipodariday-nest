import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsString, MinLength, IsEmail, MaxLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  @IsString()
  @MaxLength(30)
  @MinLength(2)
  username: string;

  @Column({ length: 200, default: 'Пока ничего не рассказал о себе' })
  @MinLength(2)
  @MaxLength(200)
  @IsString()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

//   @OneToMany(() => Gift, gift => gift.user)
//   wishes: Gift[];

//   @OneToMany(() => Gift, gift => gift.user)
//   offers: Gift[];

//   @OneToMany(() => Wishlist, wishlist => wishlist.user)
//   wishlists: Wishlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
