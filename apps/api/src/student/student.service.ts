import { Injectable } from '@nestjs/common';
import { EntityManager, NotFoundError } from '@mikro-orm/core';
import { Student } from './entities/student.entity';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Injectable()
export class StudentService {
  constructor(private readonly em: EntityManager) {}

  async findAll(name?: string): Promise<Student[]> {
    const students = await this.em.find(
      Student,
      name ? { name: { $like: `%${name}%` } } : {},
    );
    return students;
  }

  async findOne(id: number): Promise<Student | null> {
    return await this.em.findOne(Student, id);
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.em.create(Student, createStudentDto);
    await this.em.persistAndFlush(student);
    return student;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.em.findOne(Student, id);
    if (!student) {
      throw (NotFoundError<Student>).findOneFailed(
        'Error updating student: cannot find student',
        { id },
      );
    }
    this.em.assign(student, updateStudentDto);
    await this.em.flush();
    return student;
  }

  async remove(id: number): Promise<void> {
    const student = await this.em.findOne(Student, id);
    if (!student) {
      throw (NotFoundError<Student>).findOneFailed(
        'Error deleting student: cannot find student',
        { id },
      );
    }
    await this.em.removeAndFlush(student);
  }
}
