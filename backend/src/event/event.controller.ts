import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images/images',
        filename: (_, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtention = file.originalname.split('.')[1];
          const newFilename = name + '_' + Date.now() + '.' + fileExtention;

          cb(null, newFilename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
          return cb(null, false);
        }
        return cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is not an image');
    } else {
      const response = { image: `images/${file.filename}` };

      return await this.eventService.update(id, response as UpdateEventDto);
    }
  }

  @Get()
  findAll(@Query('search') search: string, @Query('page') page: number) {
    return this.eventService.findAll({ search, page });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
