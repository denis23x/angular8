import { Collection } from '@models/collection';
import { UserInner } from '@models/user';

export class Note {
  public id: number;
  public title: string;
  public description: string;
  public created_at: string;
  public updated_at: string;
  public user: UserInner | number;
  public collection: Collection | number;

  // UserInner Instance
  private userInner: UserInner;

  constructor(private note: any) {
    this.id = note.id;
    this.title = note.title;
    this.description = note.description;
    this.created_at = note.created_at;
    this.updated_at = note.updated_at;
    this.user = note.user;
    this.collection = note.collection;
  }

  public getUser(): UserInner {
    if (!this.userInner) {
      this.userInner = new UserInner(this.user);
    }

    return this.userInner;
  }

  // public getShortDescription(): string {
  //   const codeBlock = /(```\s?[a-z]*\n[\s\S]*?\n```)/g;
  //   return this.description.replace(codeBlock, '`code block`').split('___')[0];
  // }
}
