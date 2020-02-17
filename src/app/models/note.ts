import { Collection } from './collection';
import { UserInner } from './user';

export class Note {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public created_at: string,
    public updated_at: string,
    public user: UserInner,
    public collections: Collection[]
  ) { }
}
