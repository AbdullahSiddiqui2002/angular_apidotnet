import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [

    {
        path: "",
        component: EventsComponent
    },
    {
        path: "addEvent",
        component: AddEventComponent,
    },
    {
        path: "editEvent/:id",
        component: EditEventComponent,
    },
    {
        path: "deleteEvent/:id",
        component: DeleteEventComponent,
    },
    {
        path: 'results',
        component: SearchResultsComponent,
    }
];
