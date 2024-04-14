<script>
	// @ts-nocheck
	let username, birth, phone, state, city, nickname, biography, gender, email, password;

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

	async function signinHandlerSubmit(event) {
		event.preventDefault()

		const formData = {
			username: username,
			birth: birth,
			phone: phone,
			state: state,
			city: city,
			nickname: nickname,
			biography: biography,
			gender: gender,
			email: email,
			password: password
		}

		console.log(birth)

		try {
			const response = await fetch(`${localStorage.getItem('url')}/api/v1/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			if (response.ok) {
				const data = await response.json();

				document.getElementById('btn-submit').disabled = true;

				if(data.message != undefined) {
					alerts(data.message, 'success')
				}

				setTimeout(() => {
					window.location.href='/signin'
				}, 4000);
            }else{
				const data = await response.json();

				if(data.message != undefined) {
					alerts(data.message, 'danger')

					setTimeout(() => {
						alertPlaceholder.innerHTML=''
					}, 6000);
				}
			}
		}catch (error) {
			console.error(error)
		}
	}
</script>
<svelte:head>
	<title>Cadastro - Olha a casa aí</title>
	<meta name="description" content="About this app" />
</svelte:head>
<div id="liveAlertPlaceholder"></div>
<div class="position-absolute top-50 start-50 translate-middle z-1">
	<div class="shadow-lg p-3 mb-5 rounded form-shadow" style="margin-top: 35%;">
		<form on:submit={signinHandlerSubmit} class="row g-3">
			<div class="col-12">
				<label for="username" class="form-label">Seu nome</label>
				<input type="text" id="username" class="form-control" bind:value={username}>
			</div>
			<div class="col-md-6">
				<label for="birth" class="form-label">Data de nascimento</label>
				<input type="date" id="birth" class="form-control" bind:value={birth}>
			</div>
			<div class="col-md-6">
				<label for="phone" class="form-label">Telefone</label>
				<input type="text" id="phone" class="form-control" bind:value={phone}>
			</div>
			<div class="col-md-6">
				<label for="state" class="form-label">Estado</label>
				<input type="text" id="state" class="form-control" bind:value={state}>
			</div>
			<div class="col-md-6">
				<label for="city" class="form-label">Cidade</label>
				<input type="text" id="city" class="form-control" bind:value={city}>
			</div>
			<div class="mb-3">
				<label for="gender" class="form-label">Genero</label>
				<select type="text" id="gender" class="form-control" bind:value={gender}>
					<option value="1">Masculino</option>
					<option value="2">Feminino</option>
					<option value="3">Outros</option>
				</select>
			</div>
			<div class="mb-3">
				<label for="nickname" class="form-label">Nome do perfil</label>
				<input type="text" id="nickname" class="form-control" bind:value={nickname}>
			</div>
			<label for="biography" class="form-label">Biografia</label>
			<textarea type="text" id="biography" class="form-control" bind:value={biography}></textarea>
			<div class="col-md-6">
				<label for="email" class="form-label">Email</label>
				<input type="email" id="email" class="form-control" bind:value={email}>
			</div>
			<div class="col-md-6">
				<label for="password" class="form-label">Senha</label>
				<input type="password" id="password" class="form-control" bind:value={password}>
			</div>
			<button type="submit" id="btn-submit" class="btn btn-primary">Enviar</button>
		</form>
	</div>
</div>