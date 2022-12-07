import { EntitySchema } from 'typeorm';
import { User } from '../domain/user.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    lastName: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      unique: true,
      nullable: false,
    },
    hash: {
      type: String,
      nullable: false,
    },
  },
  relations: {
    tasks: {
      type: 'one-to-many',
      target: 'Task', // the name of the TaskSchema
    },
    refreshToken: {
      type: 'one-to-many',
      target: 'Auth',
    },
  },
});
