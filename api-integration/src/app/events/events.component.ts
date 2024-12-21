import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  totalEvents: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.http
      .get(
        `https://localhost:7065/api/EventOrganizer/Pagination/${this.currentPage}/${this.pageSize}`
      )
      .subscribe((response: any) => {
        this.events = response.events;
        this.totalEvents = response.totalCount;
      });
  }

  get totalPages(): number {
    return Math.ceil(this.totalEvents / this.pageSize);
  }

  get showingRange(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.events.length - 1, this.totalEvents);
    return `${start} - ${end}`;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEvents();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEvents();
    }
  }
}
