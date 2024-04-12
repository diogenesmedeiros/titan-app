<script>
    // @ts-nocheck
    import { onMount } from "svelte";
      
    let userData = [];
    
    onMount(async () => {
        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/users`, {
                headers: { 
                    'authorization': sessionStorage.getItem('token')
                }
            });
            if (response.ok) {
              const data = await response.json();
              userData = data.message;
            }
        } catch (error) {
            console.error(error);
        }
    });
</script>
<svelte:head>
  <title>Algumas pessoas - Olha a casa aí</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
      
{#if userData.length > 0}
  {#each userData as user}
  <a href="/user/{user.nickname}">
    <img src={user.profile_picture} alt={user.nickname}>
    <p>{user.nickname}</p>
  </a>
  {/each}
{:else}
  <p>Aguardando dados...</p>
{/if}