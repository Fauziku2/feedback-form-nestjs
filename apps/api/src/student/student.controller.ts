import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { NotFoundError } from '@mikro-orm/core';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll(@Query('name') name?: string): Promise<Student[]> {
    return this.studentService.findAll(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Student> {
    const student = await this.studentService.findOne(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }
    return student;
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    try {
      return await this.studentService.update(id, updateStudentDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.studentService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
