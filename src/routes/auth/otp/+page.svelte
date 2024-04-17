<script>
    // @ts-nocheck
    let enabledOtp;

    function alerts(message, type) {
		const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
		const wrapper = document.createElement('div');

		alertPlaceholder.innerHTML = ''

		wrapper.innerHTML = `
		<div class="alert alert-${type} float-end m-4 z-3 alert-dismissible" role="alert">
			<div>${message}</div>
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		</div>
		`;

		alertPlaceholder.append(wrapper);
	}

    async function enableOTP() {
        const response = await fetch(`${localStorage.getItem('url')}/api/v1/auth/otp/enabled`, {
            method: 'POST',
            headers: {
                'authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ enable_otp: enabledOtp })
        })

        if(response.ok) {
            const responseData = await response.json()

            alerts(responseData.message, "success")

            alert(responseData.message)

            window.location.href="/auth/otp/qr"
        }else{
            const responseData = await response.json()

            alerts(responseData.message, "danger")
        }
    }
</script>
<div id="liveAlertPlaceholder"></div>
<div class="position-absolute top-50 start-50 translate-middle">
	<div class="shadow-lg p-3 mb-5 rounded form-shadow">
        <p class="fs-3 fw-bold">Ativar autenticação em dois fatores</p>
        <form class="form-shadow" on:submit={enableOTP}>
            <div class="mb-3">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="enabledOTP" bind:checked={enabledOtp}>
                    <label class="form-check-label" for="enabledOTP">Ativar autenticação em dois fatores</label>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
        </form>
    </div>
</div>