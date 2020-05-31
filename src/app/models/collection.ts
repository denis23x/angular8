import { Note } from '@models/note';

export class Collection {
  public id: number;
  public title: string;
  public path: string;
  public icon: CollectionIcon;
  public created_at: string;
  public updated_at: string;
  public notes: Note[];

  constructor(private collection: any) {
    this.id = collection.id;
    this.title = collection.title;
    this.path = collection.path;
    this.icon = collection.icon;
    this.created_at = collection.created_at;
    this.updated_at = collection.updated_at;
    this.notes = collection.notes;
  }

}

export class CollectionIcon {
  public id: number;
  public name: string;
  public hash: string;
  public sha256: string;
  public ext: string;
  public mime: string;
  public size: number;
  public url: string;
  public provider: string;
  public provider_metadata: string | null;
  public created_at: string;
  public updated_at: string;

  constructor(private collectionIcon: any) {
    this.id = collectionIcon.id;
    this.name = collectionIcon.name;
    this.hash = collectionIcon.hash;
    this.sha256 = collectionIcon.sha256;
    this.ext = collectionIcon.ext;
    this.mime = collectionIcon.mime;
    this.size = collectionIcon.size;
    this.url = collectionIcon.url;
    this.provider = collectionIcon.provider;
    this.provider_metadata = collectionIcon.provider_metadata;
    this.created_at = collectionIcon.created_at;
    this.updated_at = collectionIcon.updated_at;
  }

}
