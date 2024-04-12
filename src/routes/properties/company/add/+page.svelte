<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let companyName, cpf, cnpj

    async function addCompany(event) {
        event.preventDefault()

        const formData = {
            companyName: companyName,
            cpf: cpf,
            cnpj: cnpj
        }

		const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        
        const appendAlert = (message, type) => {
			const wrapper = document.createElement('div');
			
            alertPlaceholder.innerHTML = ''

			wrapper.innerHTML = `
			<div class="alert alert-${type} float-end m-4 alert-dismissible" role="alert">
				<div>${message}</div>
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
			`;

			alertPlaceholder.append(wrapper);
		};

        const response = await fetch(`${localStorage.getItem('url')}/api/v1/properties/company/add`, {
            method: 'post',
            headers: {
                'authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(response.ok) {
            const data = await response.json()

            appendAlert(data.message, 'success')
        }else{
            const data = await response.json()

            appendAlert(data.message, 'danger')
        }

        setTimeout(() => {
			alertPlaceholder.innerHTML='' // Remove o alerta após 10 segundos
		}, 6000);
    }
</script>
<div id="liveAlertPlaceholder"></div>
<div class="position-absolute top-50 start-50 translate-middle">
	<div class="shadow-lg p-3 mb-5 rounded form-shadow">
        <form on:submit={addCompany}>
            <div class="mb-3">
				<label for="company" class="form-label">Nome da empresa</label>
				<div class="input-group">
					<span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building-fill" viewBox="0 0 16 16">
                            <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
                        </svg>
					</span>
					<input type="text" class="form-control" bind:value={companyName} id="company">
				</div>
			</div>
            <div class="mb-3">
				<label for="cpf" class="form-label">CPF</label>
				<div class="input-group">
					<span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                        </svg>
					</span>
					<input type="text" class="form-control" bind:value={cpf} id="cpf">
				</div>
			</div>
            <div class="mb-3">
				<label for="cnpj" class="form-label">CNPJ</label>
				<div class="input-group">
					<span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-123" viewBox="0 0 16 16">
                            <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z"/>
                          </svg>
					</span>
					<input type="text" class="form-control" bind:value={cnpj} id="cnpj">
				</div>
			</div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="p_fisica">
                <label class="form-check-label" for="p_fisica">Pessoa física</label>
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Adicionar uma empresa</button>
            </div>
        </form>
    </div>
</div>