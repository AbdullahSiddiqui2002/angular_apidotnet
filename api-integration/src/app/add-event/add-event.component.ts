import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  eventTypes: any = [];
  event = {
    id: 0,
    customerName: "",
    noOfGuests: 50,
    eventTypeId: 0,
    date: new Date(),

  }

  minDate: string = '';

  ngOnInit(): void {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    this.minDate = today.toISOString().split('T')[0];
  }

  constructor(private http: HttpClient) {
    this.getEventTypes();

  }

  getEventTypes() {
    this.http.get("https://localhost:7065/api/EventOrganizer/EventTypes").subscribe((res: any) => {
      this.eventTypes = res;
      console.log(res);

    })
  }

  AddEvent() {
    this.http.post("https://localhost:7065/api/EventOrganizer", this.event).subscribe((res: any) => {
      if (res != null) {
        alert("Event Added Successfully..!")
        location.href = "/";
      } else {
        alert("Denied")
      }

    })
  }



}
