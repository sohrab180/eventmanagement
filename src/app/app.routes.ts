import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './authguard/auth.guard';
import { HomeComponent } from './components/dashboard/home/home.component';
import { CreateComponent } from './components/dashboard/create/create.component';
import { UpdateComponent } from './components/dashboard/update/update.component';
import { ViewEventmanagementDialogComponent } from './components/view-eventmanagement-dialog/view-eventmanagement-dialog.component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard],
        children:[
            {path:'',component:HomeComponent},
            {path:'add-event', component:CreateComponent},
            {path:'update-event', component:UpdateComponent},
            {path:'view-event', component:ViewEventmanagementDialogComponent}
        ]
    },
    { path: '**', redirectTo: '' },
];
