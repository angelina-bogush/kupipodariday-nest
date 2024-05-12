import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishList } from './wishlist.entity';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { CreateWishlistDto } from './dto/createWishlistDto';
import { UpdateWishlistDto } from './dto/updateWishlistDto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishList)
    private readonly wishlistRepository: Repository<WishList>,
    private readonly usersService: UsersService,
    private readonly wishService: WishesService,
  ) {}

  find(): Promise<WishList[]> {
    return this.wishlistRepository.find({
      relations: ['owner', 'items'],
    });
  }

  async create(
    createWishlistDto: CreateWishlistDto,
    userId: number,
  ): Promise<WishList> {
    const user = await this.usersService.findUserById(userId);
    const wishes = await this.wishService.find(createWishlistDto.itemsId);

    return this.wishlistRepository.save({
      ...createWishlistDto,
      owner: user,
      items: wishes,
    });
  }

  async findOne(id: number): Promise<WishList> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    if (!wishlist) {
      throw new NotFoundException('Вишлист не найден');
    }

    return wishlist;
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ) {
    const wishlist = await this.findOne(id);

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException('Вы не можете менять чужие Вишлисты');
    }
    if (updateWishlistDto.itemsId) {
      //   const { itemsId, ...restDto } = updateWishlistDto;
      const wishes = await this.wishService.find(updateWishlistDto.itemsId);
      wishlist.items.push(...wishes);
      await this.wishlistRepository.save(wishlist);
      await this.wishlistRepository.update(id, updateWishlistDto);
    } else {
      await this.wishlistRepository.update(id, updateWishlistDto);
    }
    return wishlist;
  }

  async deleteOne(wishId: number, userId: number) {
    const wishlist = await this.findOne(wishId);
    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы не можете удалить вишлисты других пользователей',
      );
    }
    await this.wishlistRepository.delete(wishId);
    return wishlist;
  }
}
