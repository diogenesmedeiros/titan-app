<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    
    let immobilesData = []

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:8081/api/v1/properties', {
                method: 'GET',
                headers: { 
                    'authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
              throw new Error('Erro ao carregar os dados');
            }
            const data = await response.json();
            immobilesData = data.message;

            console.log(immobilesData)
        } catch (error) {
            console.error(error);
        }
    });
</script>
<svelte:head>
  <title>Alguns imoveis - Olha a casa aí</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
      
{#if immobilesData.length > 0}
  <ul>
  {#each immobilesData as immobiles}
    <li>
      <img width="150px" src={immobiles.photo_url} alt={immobiles.nickname}>
      <p>{immobiles.description}</p>
      <p>R$ {immobiles.price}</p>
    </li>
  {/each}
  </ul>
{:else}
  <p>Aguardando dados...</p>
{/if}