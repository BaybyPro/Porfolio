import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { ContactComponent } from './components/contact/contact.component';
import { MessageComponent } from './components/message/message.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'projects',component:ProjectComponent},
    {path:'contact',component:ContactComponent},
    {path:'message',component:MessageComponent},
    {path:'**',component:HomeComponent}
];
