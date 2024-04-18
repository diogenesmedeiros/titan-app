<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let immobileData = [];
    let userData;

    export let data;

    function alerts(message, type) {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

        const wrapper = document.createElement('div');
        
        alertPlaceholder.innerHTML = ''

        wrapper.innerHTML = `
        <div class="alert alert-${type} position-relative z-3 float-end m-4 alert-dismissible" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <div>${message}</div>
        </div>
        `;

        alertPlaceholder.append(wrapper);
    }

    async function deleteImmobile() {
        const id_immobile = {
            id: data.id
        }

        try {
            const response = await fetch(`http://localhost:8081/api/v1/properties/${id_immobile.id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id_immobile)
            })

            const data = await response.json()

            if(response.ok) {
                alerts(data.message, 'success')
            }else{
                alerts(data.message, 'danger')
            }
        } catch(err) {
            alerts(err, 'danger')
        }
    }

    onMount(async () => {
        if(sessionStorage.getItem('user') != null) 
            userData = JSON.parse(sessionStorage.getItem('user'));
        else
            userData = null
        try {
            const response = await fetch(`http://localhost:8081/api/v1/properties/${data.id}`, {
                method: 'GET',
                headers: { 
                    'authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const responseData = await response.json();
                immobileData = responseData.message;

                alerts(immobileData, 'danger')
            }else{
                const responseData = await response.json();
                immobileData = responseData.message;
            }

            document.title = immobileData[0].title + " - Olha a casa aí"
        } catch (error) {
            console.error(error);
        }
    });
</script>
<style>
    .img-r {
        width: 40px;
        height: 40px;
    }
</style>
<div id="liveAlertPlaceholder"></div>
<div class="container form-shadow z-1 position-absolute start-50 translate-middle" style="top: 110%;">
    <div class="row justify-content-center mt-5">
        <div class="col-md-8 form-shadow">
            <div class="card shadow form-shadow">
                <div class="card-body">
                    <form>
                    {#if immobileData.length > 0}
                        {#each immobileData as immobile}
                            <div class="text-center">
                                <img class="img-fluid mb-3" src={immobile.photo_url} style="height: 350px; widht:250px" alt={immobile.creator.nickname}>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <h2 class="fw-bold">{immobile.title}</h2>
                            </div>
                            <hr>
                            <p class="fs-4 mb-3"><span class="text-success">R$ {immobile.price}</span></p>
                            <hr>
                            <div>
                                <p class="fw-bold fs-4">Descrição do Imóvel</p>
                                <p>{immobile.description}</p>
                                <hr>
                                <p class="fw-bold fs-4">Informações do Imóvel</p>
                                <div class="mb-3">
                                    <label for="address" class="form-label">Endereço</label>
                                    <input type="text" class="form-control" id="address" value="{immobile.address}">
                                </div>
                                <div class="d-flex">
                                    <p class="p-2 fw-bold">Cidade e Estado:</p>
                                    <p class="p-2">{immobile.city} - {immobile.state}</p>
                                </div>
                                <div class="d-flex">
                                    <p class="p-2 fw-bold">CEP:</p>
                                    <p class="p-2">{immobile.cep}</p>
                                </div>
                                <div class="d-flex">
                                    <p class="p-2 fw-bold">Tipo de Propriedade:</p>
                                    <p class="p-2">{immobile.typeProperty}</p>
                                </div>
                                <div class="d-flex">
                                    <p class="p-2 fw-bold">Número de Quartos:</p>
                                    <p class="p-2">{immobile.roomNumbers}</p>
                                </div>
                                <div class="d-flex">
                                    <p class="p-2 fw-bold">Número de Banheiros:</p>
                                    <p class="p-2">{immobile.roomNumbers}</p>
                                </div>
                                <div class="d-flex">
                                    <p class="p-2 fw-bold">Área Total (em metros quadrados):</p>
                                    <p class="p-2">{immobile.totalArea}M²</p>
                                </div>
                                <div class="d-flex">
                                    <p class="p-2 fw-bold">Ano de Construção:</p>
                                    <p class="p-2">
                                        {new Date(immobile.constructionYear).toLocaleDateString('pt-BR')}
                                    </p>                                    
                                </div>
                                <div class="d-flex">
                                    <p class="p-2 fw-bold">Comodidades Incluídas:</p>
                                    <p class="p-2">{immobile.includedAmenities}</p>
                                </div>
                                <hr>
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary">Confirma</button>
                                    <button type="button" class="btn btn-danger" on:click={deleteImmobile}>Excluir</button>
                                </div>
                            </div>                            
                        {/each}
                    {:else}
                        <div class="text-center">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p class="mt-3">Aguardando dados...</p>
                        </div>
                    {/if}
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>