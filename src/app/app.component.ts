import { Component } from '@angular/core';

import { AccountService } from './services/account.service';
import { User } from './_models/user';
import { Role } from './_models/role';
import { Router } from '@angular/router';
 
@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {

    user?: User | null;

    constructor(
        private router : Router,
        private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    get isAdmin() {
        return this.user?.role === Role.Admin;
    }

    logout() {
        this.accountService.logout();
    }
    createShow() {
        
    }   
    onRouteChange(event: any): void {
        const selectedRoute = event.target.value;
        this.router.navigate([selectedRoute]);
    }
        
}
