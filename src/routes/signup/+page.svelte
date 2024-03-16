<script>
// @ts-nocheck

let username, surname, birth, phone, country, state, city, 
profile_picture, nickname, biography, gender, email, password;

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
		profile_picture: profile_picture,
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

		const data = await response.json();

		localStorage.setItem('token', data.token);
	}catch (error) {
		console.error(error)
	}
}
</script>
<svelte:head>
	<title>Cadastro - Olha a casa aí</title>
	<meta name="description" content="About this app" />
</svelte:head>

<form on:submit={signinHandlerSubmit}>
	<label for="username">username:</label>
	<input type="text" id="username" bind:value={username}>

	<label for="surname">surname:</label>
	<input type="text" id="surname" bind:value={surname}>

	<label for="birth">birth:</label>
	<input type="date" id="birth" bind:value={birth}>

	<label for="phone">phone:</label>
	<input type="text" id="phone" bind:value={phone}>

	<label for="country">country:</label>
	<input type="text" id="country" bind:value={country}>

	<label for="state">state:</label>
	<input type="text" id="state" bind:value={state}>

	<label for="city">city:</label>
	<input type="text" id="city" bind:value={city}>

	<label for="profile_picture">profile picture:</label>
	<input type="file" id="profile_picture" bind:value={profile_picture}>

	<label for="nickname">nickname:</label>
	<input type="text" id="nickname" bind:value={nickname}>

	<label for="biography">biography:</label>
	<input type="text" id="biography" bind:value={biography}>

	<label for="gender">gender:</label>
	<input type="text" id="gender" bind:value={gender}>

	<label for="email">email:</label>
	<input type="email" id="email" bind:value={email}>
  
	<label for="password">password:</label>
	<input type="password" id="password" bind:value={password}>
  
	<button type="submit">Enviar</button>
</form>