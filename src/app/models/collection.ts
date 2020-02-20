import { Note } from './note';

export class Collection {
  constructor(
    public id: number,
    public title: string,
    public path: string,
    public icon: CollectionIcon,
    public created_at: string,
    public updated_at: string,
    public notes: Note[],
  ) { }
}

export class CollectionIcon {
  constructor(
    public id: number,
    public name: string,
    public hash: string,
    public sha256: string,
    public ext: string,
    public mime: string,
    public size: number,
    public url: string,
    public provider: string,
    public provider_metadata: string,
    public created_at: string,
    public updated_at: string,
  ) { }
}
