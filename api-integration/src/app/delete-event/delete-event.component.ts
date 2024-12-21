import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-event',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-event.component.html',
  styleUrl: './delete-event.component.css'
})
export class DeleteEventComponent {
  eventDetails: any = [];
  event = {
    id: 0,
    customerName: "",
    noOfGuests: 1,
    eventTypeId: 0,
    date: new Date(),

  }
  eventId: any = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {

    this.getEventDetails();

  }

  getEventDetails() {
    this.eventId = this.route.snapshot.paramMap.get("id");
    console.log(this.eventId);
    this.http.get("https://localhost:7065/api/EventOrganizer/" + this.eventId).subscribe((res: any) => {
      this.eventDetails = res;
      console.log(res);
    })

  }


  deleteEvent() {
    this.http.delete("https://localhost:7065/api/EventOrganizer", { body: this.eventDetails }).subscribe((res: any) => {
      if (res != null) {
        alert("Event Deleted Successfully..!")
        location.href = "/";
      } else {
        alert("Denied")
      }

    })
  }
}
