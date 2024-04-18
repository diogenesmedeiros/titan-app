<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let userData = [];
    let immobileData = [];

    export let data;

    onMount(async () => {
        document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
            radio.addEventListener('click', function() {
                var value = this.value;
                if (value) {
                document.querySelectorAll('input[type="radio"]:not(:checked)').forEach(function(unchecked) {
                    if (unchecked.value <= value) {
                    unchecked.nextElementSibling.style.color = 'orange';
                    } else {
                    unchecked.nextElementSibling.style.color = 'black';
                    }
                });
                }
            });
        });

        try {
            const response = await fetch(`http://localhost:8081/api/v1/users/${data.id}`, {
                method: 'GET',
                headers: { 
                    'authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const responseData = await response.json();
                userData = responseData.message;

                document.title = userData[0].nickname + " - Olha a casa ai"

                try {
                    const response = await fetch(`http://localhost:8081/api/v1/properties/user/${userData[0].uid}`, {
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

<div class="container">
    <div class="row justify-content-center mt-5">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-body">
                    {#if userData.length > 0}
                        {#each userData as user}
                        <div class="text-center">
                            {#if sessionStorage.getItem('token')}
                            <div>
                                <a href="/user/settings/account">
                                    <img src="{user.profile_picture}" class="rounded-circle img-fluid mb-3" alt={user.nickname} style="width: 150px; height: 150px;">
                                </a>
                            </div>
                            {:else}
                            <div>
                                <img src="{user.profile_picture}" class="rounded-circle img-fluid mb-3" alt={user.nickname} style="width: 150px; height: 150px;">
                            </div>
                            {/if}
                            <p class="fs-3 fw-bold">{user.username}</p>
                            <p>{user.biography}</p>
                            <p class="badge text-bg-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                                {user.city} - {user.state}
                            </p>
                        </div>
                        <hr class="divider">
                        <div class="row row-cols-1 row-cols-md-3 g-4">
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
                                                    <p class="card-text fs-5">R${immobile.price}</p>
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
            </div>
        </div>
    </div>
</div>