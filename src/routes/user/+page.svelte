<script>
    // @ts-nocheck
    import { onMount } from "svelte";
      
    let userData = [];
    
    onMount(async () => {
        let token = localStorage.getItem('token');
        const parts = currentUrl.split('/');
        const username = parts[parts.length - 1];

        try {
            const response = await fetch(`${localStorage.getItem('url_grok')}/api/user/shaolim`, {
                headers: { 
                    'authorization': token
                }
            });
            if (!response.ok) {
              throw new Error('Erro ao carregar os dados');
            }
            const data = await response.json();
            userData = data.users;
        } catch (error) {
            console.error(error);
        }
    });
    </script>
    <svelte:head>
        <title>Home</title>
        <meta name="description" content="Svelte demo app" />
    </svelte:head>
      
      {#if userData.length > 0}
        <ul>
          {#each userData as user}
            <li>
              <img src={user.profile_picture} alt={user.nickname}>
              <p>Nickname: {user.nickname}</p>
              <p>Biografia: {user.biography}</p>
              <p>Data de criação: {user.created}</p>
            </li>
          {/each}
        </ul>
      {:else}
        <p>Aguardando dados...</p>
      {/if}