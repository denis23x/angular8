import { Note } from '@models/note';
import { Collection } from '@models/collection';

export class UserRole {
  id: number;
  name: string;
  description: string;
  type: string;
}

export class UserInner {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public provider: string,
    public confirmed: boolean,
    public blocked: boolean,
    public role: UserRole | number,
    public created_at: string,
    public updated_at: string,
    public notes: Note[],
    public collections: Collection[]
  ) { }

}

export class User {
  user: UserInner;
  jwt?: string;
}
