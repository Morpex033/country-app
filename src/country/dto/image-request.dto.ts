import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from './image.dto';

export class ImageRequestDto {
  @ApiProperty()
  err: boolean;

  @ApiProperty()
  msg: string;

  @ApiProperty({ type: ImageDto, isArray: true })
  data: ImageDto[];
}
