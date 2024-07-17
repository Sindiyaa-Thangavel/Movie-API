import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  query: string = '';

  constructor(private router: Router) {}

  getSearchResults(): void {
    if (this.query.trim() !== '') {
      this.router.navigate(['/search'], { queryParams: { query: this.query } });
    }
  }
}
