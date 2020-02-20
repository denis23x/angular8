import { Note } from './note';

export class Collection {
  constructor(
    public id: number,
    public title: string,
    public created_at: string,
    public updated_at: string,
    public notes: Note[],
  ) { }
}
