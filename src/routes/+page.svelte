<script>
// @ts-nocheck
import { onMount } from "svelte";
  
let userData = [];

onMount(async () => {
	let token = localStorage.getItem('token');

	try {
		const response = await fetch(`${localStorage.getItem('url')}/api/v1/immobile/immobiles`, {
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
  
  {#if userData.length > 0}
	<ul>
	  {#each userData as user}
		<li>
		  <img width='150px' src={user.photo_url_product} alt={user.user_nickname}>
		  <p>Title: {user.title}</p>
		  <p>Description: {user.description}</p>
		  <p>Preço: R${user.price}</p>
		  <p>Data de criação: {user.creationDate}</p>
		</li>
	  {/each}
	</ul>
  {:else}
	<p>Aguardando dados..</p>
  {/if}  