<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let userData = [];
    let immobileData = [];

    export let data;

    onMount(async () => {
        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/user/${data.id}`, {
                method: 'GET',
                headers: { 
                    'authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }else{
                const responseData = await response.json();
                userData = responseData.message;

                document.title = userData[0].nickname + " - Titan"

                try {
                    const response = await fetch(`${localStorage.getItem('url')}/api/v1/propertie/properties/${userData[0].nickname}`, {
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

                    console.log(immobileData)

                    document.title = immobileData[0].title + " - Olha a casa aí"
                } catch (error) {
                    console.error(error);
                }
            }
        } catch(error) {
            console.error(error);
        }
    })
</script>
<svelte:head>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div class="container form-shadow">
    <div class="row justify-content-center mt-5">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-body">
                    {#if userData.length > 0}
                        {#each userData as user}
                        <div class="d-flex justify-content-center">
                            <div>
                                <img src="{user.profile_picture}" class="rounded-circle img-responsive mr-3" alt={user.nickname} style="width: 150px; height: 150px;">
                                <p class="fs-3 fw-bold text-center">{user.nickname}</p>
                                <p class="text-center">{user.biography}</p>
                            </div>
                        </div>
                        <hr class="divider">
                        <div>
                            <p class="fs-4 fw-bold">Imoveis</p>
                            {#if userData.length > 0}
                            {#each userData as user}
                            <div class="row row-cols-1 row-cols-md-3 g-4 form-shadow">
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
                            </div>
                            {/each}
                        </div>
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
            </div>
        </div>
    </div>
</div>