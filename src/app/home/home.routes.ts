import { Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { TicketsListComponent } from "./user/tickets-list/tickets-list.component";
import { TicketComponent, resolveTicket } from "./user/ticket/ticket.component";
import { TaskComponent, resolveTaskDetail } from "./user/task/task.component";
import { ProfilComponent } from "./profil/profil.component";

export const routes: Routes = [
    {
        path:'',
        component: TicketsListComponent
    },
    {
        path:'ticket/:ticketId',
        component: TicketComponent,
        resolve: {
            ticket : resolveTicket,
            // pageEvent: resolvePagination
        }
    },
    {
        path:'ticket/:ticketId/task/:taskId',
        component: TaskComponent,
        resolve: {
            task: resolveTaskDetail
        }
    },
    {
        path: 'profile',
        component: ProfilComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
]