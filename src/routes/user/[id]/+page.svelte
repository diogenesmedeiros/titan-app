<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { get } from "svelte/store";

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
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/users/${data.id}`, {
                method: 'GET',
                headers: { 
                    'authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const responseData = await response.json();
                userData = responseData.message;

                document.title = userData[0].nickname + " - Titan"

                try {
                    const response = await fetch(`${localStorage.getItem('url')}/api/v1/properties/user/${userData[0].uid}`, {
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
<style>
    .rating {
        display: inline-block;
        unicode-bidi: bidi-override;
        direction: rtl;
    }

    .rating input {
        display: none;
    }

    .rating label {
        float: right;
        padding: 0 1px;
        cursor: pointer;
        font-size: 24px;
    }

    .rating label:before {
        content: "\2605";
    }

    .rating input:checked ~ label:before {
        color: orange;
    }

    .rating:not(:checked) label:hover:before,
    .rating:not(:checked) label:hover ~ label:before {
        color: orange;
    }
</style>
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
                                {#if sessionStorage.getItem('token')}
                                <div class="text-center">
                                    <a href="/user/settings/account"><img src="{user.profile_picture}" class="rounded-circle img-responsive mr-3" alt={user.nickname} style="width: 150px; height: 150px;"></a>
                                </div>
                                {:else}
                                <div class="text-center">
                                    <img src="{user.profile_picture}" class="rounded-circle img-responsive mr-3" alt={user.nickname} style="width: 150px; height: 150px;">
                                </div>
                                {/if}
                                <p class="fs-3 fw-bold text-center">{user.username}</p>
                                <p class="text-center">{user.biography}</p>
                                <div class="text-center">
                                    <p class="badge text-bg-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                        </svg>
                                        {user.city} - {user.state}
                                    </p>
                                </div>
                                <div class="rating">
                                    <input type="radio" id="star5" name="rating" value="5"><label for="star5"></label>
                                    <input type="radio" id="star4" name="rating" value="4"><label for="star4"></label>
                                    <input type="radio" id="star3" name="rating" value="3"><label for="star3"></label>
                                    <input type="radio" id="star2" name="rating" value="2"><label for="star2"></label>
                                    <input type="radio" id="star1" name="rating" value="1"><label for="star1"></label>
                                  </div>
                                  
                            </div>
                        </div>
                        <hr class="divider">
                        <div>
                            <p class="fs-4 fw-bold">Imoveis</p>
                            {#if immobileData.length > 0}
                                {#each immobileData as immobile}
                                    <div class="row row-cols-1 row-cols-md-3 g-4 form-shadow">
                                        <a href="/properties/{immobile.id}" class="w-25 col" style="text-decoration: none">
                                            <div class="card form-shadow">
                                                <img src={immobile.photo_url_product} class="card-img-top" alt={immobile.user_nickname}>
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
                                <center><p>Não há nada aqui 👀</p></center>
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