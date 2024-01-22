import { PartialType } from '@nestjs/mapped-types';
import { CreateLobCatDto } from './create-lob_cat.dto';

export class UpdateLobCatDto extends PartialType(CreateLobCatDto) {}
