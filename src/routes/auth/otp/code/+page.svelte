<script>
    // @ts-nocheck
    let otp;

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

    async function verify(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:8081/api/v1/auth/otp/code', {
            method: 'POST',
            headers: {
                'authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: otp })
        })

        if(response.ok) {
            const data = await response.json()

            alerts(`${data.message}`, 'success')

            setTimeout(() => {
				window.location.href = '/'
			}, 1200);
        }else{
            const data = await response.json()

            alerts(data.message, 'danger')
        }
    }
</script>
<div id="liveAlertPlaceholder" class="position-fixed top-0 end-0 p-3 m-4" style="z-index: 9999"></div>
<div class="container-fluid">
    <div class="row justify-content-center align-items-center" style="height: 100vh;">
        <div class="col-md-6">
            <div class="shadow-lg p-3 mb-5 rounded form-shadow">
                <p class="fs-3 fw-bold text-center mb-4">Autenticação em dois fatores</p>
                <form on:submit={verify}>
                    <div class="mb-3">
                        <label class="form-label" for="otp">Digite o código</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-123" viewBox="0 0 16 16">
                                    <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="otp" bind:value={otp}>
                        </div>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>