import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  q: string = '';

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) { }

  Search(event?: KeyboardEvent) {
    if (!this.q.trim()) {
      this.router.navigate(['/']);
      return;
    }
    this.sharedService.setSearchQuery(this.q);
    this.http
      .get("https://localhost:7065/api/EventOrganizer/Search/" + this.q)
      .subscribe((res: any) => {
        this.sharedService.setSearchResults(res);
        this.router.navigate(['/results']);
      });
  }
}

