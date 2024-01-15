import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { NotFoundError } from '@mikro-orm/core';
import { Student } from './entities/student.entity';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result = [
        {
          id: 1,
          name: 'Alex Lee',
          email: 'alex_lee@schoolA.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Jeanette Tan',
          email: 'jeanette_tan@schoolB.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should return an empty array if no students are found', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => []);
      expect(await controller.findAll()).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a student object if found', async () => {
      const result = {
        id: 1,
        name: 'Alex Lee',
        email: 'alex_lee@schoolA.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw a NotFoundException if the student is not found', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => null);
      await expect(controller.findOne(1000)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should return the newly created student', async () => {
      const newStudent: CreateStudentDto = {
        name: 'New Student',
        email: 'new_student@schoolC.com',
      };
      const result = {
        id: 3,
        ...newStudent,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(newStudent)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return the updated student', async () => {
      const updatedStudent: UpdateStudentDto = { name: 'Updated Student' };
      const result = {
        id: 1,
        name: 'Bask Lee',
        email: 'bask_lee@schoolA.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'update').mockImplementation(async () => result);

      expect(await controller.update(1, updatedStudent)).toBe(result);
    });

    it('should throw a NotFoundException if the student to update is not found', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => {
        throw (NotFoundError<Student>).findOneFailed(
          'Error updating student: cannot find student',
          { id: 1000 },
        );
      });
      await expect(
        controller.update(1000, { name: 'Non-existent Student' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should return undefined when a student is deleted', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => undefined);
      expect(await controller.remove(1)).toBe(undefined);
    });

    it('should throw a NotFoundException if the student to delete is not found', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => {
        throw (NotFoundError<Student>).findOneFailed(
          'Error deleting student: cannot find student',
          { id: 1000 },
        );
      });
      await expect(controller.remove(1000)).rejects.toThrow(NotFoundException);
    });
  });
});
