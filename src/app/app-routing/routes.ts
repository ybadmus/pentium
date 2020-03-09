import { Routes } from '@angular/router';

/*Import components here .. */
import {SignupComponent} from '../signup/signup.component';
import {SigninComponent} from '../signin/signin.component';
import {MainfeedComponent} from '../mainfeed/mainfeed.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'mainfeed', component: MainfeedComponent },
    { path: '', redirectTo: '/signup', pathMatch: 'full' }
];