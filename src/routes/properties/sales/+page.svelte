<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let immobileData = [];
    let userData = [];

    onMount(async () => {
        if(sessionStorage.getItem('user') != null) 
            userData = JSON.parse(sessionStorage.getItem('user'));
        else
            userData = null
        try {
            const response = await fetch(`http://localhost:8081/api/v1/properties/user/${userData.uid}`, {
                method: 'GET',
                headers: { 
                    'authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }

            const responseData = await response.json();
            immobileData = responseData.message;

        }catch (error) {
            console.error(error);
        }
    })
</script>
<div class="position-fixed p-5 bottom-0 end-0 z-3">
    <a href="/properties/sales/add" class="form-shadow">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
        </svg>
    </a>
</div>
<div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-3 g-4 p-5 form-shadow">
        {#if immobileData.length > 0}
            {#each immobileData as immobile}
                <div class="col">
                    <a href="/properties/{immobile.id}" class="text-decoration-none">
                        <div class="card h-100 shadow">
                            <img src={immobile.photo_url} class="card-img-top" alt={immobile.user_nickname}>
                            <div class="card-body">
                                <h5 class="card-title">{immobile.title}</h5>
                                <p class="card-text">{immobile.description}</p>
                                <hr>
                                <p class="card-text fs-5">{immobile.price}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary">{immobile.city} - {immobile.state}</small>
                            </div>
                        </div>
                    </a>
                </div>
            {/each}
        {:else}
            <div class="col">
                <center><p>Não há nada aqui 👀</p></center>
            </div>
        {/if}
    </div>
</div>