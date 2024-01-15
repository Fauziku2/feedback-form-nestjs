import { Test } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/core';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto, UpdateStudentDto } from './dto';

describe('StudentService', () => {
  let service: StudentService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: EntityManager,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            persistAndFlush: jest.fn(),
            removeAndFlush: jest.fn(),
            flush: jest.fn(),
            create: jest.fn(),
            assign: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const expectedStudents = [
        { id: 1, name: 'Alex Lee', email: 'alex_lee@schoolA.com' },
        { id: 2, name: 'Jeanette Tan', email: 'jeanette_tan@schoolB.com' },
      ];
      jest.spyOn(entityManager, 'find').mockResolvedValue(expectedStudents);
      const students = await service.findAll();
      expect(students).toEqual(expectedStudents);
      expect(entityManager.find).toHaveBeenCalledWith(Student, {});
    });

    it('should return an array of students with a matching name', async () => {
      const expectedStudents = [
        { id: 1, name: 'Alex Lee', email: 'alex_lee@schoolA.com' },
      ];
      jest.spyOn(entityManager, 'find').mockResolvedValue(expectedStudents);
      const students = await service.findAll('John');
      expect(students).toEqual(expectedStudents);
      expect(entityManager.find).toHaveBeenCalledWith(Student, {
        name: { $like: '%John%' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a student if found', async () => {
      const expectedStudent = {
        id: 1,
        name: 'Alex Lee',
        email: 'alex_lee@schoolA.com',
      };
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(expectedStudent);
      const student = await service.findOne(1);
      expect(student).toEqual(expectedStudent);
      expect(entityManager.findOne).toHaveBeenCalledWith(Student, 1);
    });

    it('should throw an error if no student is found', async () => {
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1000)).toBe;
    });
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'New Student',
        email: 'new_student@schoolC.com',
      };
      const newStudent = new Student(
        createStudentDto.name,
        createStudentDto.email,
      );
      jest.spyOn(entityManager, 'persistAndFlush').mockResolvedValue(undefined);
      jest.spyOn(entityManager, 'create').mockReturnValue(newStudent);
      const student = await service.create(createStudentDto);
      expect(student).toEqual(newStudent);
      expect(entityManager.create).toHaveBeenCalledWith(
        Student,
        createStudentDto,
      );
      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(newStudent);
    });
  });

  describe('update', () => {
    it('should update an existing student', async () => {
      const updateStudentDto: UpdateStudentDto = { name: 'Updated Student' };
      const existingStudent = {
        id: 1,
        name: 'Alex Lee',
        email: 'alex_lee@schoolA.com',
      };

      jest.spyOn(entityManager, 'findOne').mockResolvedValue(existingStudent);
      jest.spyOn(entityManager, 'flush').mockResolvedValue(undefined);
      jest.spyOn(entityManager, 'assign').mockImplementation(Object.assign);

      const student = await service.update(1, updateStudentDto);
      expect(student).toMatchObject(updateStudentDto);
      expect(entityManager.flush).toHaveBeenCalled();
    });

    it('should throw an error if the student to update is not found', async () => {
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(null);
      await expect(
        service.update(1000, { name: 'Non-existent Student' }),
      ).rejects.toThrow(
        'Error updating student: cannot find student not found ({ id: 1000 })',
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing student', async () => {
      const existingStudent = {
        id: 1,
        name: 'Alex Lee',
        email: 'alex_lee@schoolA.com',
      };
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(existingStudent);
      jest.spyOn(entityManager, 'removeAndFlush').mockResolvedValue(undefined);

      await service.remove(1);
      expect(entityManager.removeAndFlush).toHaveBeenCalledWith(
        existingStudent,
      );
    });

    it('should throw an error if the student to remove is not found', async () => {
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(null);
      await expect(service.remove(1000)).rejects.toThrow(
        'Error deleting student: cannot find student not found ({ id: 1000 })',
      );
    });
  });
});
