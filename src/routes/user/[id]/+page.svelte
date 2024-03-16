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

            document.title = userData[0].nickname + " - Olha a casa aí"
        } catch(error) {
            console.error(error);
        }
    })
</script>
<svelte:head>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
{#if userData.length > 0}
  {#each userData as user}
    <img src={user.profile_picture} alt={user.nickname}>
    <p>{user.nickname}</p>
    <p>{user.biography}</p>
  {/each}
{:else}
  <p>Aguardando dados...</p>
{/if}