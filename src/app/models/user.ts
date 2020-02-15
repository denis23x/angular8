import { Note } from './note';
import { Collection } from './collection';

export class UserRole {
  id: number;
  name: string;
  description: string;
  type: string;
}

export class UserInner {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: UserRole | number;
  created_at: string;
  updated_at: string;
  notes: Note[];
  collections: Collection[];
}

export class User {
  user: UserInner;
  jwt?: string;
}
