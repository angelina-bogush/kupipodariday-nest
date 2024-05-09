import { Injectable, BadRequestException, NotFoundException, ForbiddenException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './wish.entity';
import { Repository, In } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateWishDto } from './dto/createWishDto';
import { UpdateWishDto } from './dto/updateWishDto';
@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
    private readonly userService: UsersService,
  ) { }
  async create(id: number, createWishDto: CreateWishDto): Promise<Wish> {
    const user = await this.userService.findUserById(id);
    return this.wishRepository.save({
      ...createWishDto,
      owner: user,
    });
  }
  async findOne(id: number) {
    const wish = await this.wishRepository.findOne({
      where: {
        id,
      },
    });
    if (!wish) throw new BadRequestException('Не найдено');
    return wish;
  }
  async findTop(records: number) {
    return this.wishRepository.find({
      order: { copied: 'DESC' },
      take: records,
      relations: ['owner', 'offers']
    });
  }
  async findLast(records: number): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: records,
      relations: ['owner', 'offers'],
    });
  }

  async update(wishId: number, updateWishDto: UpdateWishDto) {
    const wish = await this.findOne(wishId);
    if (!wish) {
      throw new NotFoundException('Такого подарка не существует');
    }
    if (updateWishDto.price && wish.offers.length > 0)
      throw new BadRequestException(
        'Невозможно редактировать',
      );
    return await this.wishRepository.update(wishId, updateWishDto);
  }


  async deleteOne(wishId: number, userId: number): Promise<Wish> {
    const wish = await this.findOne(wishId);

    if (wish.owner.id !== userId) {
      throw new BadRequestException('Вы не можете удалять чужие подарки');
    }

    await this.wishRepository.delete(wishId);
    return wish;
  }
  async copyOne(wishId: number, userId: number) {
    const { name, link, image, price, description, copied, id, ...data } = await this.findOne(wishId);
    const owner = await this.userService.findUserById(userId);

    await this.wishRepository.update(id, { copied: copied + 1 });
    return this.wishRepository.save({
      ...data,
      owner,
    });
  }
  find(giftsId: number[]): Promise<Wish[]> {
    return this.wishRepository.find({
      where: { id: In(giftsId) },
    });
  }
}
