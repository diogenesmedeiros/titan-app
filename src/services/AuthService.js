// @ts-nocheck
import { writable } from 'svelte/store';

export const tokenExpiration = writable(null);

export async function startTokenExpirationTimer(expirationTime) {
    const expirationTimer = setTimeout(() => {
        tokenExpiration.set('expired');

        localStorage.removeItem('token')
        sessionStorage.removeItem('user')

        window.location.href = '/'
    }, expirationTime);

    tokenExpiration.expirationTimer = expirationTimer;
}

export async function updateSession() {
    if(sessionStorage.getItem('token') != null || sessionStorage.getItem('user') != null) {
        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/users`, {
                method: 'GET',
                headers: { 
                    'authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                redirectRoute('logout')
                throw new Error('Erro ao carregar os dados');
            }else{
                const data = await response.json();
    
                sessionStorage.setItem('user', JSON.stringify(data.message[0]))
            }
        }catch(error) {
            console.log(error)
        }
    }else{
        redirectRoute('signin')
    }
}

function redirectRoute(path) {
    const pathURI = window.location.pathname.split('/')[1];
    const pathName = ['signin', 'signup'];

    if (!pathName.includes(pathURI)) {
        window.location.href = `/${path}`;
    }
}