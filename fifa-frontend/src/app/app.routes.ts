import { Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { ListPlayerComponent } from './components/list-player/list-player.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormPlayerComponent } from './components/form-player/form-player.component';

export const routes: Routes = [
    {path: '', component: FormLoginComponent, canActivate: [LoginGuard]},
    {path: 'player-list', component: ListPlayerComponent},
    {path: 'create-player', component: FormPlayerComponent},
    {path: 'edit-player/:id', component: FormPlayerComponent}
];
