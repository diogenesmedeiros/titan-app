<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	
	let userData = [];

	onMount(async () => {
		let token = localStorage.getItem('token');

		try {
			const response = await fetch(`${localStorage.getItem('url')}/api/v1/propertie/properties`, {
				method: 'GET',
				headers: { 
					'authorization': token,
					'Content-Type': 'application/json'
				}
			});
			if (!response.ok) {
			throw new Error('Erro ao carregar os dados');
			}
			const data = await response.json();
			userData = data.message;
		} catch (error) {
			console.error(error);
		}
	});
</script>
<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div class="row row-cols-1 row-cols-md-3 g-4 p-5 form-shadow">
	{#if userData.length > 0}
		{#each userData as user}
			<a href="/properties/{user.id}" class="w-25 col" style="text-decoration: none">
				<div class="card form-shadow">
					<img src={user.photo_url_product} class="card-img-top" alt={user.user_nickname}>
					<div class="card-body">
						<h5 class="card-title">{user.title}</h5>
						<p class="card-text">{user.description}</p>
						<hr>
						<p class="card-text fs-5">R${user.price}</p>
					</div>
					<div class="card-footer">
						<small class="text-body-secondary">{user.city} - {user.state}</small>
					</div>
				</div>
			</a>
		{/each}
	{:else}
		<div class="position-absolute top-50 start-50 translate-middle">
			<div>
				<center><div class="spinner-border text-primary" role="status">
					<span class="visually-hidden">Loading...</span>
				</div></center>
				<center><p>Aguardando dados...</p></center>
			</div>
		</div>
	{/if}  
</div>