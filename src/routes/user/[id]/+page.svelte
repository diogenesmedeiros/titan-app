<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let userData = [];
    let immobileData = [];

    export let data;

    onMount(async () => {
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

                const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
                Array.from(tooltipTriggerList).forEach((el) => new bootstrap.Tooltip(el));
            }
        } catch(error) {
            console.error(error);
        }
    })
</script>
<svelte:head>
    <meta name="description" content="Svelte demo app" />
</svelte:head>
<!-- User Profile Container -->
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow-sm form-shadow">
                <div class="card-body">
                    {#if userData.length > 0}
                        {#each userData as user}
                        <div class="text-center">
                            <!-- User Profile Picture -->
                            <div>
                                {#if sessionStorage.getItem('token')}
                                <a href="/user/settings/account" data-bs-toggle="tooltip" data-bs-placement="top" title="Configure sua conta clicando aqui">
                                    <img src="{user.profile_picture}" class="rounded-circle img-fluid mb-3" alt="{user.nickname}" style="width: 150px; height: 150px;">
                                </a>
                                {:else}
                                <img src="{user.profile_picture}" class="rounded-circle img-fluid mb-3" alt="{user.nickname}" style="width: 150px; height: 150px;">
                                {/if}
                            </div>
                            <!-- User Information -->
                            <h2 class="fw-bold">{user.username}</h2>
                            {#if user.first_user == 1}
                            <span class="badge bg-warning">
                                <i class="bi bi-award-fill"></i> Primeiro dos primeiros!
                            </span>
                            {/if}
                            <p>{user.biography}</p>
                            <!-- Location Badge -->
                            <span class="badge bg-primary">
                                <i class="bi bi-geo-alt-fill"></i> {user.city} - {user.state}
                            </span>
                        </div>
                        <hr>
                        <!-- User's Properties Section -->
                        <div class="my-4">
                            <h3 class="fw-bold text-center">Seus imóveis</h3>
                            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                              {#if immobileData.length > 0}
                                {#each immobileData as immobile}
                                <div class="col">
                                    <a href="/properties/{immobile.id}" class="text-decoration-none">
                                        <div class="card h-100 shadow-sm">
                                            <img src="{immobile.photo_url}" class="card-img-top" alt="{immobile.title}" style="object-fit: cover; height: 200px;">
                                            <div class="card-body">
                                                <h5 class="card-title">{#if immobile.suspended}<span class="badge bg-danger">Suspenso</span>{/if} {immobile.title}</h5>
                                                <p class="card-text">{immobile.description}</p>
                                                <hr>
                                                <p class="fs-5">{immobile.price}</p>
                                            </div>
                                            <div class="card-footer text-muted">
                                                {immobile.city} - {immobile.state}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                {/each}
                              {:else}
                                <div class="col">
                                  <div class="text-center">
                                    <p>Não há nada aqui 👀</p>
                                  </div>
                                </div>
                              {/if}
                            </div>
                        </div>
                        {/each}
                    {:else}
                    <div class="text-center mt-5">
                        <p>Não há nada aqui 👀</p>
                    </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>