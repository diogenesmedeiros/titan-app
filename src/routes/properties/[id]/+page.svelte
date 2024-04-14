<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import jquery from "jquery";

    let immobileData = [];
    let commentData = [];
    let userData;
    let commentProd, idProd;
    let interestData;

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

    onMount(async () => {
        if(sessionStorage.getItem('user') != null) 
            userData = JSON.parse(sessionStorage.getItem('user'));
        else
            userData = null
        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/properties/${data.id}`, {
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


            const responseComment = await fetch(`${localStorage.getItem('url')}/api/v1/properties/comment/${immobileData[0].id}`, {
                method: 'GET',
                headers: { 
                    'authorization': localStorage.getItem('token'),
                }
            })

            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }else{
                const responseCommentData = await responseComment.json()
                commentData = responseCommentData.message
            }

            var containerComments = document.getElementById('comments');
            containerComments.innerHTML = '';

            commentData.forEach(comment => {
                var newComment = document.createElement('div');
                newComment.setAttribute('class', 'mb-3 p-3 rounded form-shadow');
                newComment.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';

                newComment.innerHTML = `
                    <div id="info">
                        <a href="/user/${comment.creator.nickname}" class="d-flex align-items-center text-decoration-none">
                            <img src="${comment.creator.profile_picture}" class="rounded-circle me-2" style="width: 40px;height: 40px;" alt="Avatar">
                            <p class="mb-0">${comment.creator.nickname}</p>
                        </a>
                    </div>
                    <div id="comment-text" class="m-3">
                        <p>${comment.comment}</p>
                    </div>
                `;

                containerComments.appendChild(newComment);
            });

            document.title = immobileData[0].title + " - Olha a casa aí"
        } catch (error) {
            console.error(error);
        }
    });

    async function interestHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/properties/interested/${data.id}`, {
                method: 'GET',
                headers: { 
                    'authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const responseData = await response.json();
                interestData = responseData.message;

                alerts(immobileData, 'danger')
            }else{
                const responseData = await response.json();
                immobileData = responseData.message;

                console.log(immobileData)

                alerts(immobileData, 'success')
            }
        } catch(error) {
            console.error(error);
        }
    }

    async function commentHandlerSubmit(event) {
        event.preventDefault()

        const formData = {
			comment: commentProd,
			product_id: idProd,
		}

        formData.product_id = data.id

        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/properties/comment`, {
                method: 'POST',
                headers: {
                    'authorization': sessionStorage.getItem('token'),
					'Content-Type': 'application/json',
					'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }

            var newComment = document.createElement('div');
            newComment.setAttribute('class', 'mb-3 p-3 rounded form-shadow');
            newComment.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';

            jquery('#commentInput').val('')

            newComment.innerHTML = `
                <div id="info">
                    <a href="/user/${user.nickname}" class="d-flex align-items-center text-decoration-none">
                        <img src="${user.profile_picture}" class="rounded-circle me-2" style="width: 40px;height: 40px;" alt="Avatar">
                        <p class="mb-0">${user.nickname}</p>
                    </a>
                </div>
                <div id="comment-text" class="m-3">
                    <p>${formData.comment}</p>
                </div>
            `;

            var containerComments = document.getElementById('comments');
            containerComments.appendChild(newComment);
        }catch(err) {
            console.log(err)
        }
    }
</script>
<style>
    .img-r {
        width: 40px;
        height: 40px;
    }
</style>
<div id="liveAlertPlaceholder"></div>
<div class="container form-shadow z-1 position-absolute start-50 translate-middle" style="top: 130%;">
    <div class="row justify-content-center mt-5">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-body">
                    {#if immobileData.length > 0}
                        {#each immobileData as immobile}
                            <div class="text-center">
                                <img class="img-fluid mb-3" src={immobile.photo_url} style="height: 350px; widht:250px" alt={immobile.creator.nickname}>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <h2 class="fw-bold">{immobile.title}</h2>
                                <div>
                                    {#if userData.uid != null}
                                        {#if immobile.creator.uid == userData.uid }
                                        <a href="/properties/update/{immobile.id}" class="btn btn-success me-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                        </a>
                                        {:else}
                                            <button class="btn btn-primary me-2" on:click={interestHandler}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"/>
                                                </svg>
                                            </button>
                                            <button class="btn btn-warning me-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                                                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                                                </svg>
                                            </button>
                                            {#if immobile.phone != '' }
                                            <a href="https://wa.me/55{immobile.phone}" class="btn btn-success me-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                                </svg>
                                            </a>
                                            {/if}
                                            {#if immobile.instagram != '' }
                                            <a href="https://www.instagram.com/{immobile.instagram}" class="btn btn-danger me-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                                </svg>
                                            </a>
                                            {/if}
                                        {/if}
                                    {/if}
                                </div>
                            </div>
                            <hr>
                            <p class="fs-4 mb-3"><span class="text-success">R$ {immobile.price}</span></p>
                            <hr>
                            <div>
                                <p class="fw-bold fs-4">Descrição do Imóvel</p>
                                <p>{immobile.description}</p>
                                <hr>
                                <p class="fw-bold fs-4">Informações do Imóvel</p>
                                <div class="d-flex">
                                    <p class="p-2 fw-bold">Endereço:</p>
                                    <p class="p-2">{immobile.address}</p>
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
                            </div>                            
                            <hr>
                            <div class="mb-3 p-3 rounded form-shadow" style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                                <a href="/user/{immobile.creator.nickname}" class="d-flex align-items-center text-decoration-none">
                                    <img src="{immobile.creator.profile_picture}" width="40" class="rounded-circle me-2" alt="Avatar">
                                    <p class="mb-0">{immobile.creator.nickname}</p>
                                </a>
                            </div>
                            <hr>
                            <div id="comment-form">
                                <p class="text-center fs-4 fw-bold">Comentários</p>
                                {#if userData.uid != null }
                                <form on:submit={commentHandlerSubmit}>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <div>
                                                <img src="{userData.profile_picture}" class="rounded-circle me-2 img-r" alt="Avatar">
                                            </div>
                                            <textarea type="text" class="form-control" id="commentInput" style="height: 40px;" bind:value={commentProd}></textarea>
                                            <button class="input-group-text">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </form> 
                                {/if}    
                            </div> 
                            <hr>
                            <div id="comments"></div>
                        {/each}
                    {:else}
                        <div class="text-center">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p class="mt-3">Aguardando dados...</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>