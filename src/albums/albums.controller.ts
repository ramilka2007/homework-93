import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './create-album.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { Request } from 'express';
import { UserDocument } from '../schemas/user.schema';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAlbums(@Query('artist') artist: string) {
    if (artist) {
      return this.albumModel.find({ artist: artist });
    } else {
      return this.albumModel.find();
    }
  }

  @Get(':id')
  async getAlbum(@Param('id') id: string) {
    const album = await this.albumModel.findById({ _id: id });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './public/images' }))
  async createAlbum(
    @Body() albumDto: CreateAlbumDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const album = await this.albumModel.create({
      artist: albumDto.artist,
      title: albumDto.title,
      release: albumDto.release,
      image: file ? 'images/' + file.filename : null,
    });

    return album;
  }

  @UseGuards(TokenAuthGuard)
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as UserDocument;
    if (!user) {
      throw new NotFoundException('User with id ${id} not found');
    } else if (user.role === 'admin') {
      const album = await this.albumModel.findByIdAndDelete({ _id: id });

      if (!album) {
        throw new NotFoundException(`Album with id ${id} not found`);
      }

      return 'Album has been deleted';
    } else {
      return 'You do not have permission to delete';
    }
  }
}
