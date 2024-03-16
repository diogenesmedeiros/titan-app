<script>
	// @ts-nocheck
	let email;
	let password;

	async function signinHandlerSubmit(event) {
		event.preventDefault()

		const formData = {
			email: email,
			password: password
		}

		try {
			const response = await fetch(`${localStorage.getItem('url')}/api/v1/user/signin`, {
				method: 'POST',
                credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }else{
				const data = await response.json();

				localStorage.setItem('token', data.token);
				sessionStorage.setItem('user', JSON.stringify(data.user))

				window.location.href='/'
			}
		}catch (error) {
			console.error(error)
		}
	}
</script>
<svelte:head>
	<title>Entrar - Olha a casa aí</title>
	<meta name="description" content="About this app" />
</svelte:head>
<div class="position-absolute top-50 start-50 translate-middle">
	<div class="shadow-lg p-3 mb-5 rounded form-shadow">
		<form on:submit={signinHandlerSubmit}>
			<p class="fs-1 fw-bold text-center">Entrar</p>
			<div class="mb-3">
				<label for="email" class="form-label">Email</label>
				<div class="input-group">
					<span class="input-group-text">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
							<path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
						</svg>
					</span>
					<input type="email" class="form-control" id="email" bind:value={email}>
				</div>
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Senha</label>
				<div class="input-group">
					<span class="input-group-text">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
							<path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
						</svg>
					</span>
					<input type="password" class="form-control" id="password" bind:value={password}>
				</div>
			</div>
			<div class="d-grid gap-2">
				<button class="btn btn-primary" type="submit">Enviar</button>
			</div>
		</form>
	</div>
</div>