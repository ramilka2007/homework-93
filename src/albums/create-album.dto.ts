import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  artist: string;

  @IsNotEmpty()
  title: string;

  release: number;
}
