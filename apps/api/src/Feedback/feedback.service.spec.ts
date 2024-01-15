import { FeedbackService } from './feedback.service';
import { EntityManager } from '@mikro-orm/core';
import { Test } from '@nestjs/testing';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FeedbackService,
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

    service = module.get<FeedbackService>(FeedbackService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  describe('findAll', () => {
    it('should return an array of feedbacks', async () => {
      const expectedFeedbacks = [
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
      jest.spyOn(entityManager, 'find').mockResolvedValue(expectedFeedbacks);
      const feedbacks = await service.findAll();
      expect(feedbacks).toEqual(expectedFeedbacks);
      expect(entityManager.find).toHaveBeenCalledWith(Feedback, null);
    });
  });

  describe('create', () => {
    it('should create a new feedback', async () => {
      const createFeedbackDto: CreateFeedbackDto = {
        name: 'New Feedback',
        email: 'new_feedback@schoolC.com',
        description: 'New Description'
      };
      const newFeedback = new Feedback(
        createFeedbackDto.name,
        createFeedbackDto.email,
        createFeedbackDto.description,
        0
      );
      jest.spyOn(entityManager, 'persistAndFlush').mockResolvedValue(undefined);
      jest.spyOn(entityManager, 'create').mockReturnValue(newFeedback);
      const feedback = await service.create(createFeedbackDto);
      expect(feedback).toEqual(newFeedback);
      expect(entityManager.create).toHaveBeenCalledWith(
        Feedback,
        { ...createFeedbackDto, score: 0 },
      );
      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(newFeedback);
    });
  });

  describe('update', () => {
    it('should update an existing feedback', async () => {
      const updateFeedbackDto: UpdateFeedbackDto = { score: 1 };
      const existingFeedback = {
        id: 1,
        name: 'Bask Lee',
        email: 'bask_lee@schoolA.com',
        score: 0,
        description: 'Feedback',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(entityManager, 'findOne').mockResolvedValue(existingFeedback);
      jest.spyOn(entityManager, 'flush').mockResolvedValue(undefined);
      jest.spyOn(entityManager, 'assign').mockImplementation(Object.assign);

      const feedback = await service.update(1, updateFeedbackDto);
      expect(feedback).toMatchObject(updateFeedbackDto);
      expect(entityManager.flush).toHaveBeenCalled();
    });

    it('should throw an error if the feedback to update is not found', async () => {
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(null);
      await expect(
        service.update(1000, { name: 'Non-existent Student' }),
      ).rejects.toThrow(
        'Error: cannot find feedback not found ({ id: 1000 })',
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing feedback', async () => {
      const existingFeedback = {
        id: 1,
        name: 'Bask Lee',
        email: 'bask_lee@schoolA.com',
        score: 0,
        description: 'Feedback',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(entityManager, 'findOne').mockResolvedValue(existingFeedback);
      jest.spyOn(entityManager, 'removeAndFlush').mockResolvedValue(undefined);
      await service.remove(1);
      expect(entityManager.removeAndFlush).toHaveBeenCalledWith(
        existingFeedback,
      );
    });

    it('should throw an error if the feedback to remove is not found', async () => {
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(null);
      await expect(service.remove(1000)).rejects.toThrow(
        'Error deleting feedback: cannot find feedback not found ({ id: 1000 })',
      );
    });
  });
});

