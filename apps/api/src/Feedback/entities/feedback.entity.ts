import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Feedback {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  description: string;

  @Property()
  score: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(name: string, email: string, description: string, score: number) {
    this.name = name || 'test';
    this.email = email;
    this.description = description;
    this.score = score;
  }
}
