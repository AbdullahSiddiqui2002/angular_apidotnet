import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  results: any[] = [];
  paginatedResults: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalResults: number = 0;
  totalEvents: number = 0;
  searchQuery: string = ''; // Add property for search query

  constructor(private sharedService: SharedService, private http: HttpClient) { }

  ngOnInit() {
    // Subscribe to search results
    this.sharedService.searchResults$.subscribe((res: any[]) => {
      this.results = res;
      this.totalResults = res.length;
      this.updatePagination();
      this.loadEvents();
    });

    // Subscribe to search query
    this.sharedService.searchQuery$.subscribe((query: string) => {
      this.searchQuery = query; // Update the search query in the component
    });
  }

  loadEvents() {
    this.http
      .get(
        `https://localhost:7065/api/EventOrganizer/Pagination/${this.currentPage}/${this.pageSize}`
      )
      .subscribe((response: any) => {
        this.totalEvents = response.totalCount;
      });
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedResults = this.results.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }

  get showingRange(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.paginatedResults.length - 1, this.totalResults);
    return `${start} - ${end}`;
  }
}
