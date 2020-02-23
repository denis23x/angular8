import { Collection } from '@models/collection';
import { UserInner } from '@models/user';

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

  public getShortDescription(): string {
    const codeBlock = /(```\s?[a-z]*\n[\s\S]*?\n```)/g;
    return this.description.replace(codeBlock, '`code block`').split('___')[0];
  }
}
