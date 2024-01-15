import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';
import { NotFoundError } from '@mikro-orm/core';
import { Feedback } from './entities/feedback.entity';
import { NotFoundException } from '@nestjs/common';

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        {
          provide: FeedbackService,
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

    controller = module.get<FeedbackController>(FeedbackController);
    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of feedbacks', async () => {
      const result = [
        {
          id: 1,
          name: 'Alex Lee',
          email: 'alex_lee@schoolA.com',
          score: 1,
          description: 'alex description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Jeanette Tan',
          email: 'jeanette_tan@schoolB.com',
          score: 2,
          description: 'Jeanette description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await controller.findAll()).toBe(result);
    });

    it('should return an empty array if no feedbacks are found', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => []);
      expect(await controller.findAll()).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return the newly created feedback', async () => {
      const newFeedback: CreateFeedbackDto = {
        name: 'New Feedback',
        email: 'new_feedback@schoolC.com',
        description: 'New Description'
      };
      const result = {
        id: 3,
        ...newFeedback,
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockImplementation(async () => result);
      expect(await controller.create(newFeedback)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return the updated feedback', async () => {
      const updatedFeedback: UpdateFeedbackDto = { score: 1 };
      const result = {
        id: 1,
        name: 'Bask Lee',
        email: 'bask_lee@schoolA.com',
        score: 0,
        description: 'Feedback',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      expect(await controller.update(1, updatedFeedback)).toBe(result);
    });

    it('should throw a NotFoundException if the student to update is not found', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => {
        throw (NotFoundError<Feedback>).findOneFailed(
          'Error: cannot find feedback',
          { id: 1000 },
        );
      });
      await expect(
        controller.update(1000, { name: 'Non-existent Student' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should return success true when a feedback is deleted', async () => {
      const res = { success: true };
      jest.spyOn(service, 'remove').mockImplementation(async () => res);
      expect(await controller.remove(1)).toBe(res);
    });

    it('should throw a NotFoundException if the student to delete is not found', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => {
        throw (NotFoundError<Feedback>).findOneFailed(
          'Error deleting feedback: cannot find feedback',
          { id: 1000 },
        );
      });
      await expect(controller.remove(1000)).rejects.toThrow(NotFoundException);
    });
  });
});
