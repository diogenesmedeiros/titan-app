<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let companyData = []

    onMount(async () => {
        const response = await fetch('http://localhost:8081/api/v1/company/user/all', {
            method: 'get',
            headers: {
                'authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })

        if(response.ok) {
            const data = await response.json()

            companyData = data.message
        }
    })
</script>

<div class="position-absolute p-5 bottom-0 end-0 z-3">
    <a href="/properties/company/add" style="color:white">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
        </svg>
    </a>
</div>
<div class="position-absolute top-50 start-50 translate-middle">
    {#if companyData.length > 0}
    {#each companyData as company }
    <a href="/properties/{company.id}" class="w-25 col" style="text-decoration: none;">
        <div class="card form-shadow">
            <div class="card-body">
                <h5 class="card-title">{company.companyName}</h5>
            </div>
            <div class="card-footer">
                <small class="text-body-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                    {company.cpf}
                </small>
            </div>
        </div>
    </a>
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