import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { CreateTrackDto } from './create-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>) {
  }

  @Get()
  async getTracks(@Query('album') album: string) {
    if (album) {
      return this.trackModel.find({album: album});
    } else {
      return this.trackModel.find();
    }
  }

  @Post()
  async createTrack(@Body() trackDto: CreateTrackDto) {
    const track = await this.trackModel.create({
      album: trackDto.album,
      title: trackDto.title,
      duration: trackDto.duration ? trackDto.duration : null,
    });

    return track;
  }

  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    const track = await this.trackModel.findByIdAndDelete({_id: id});

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return 'Track has been deleted';
  }
}
