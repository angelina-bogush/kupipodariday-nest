import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsString, MinLength, IsEmail, MaxLength, minLength, IsNumber, IsDecimal, IsUrl, IsArray } from 'class-validator';

@Entity()

export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string

    @Column()
    item: string

    @Column('decimal', { precision: 10, scale: 2 })
    @IsNumber()
    @IsDecimal({ decimal_digits: '2' })
    amount: number

    @Column({default: false})
    hidden: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}