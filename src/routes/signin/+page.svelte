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
			const response = await fetch(`${localStorage.getItem('url_ngrok')}/api/user/signin`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			const data = await response.json();

			console.log(data)

			localStorage.setItem('token', data.token);
			sessionStorage.setItem('user', JSON.stringify(data.user))
		}catch (error) {
			console.error(error)
		}
	}
</script>
<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<form on:submit={signinHandlerSubmit}>
	<label for="email">email:</label>
	<input type="email" id="email" bind:value={email}>
  
	<label for="password">password:</label>
	<input type="password" id="password" bind:value={password}>
  
	<button type="submit">Enviar</button>
</form>