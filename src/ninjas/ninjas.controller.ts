import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from '../belt/belt.guard';
import { IdParamDto } from './dto/idParam.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import {
  createNinjaSchema,
  CreateNinjaZodDto,
} from './dto/create-ninja-zod.dto';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    const service = new NinjasService();
    return service.getNinjas(weapon);
  }

  @Get(':id')
  getSinleNinja(@Param() { id }: IdParamDto) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createNinjaSchema))
  @UseGuards(BeltGuard)
  postNinja(
    @Body()
    createNinjaDto: CreateNinjaZodDto,
  ) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  @Put(':id')
  putNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjasService.updateNinja(id, updateNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjasService.removeNinja(id);
  }
}
