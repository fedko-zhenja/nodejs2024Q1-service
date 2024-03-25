import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  async createTrack(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.createTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.createAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.createArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.removeArtist(id);
  }
}
