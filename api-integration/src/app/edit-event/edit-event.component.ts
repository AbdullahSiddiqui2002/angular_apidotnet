import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventTypes: any = [];
  event = {
    id: 0,
    customerName: "",
    noOfGuests: 50,
    eventTypeId: 0,
    date: new Date(),
    formattedDate: ''
  };
  eventId: any = 0;
  minDate: string = '';

  ngOnInit(): void {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    this.minDate = today.toISOString().split('T')[0];
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.getEventTypes();
    this.getEventDetails();
  }

  getEventDetails() {
    this.eventId = this.route.snapshot.paramMap.get("id");
    console.log(this.eventId);
    this.http.get("https://localhost:7065/api/EventOrganizer/" + this.eventId).subscribe((res: any) => {
      this.event = res;
      this.event.date = new Date(this.event.date);
      this.event.formattedDate = this.formatDate(this.event.date);
      console.log(res);
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getEventTypes() {
    this.http.get("https://localhost:7065/api/EventOrganizer/EventTypes").subscribe((res: any) => {
      this.eventTypes = res;
      console.log(res);
    });
  }

  editEvent() {
    const dateParts = this.event.formattedDate.split('-');
    const updatedDate = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2]) + 1
    );


    this.event.date = updatedDate;
    this.http.put("https://localhost:7065/api/EventOrganizer", this.event).subscribe((res: any) => {
      if (res != null) {
        alert("Event Updated Successfully..!");
        location.href = "/";
      } else {
        alert("Denied");
      }
    });
  }
}
