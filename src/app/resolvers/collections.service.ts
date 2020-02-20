import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class Collections implements Resolve<Observable<any>> {
  constructor(private apiService: ApiService) {}

  resolve() {
    return this.apiService.getCollectionsList();
  }
}
