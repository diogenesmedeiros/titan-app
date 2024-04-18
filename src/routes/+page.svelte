<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	
	let propertiesData = [];

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:8081/api/v1/properties', {
				method: 'GET',
				headers: { 
					'authorization': sessionStorage.getItem('token'),
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const data = await response.json();
				propertiesData = data.message;
			}
		} catch (error) {
			console.error(error);
		}
	});
</script>
<svelte:head>
	<title>Inicio - Olha a casa aí</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-3 g-4 p-5">
        {#if propertiesData.length == 0}
        <div class="col">
            <div class="d-flex justify-content-center align-items-center" style="height: 80vh;">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        {:else if propertiesData.length > 0 }
            {#each propertiesData as properties}
            <div class="col">
                <a href="/properties/{properties.id}" class="text-decoration-none">
                    <div class="card form-shadow">
                        <img src={properties.photo_url} class="card-img-top" style="height: 250px; width:100%" alt={properties.user_nickname}>
                        <div class="card-body">
                            <h5 class="card-title">{properties.title}</h5>
                            <p class="card-text">{properties.description}</p>
                            <hr>
                            <p class="card-text fs-5">R${properties.price}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                                {properties.city} - {properties.state}
                            </small>
                        </div>
                    </div>
                </a>
            </div>
            {/each}
        {/if}  
    </div>
</div>