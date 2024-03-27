<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	import jQuery from 'jquery'
    import jquery from "jquery";

	let username, surname, birth, phone, country, state, city, nickname, biography, gender, email, password;

	async function signinHandlerSubmit(event) {
		event.preventDefault()

		const formData = {
			username: username,
			surname: surname,
			birth: birth,
			phone: phone,
			country: country,
			state: state,
			city: city,
			nickname: nickname,
			biography: biography,
			gender: gender,
			email: email,
			password: password
		}

		try {
			const response = await fetch(`${localStorage.getItem('url')}/api/v1/user/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }else{
				window.location.href = '/signin'
			}
		}catch (error) {
			console.error(error)
		}
	}

/*onMount(() => {
	jquery('#profile_picture_img').click(function() {
  		jquery('.profile_picture').click();
	})

	jQuery(document).ready(function() {
		var readyURL = function(input) {
			if(input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function(e) {
					jquery('#profile_picture_img').attr('src', e.target.result)
				}

				reader.readAsDataURL(input.files[0])
			}
		}

		jquery('.profile_picture').on('change', function() {
			readyURL(this)
		})
	})
})*/
</script>
<svelte:head>
	<title>Cadastro - Olha a casa aí</title>
	<meta name="description" content="About this app" />
</svelte:head>
<div class="position-absolute top-50 start-50 translate-middle">
	<div class="shadow-lg p-3 mb-5 rounded form-shadow" style="margin-top: 470px;">
		<form on:submit={signinHandlerSubmit} class="row g-3">
			<div class="col-md-6">
				<label for="username" class="form-label">Seu nome</label>
				<input type="text" id="username" class="form-control" bind:value={username}>
			</div>
			<div class="col-md-6">
				<label for="surname" class="form-label">Sobrenome</label>
				<input type="text" id="surname" class="form-control" bind:value={surname}>
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
				<label for="country" class="form-label">Cidade</label>
				<input type="text" id="country" class="form-control" bind:value={country}>
			</div>
			<div class="col-md-6">
				<label for="state" class="form-label">Estado</label>
				<input type="text" id="state" class="form-control" bind:value={state}>
			</div>
			<div class="mb-3">
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
			<button type="submit" class="btn btn-primary">Enviar</button>
		</form>
	</div>
</div>