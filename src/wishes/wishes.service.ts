import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
    constructor(
        @InjectRepository(Wish)
        private readonly wishRepository: Repository<Wish>,
    ) {}
    async create(wishData: Partial<Wish>): Promise<Wish> {
        const wish = this.wishRepository.create(wishData);
        return this.wishRepository.save(wish);
    }
    async findOne(query: any): Promise<Wish> {
        return this.wishRepository.findOne({ where: query });
    }
    async find(query: any): Promise<Wish[]> {
        return this.wishRepository.find({ where: query });
    }
    async updateOne(query: any, newData: Partial<Wish>): Promise<Wish> {
        const wish = await this.wishRepository.findOne({ where: query });
        if (!wish) {
            throw new Error('Wish not found');
        }
        Object.assign(wish, newData);
        return this.wishRepository.save(wish);
    }
    async removeOne(query: any): Promise<void> {
        const wish = await this.wishRepository.findOne({ where: query });
        if (!wish) {
            throw new Error('Wish not found');
        }
        await this.wishRepository.remove(wish);
    }



}
