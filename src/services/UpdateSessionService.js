// @ts-nocheck
export async function updateSession() {
    try {
        const response = await fetch(`${localStorage.getItem('url')}/api/v1/user/a`, {
            method: 'POST',
            headers: { 
                'authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }else{
            const data = await response.json();

            sessionStorage.setItem('user', JSON.stringify(data.message[0]))
        }
    }catch(error) {
        console.error(error);
    }
}