import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/products/interfaces/productsByCategory.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public isSidebarOpen = false;
  public searchTermSubject = new BehaviorSubject<string>('');
  public router = inject(Router);

  searchTerm(term: string) {
    this.router.navigate(['/product-filter']);

    this.searchTermSubject.next(term);
  }

  getSearchedTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
}
