<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let immobileData = [];
    export let data;

    async function interestHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/propertie/interestProperties/${data.id}`, {
                method: 'GET',
                headers: { 
                    'authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }

            const responseData = await response.json();
            interestData = responseData.message;

            console.log(interestData);
        } catch(error) {
            console.error(error);
        }
    }

    onMount(async () => {
        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/propertie/properties/${data.id}`, {
                method: 'GET',
                headers: { 
                    'authorization': localStorage.getItem('token'),
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
    });
</script>

{#if immobileData.length > 0}
    {#each immobileData as immobile}
        <img width='150px' src={immobile.photo_url_product} alt={immobile.user_nickname}>
        <p>Title: {immobile.title}</p>
        <p>Description: {immobile.description}</p>
        <p>Preço: R${immobile.price}</p>
        <p>Data de criação: {immobile.creationDate}</p>
        <button on:click={interestHandler}>Estou interessado</button>
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