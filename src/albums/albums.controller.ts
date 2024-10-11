import {
  Body,
  Controller, Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './create-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>) {
  }

  @Get()
  async getAlbums(@Query('artist') artist: string) {
    if (artist) {
      return this.albumModel.find({artist: artist});
    } else {
      return this.albumModel.find();
    }
  }

  @Get(':id')
  async getAlbum(@Param('id') id: string) {
    const album = await this.albumModel.findById({_id: id});

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {dest: './public/images'}))
  async createAlbum(@Body() albumDto: CreateAlbumDto, @UploadedFile() file: Express.Multer.File,) {
    const album = await this.albumModel.create({
      artist: albumDto.artist,
      title: albumDto.title,
      release: albumDto.release,
      image: file ? 'images/' + file.filename : null
    });

    return album;
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    const album = await this.albumModel.findByIdAndDelete({_id: id});

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return 'Album has been deleted';
  }
}
