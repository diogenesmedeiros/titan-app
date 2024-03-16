// @ts-nocheck
import { writable } from 'svelte/store';

export const tokenExpiration = writable(null);

export function startTokenExpirationTimer(expirationTime) {
    const expirationTimer = setTimeout(() => {
        tokenExpiration.set('expired');

        localStorage.removeItem('token')
        sessionStorage.removeItem('user')

        window.location.href = '/'
    }, expirationTime);

    tokenExpiration.expirationTimer = expirationTimer;
}