<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    async function qrCode() {
        const response = await fetch(`${localStorage.getItem('url')}/api/v1/auth/qr`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok) {
            const responseData = await response.json()

            document.getElementById('qrCode').innerHTML = `<img src="${responseData.message}">`
        }
    }

    onMount(() => {
        qrCode();
    })
</script>
<h1>Two-Factor Authentication</h1>
<div id="qrCode"></div>