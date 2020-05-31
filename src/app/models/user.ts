import { Note } from '@models/note';
import { Collection } from '@models/collection';
import { toSvg } from 'jdenticon';

export class UserRole {
  public id: number;
  public name: string;
  public description: string;
  public type: string;

  constructor(private userRole: any) {
    this.id = userRole.id;
    this.name = userRole.name;
    this.description = userRole.description;
    this.type = userRole.type;
  }

}

export class UserInner {
  public id: number;
  public username: string;
  public email: string;
  public provider: string;
  public confirmed: boolean;
  public blocked: boolean;
  public role: UserRole | number;
  public created_at: string;
  public updated_at: string;
  public avatar: string | null;
  public notes: Note[];
  public collections: Collection[];

  constructor(private userInner: any) {
    this.id = userInner.id;
    this.username = userInner.username;
    this.email = userInner.email;
    this.provider = userInner.provider;
    this.confirmed = userInner.confirmed;
    this.blocked = userInner.blocked;
    this.role = userInner.role;
    this.created_at = userInner.created_at;
    this.updated_at = userInner.updated_at;
    this.avatar = userInner.avatar;
    this.notes = userInner.notes;
    this.collections = userInner.collections;
  }

  public getAvatar(size) {
    let html = '';

    if (this.avatar) {
      html = `<img class="is-block image is-${size}x${size}" src="${this.avatar}" alt="${this.username}">`;
    } else {
      html = toSvg(this.email, size);
    }

    return html;
  }
}

export class User {
  public user: UserInner;
  public jwt: string;

  constructor(private userData: any) {
    this.user = userData.user;
    this.jwt = userData.jwt;
  }

}
