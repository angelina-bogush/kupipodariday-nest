import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsString, MinLength, IsEmail, MaxLength, minLength, IsNumber, IsDecimal, IsUrl, IsArray } from 'class-validator';

@Entity()

export class WishList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 250})
    @IsString()
    @MinLength(1)
    @MaxLength(250)
    name: string

    @Column({length: 1500})
    @MaxLength(1500)
    @IsString()
    description: string

    @Column()
    image: string

    @Column('simple-array')
    items: string[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}