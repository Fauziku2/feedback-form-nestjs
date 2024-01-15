import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Student {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(name: string, email: string) {
    this.name = name || 'test';
    this.email = email;
  }
}
