import { Injectable } from '@nestjs/common';
import { EntityManager, NotFoundError } from '@mikro-orm/core';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Feedback[]> {
    return await this.em.find(Feedback, null);
  }

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.em.create(Feedback, { ...createFeedbackDto, score: 0 });
    await this.em.persistAndFlush(feedback);
    return feedback;
  }

  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    const feedback = await this.em.findOne(Feedback, id);
    if (!feedback) {
      throw (NotFoundError<Feedback>).findOneFailed(
        'Error: cannot find feedback',
        { id },
      );
    }
    this.em.assign(feedback, updateFeedbackDto);
    await this.em.flush();
    return feedback;
  }

  async remove(id: number): Promise<{success: boolean}> {
    const feedback = await this.em.findOne(Feedback, id);
    if (!feedback) {
      throw (NotFoundError<Feedback>).findOneFailed(
        'Error deleting feedback: cannot find feedback',
        { id },
      );
    }
    await this.em.removeAndFlush(feedback);
    return { success: true };
  }
}
