<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let userData = [];
    export let data;

    onMount(async () => {
        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/user/${data.id}`, {
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
            userData = responseData.message;
        } catch(error) {
            console.error(error);
        }
    })
</script>
{#if userData.length > 0}
  {#each userData as user}
    <img src={user.profile_picture} alt={user.nickname}>
    <p>{user.nickname}</p>
    <p>{user.biography}</p>
  {/each}
{:else}
  <p>Aguardando dados...</p>
{/if}