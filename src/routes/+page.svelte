<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	
	let userData = [];

	onMount(async () => {
		try {
			const response = await fetch(`${localStorage.getItem('url')}/api/v1/propertie/properties`, {
				method: 'GET',
				headers: { 
					'authorization': sessionStorage.getItem('token'),
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
	<title>Inicio - Olha a casa aí</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div class="row row-cols-1 row-cols-md-3 g-4 p-5 form-shadow">
	{#if userData.length > 0}
		{#each userData as user}
			<a href="/properties/{user.id}" class="w-25 col" style="text-decoration: none">
				<div class="card form-shadow">
					<img src={user.photo_url_product} class="card-img-top" style="height: 250px; widht:150px" alt={user.user_nickname}>
					<div class="card-body">
						<h5 class="card-title">{user.title}</h5>
						<p class="card-text">{user.description}</p>
						<hr>
						<p class="card-text fs-5">R${user.price}</p>
					</div>
					<div class="card-footer">
						<small class="text-body-secondary">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
								<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
							</svg>
							{user.city} - {user.state}
						</small>
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