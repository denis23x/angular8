import { Note } from './note';

export class Collection {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  notes: Note[];
}
