import { IsNotEmpty } from 'class-validator';
import { IdExists } from '../global/validators/id-exist.validator';

export class CreateAlbumDto {
  @IdExists('artist')
  @IsNotEmpty()
  artist: string;

  @IsNotEmpty()
  title: string;

  release: number;
}
