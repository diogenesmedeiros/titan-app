<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    const q = $page.url.searchParams.get('q');
    let searchData = []

    onMount(async () => {
        document.title = q + " - Olha a casa aí"

        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/propertie/properties/${q}`, {
                method: 'GET',
                headers: { 
                    'authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                    throw new Error('Erro ao carregar os dados');
            }

            const responseData = await response.json();
            searchData = responseData.message;

            console.log(searchData);
        }catch(error) {
            console.error(error);
        }
    })
</script>
<div class="row row-cols-1 row-cols-md-3 g-4 p-5 form-shadow">
    {#if searchData.length > 0}
        {#each searchData as search}
            <a href="/properties/{search.id}" class="w-25 col" style="text-decoration: none">
                <div class="card form-shadow">
                    <img src={search.photo_url_product} class="card-img-top" alt={search.user_nickname}>
                    <div class="card-body">
                        <h5 class="card-title">{search.title}</h5>
                        <p class="card-text">{search.description}</p>
                        <hr>
                        <p class="card-text fs-5">R${search.price}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary">{search.city} - {search.state}</small>
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