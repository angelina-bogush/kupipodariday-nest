import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsString, MinLength, IsEmail, MaxLength, minLength, IsNumber, IsDecimal, IsUrl, IsArray } from 'class-validator';

@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 })
    @MinLength(1)
    @MaxLength(250)
    name: string

    @Column()
    @IsString()
    link: string

    @Column()
    image: string

    @Column('decimal', { precision: 10, scale: 2 })
    @IsNumber()
    @IsDecimal({ decimal_digits: '2' })
    price: number;


    @Column()
    @Column('decimal', { precision: 10, scale: 2 })
    @IsNumber()
    @IsDecimal({ decimal_digits: '2' })
    raised: number

    @Column()
    @IsString()
    owner: string

    @Column({ length: 1024 })
    @MinLength(1)
    @MaxLength(1024)
    description: string

    @Column('simple-array')
    @IsArray()
    offers: string[];


    @Column('int')
    copied: number;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}