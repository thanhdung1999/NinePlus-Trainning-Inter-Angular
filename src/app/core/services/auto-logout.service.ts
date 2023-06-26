import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const MINUTES_UNTIL_AUTO_LOGOUT = environment.session_expiry; // in mins
const CHECK_INTERVAL = environment.session_expiry * 1000; // in ms
const STORE_KEY = 'timeLogin';

@Injectable({
    providedIn: 'root',
})
export class AutoLogoutService {
    private lang = '';
    private intervalManagement: any;

    getTimeLogin(): number {
        return parseInt(localStorage.getItem(STORE_KEY)!, 0);
    }

    setTimeLogin(lastAction: number): void {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    }

    constructor(private router: Router) {
        const currentLang = localStorage.getItem('CURRENT_SELECT_LANG');
        if (currentLang) {
            this.lang = currentLang;
        }
    }

    init(): void {
        this.setTimeLogin(Date.now());
        this.initInterval();
        localStorage.setItem('LOCALIZE_DEFAULT_LANGUAGE', this.lang);
    }

    initInterval(): void {
        this.intervalManagement = setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    }

    check(): void {
        const now = Date.now();
        const timeleft = this.getTimeLogin() + MINUTES_UNTIL_AUTO_LOGOUT * 1000;
        const diff = timeleft - now;
        const isTimeout = diff <= 0;
        if (isTimeout) {
            localStorage.removeItem(STORE_KEY);
            localStorage.removeItem('currentUser');
            this.router.navigate([`${this.lang}` + '/auth/lock']);
            clearInterval(this.intervalManagement);
        }
    }
}
