<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    async function qrCode() {
        const response = await fetch('http://localhost:8081/api/v1/auth/otp/qr', {
            method: 'GET',
            headers: {
                'authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })

        if(response.ok) {
            const responseData = await response.json()

            document.getElementById('qrCode').innerHTML = `<img src="${responseData.message}">`
        }
    }

    function finishScan() {
        window.location.href="/auth/logout"
    }

    onMount(() => {
        qrCode();
    })
</script>
<div class="position-absolute top-50 start-50 translate-middle">
	<div class="shadow-lg p-3 mb-5 rounded form-shadow">
        <p class="fs-3 fw-bold img-fluid">Ativar autenticação em dois fatores</p>
        <p class="fs-6">Escaneie o QR Code abaixo para ativar a autenticação em dois fatores</p>
        <div class="text-center p-4" id="qrCode"></div>
        <div class="d-grid gap-2">
            <button class="btn btn-primary" id="btn-submit" on:click={finishScan}>Ja adicionei</button>
        </div>
    </div>
</div>