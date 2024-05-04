import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';


@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offer)
        private readonly offerRepository: Repository<Offer>,
    ) {}

    async create(offerData: Partial<Offer>): Promise<Offer> {
        const offer = this.offerRepository.create(offerData);
        return this.offerRepository.save(offer);
    }

    async findOne(queryFilter: any): Promise<Offer> {
        return this.offerRepository.findOne({ where: queryFilter });
    }

    async updateOne(id: any, offerData: Partial<Offer>) {
        await this.offerRepository.update(id, offerData);
        const updatedOffer = await this.offerRepository.findOne({ where: id });
    }

    async removeOne(id: number): Promise<boolean> {
        const result = await this.offerRepository.delete(id);
        return result.affected > 0;
    }
}

