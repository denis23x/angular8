import { Collection } from './collection';

export class Note {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  collections: Collection[];
}
