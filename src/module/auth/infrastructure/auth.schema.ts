import { EntitySchema } from 'typeorm';
import { Auth } from '../domain/auth.entity';

export const AuthSchema = new EntitySchema<Auth>({
  name: 'Auth',
  target: Auth,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    refreshToken: {
      type: String,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
    },
  },
});
