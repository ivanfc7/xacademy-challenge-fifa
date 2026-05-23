import { Routes } from '@angular/router';
import { ListPlayerComponent } from './components/list-player/list-player.component';
import { FormLoginComponent } from './components/form-login/form-login.component';

export const routes: Routes = [
    {path: '', component: FormLoginComponent},
    {path: 'player-list', component: ListPlayerComponent}
];
