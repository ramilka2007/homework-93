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
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { CreateTrackDto } from './create-track.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { UserDocument } from '../schemas/user.schema';
import { Request } from 'express';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  async getTracks(@Query('album') album: string) {
    if (album) {
      return this.trackModel.find({ album: album });
    } else {
      return this.trackModel.find();
    }
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async createTrack(@Body() trackDto: CreateTrackDto) {
    const track = await this.trackModel.create({
      album: trackDto.album,
      title: trackDto.title,
      duration: trackDto.duration ? trackDto.duration : null,
    });

    return track;
  }

  @UseGuards(TokenAuthGuard)
  @Delete(':id')
  async deleteTrack(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as UserDocument;

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else if (user.role === 'admin') {
      const track = await this.trackModel.findByIdAndDelete({ _id: id });

      if (!track) {
        throw new NotFoundException(`Track with id ${id} not found`);
      }

      return 'Track has been deleted';
    } else {
      return 'You do not have permission to delete';
    }
  }
}
