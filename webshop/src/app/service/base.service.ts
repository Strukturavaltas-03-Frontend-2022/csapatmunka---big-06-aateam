import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { [x: string]: any }> {

  apiUrl: string = environment.apiUrl;

  entityName: string = '';

  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  selected$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);

  constructor(
    public http: HttpClient
  ) { }

  getCachedItemIndexByID(id: number): number {
    id = Number(id);
    const currentList = this.list$.getValue();
    return currentList.findIndex(item => item['id'] === id);
  }

  getAll(): void {
    this.http.get<T[]>(`${this.apiUrl}${this.entityName}`).subscribe(
      dataList => { this.list$.next(dataList) }
    );
  }

  get(id: number): void {
    const itemIndex = this.getCachedItemIndexByID(id);
    if (itemIndex > -1) {
      this.selected$.next(this.list$.getValue()[itemIndex]);
    } else {
      this.http.get<T>(`${this.apiUrl}${this.entityName}/${id}`).subscribe(
        data => this.selected$.next(data)
      );
    }
  }

  delete(id: number): void {
    this.http.delete(`${this.apiUrl}${this.entityName}/${id}`).subscribe(
      () => {
        const itemIndex = this.getCachedItemIndexByID(id);
        if (itemIndex > -1) {
          const currentList = this.list$.getValue();
          currentList.splice(itemIndex, 1);
          this.list$.next(currentList);
        }
      }
    );
  }

  create(entity: T): void {
    this.http.post<T>(`${this.apiUrl}${this.entityName}`, entity).subscribe(
      () => {
        this.getAll()
      }
    );
  }

  update(entity: T): void {
    this.http.patch<T>(`${this.apiUrl}${this.entityName}/${entity['id']}`, entity).subscribe(
      () => {
        this.getAll()
      }
    );
  }

}
