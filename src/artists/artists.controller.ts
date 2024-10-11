import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArtistDto } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('artists')
export class ArtistsController {
  constructor(@InjectModel(Artist.name) private artistModel: Model<ArtistDocument>) {
  }

  @Get()
  async getArtists() {
    return this.artistModel.find();
  }

  @Get(':id')
  async getArtist(@Param('id') id: string) {
    const artist = await this.artistModel.findById({_id: id});

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {dest: './public/images'}))
  async createArtist(@Body() artistDto: CreateArtistDto, @UploadedFile() file: Express.Multer.File,) {
    const artist = await this.artistModel.create({
      name: artistDto.name,
      description: artistDto.description,
      image: file ? 'images/' + file.filename : null
    });

    return artist
  }

  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    const artist = await this.artistModel.findByIdAndDelete({_id: id});

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return 'Artist has been deleted';
  }

}
