<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let immobileData = [];
    let commentData = []
    let userData;
    let commentProd, idProd;

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


        } catch(error) {
            console.error(error);
        }
    }

    function formatDateTime(timeDataString) {
        const timeData = new Date(timeDataString);

        const day = timeData.toLocaleDateString('pt-BR', { day: '2-digit' });
        const month = timeData.toLocaleDateString('pt-BR', { month: '2-digit' });
        const year = timeData.toLocaleDateString('pt-BR', { year: 'numeric' });

        let hour = timeData.getHours();
        const minute = timeData.toLocaleTimeString('pt-BR', { minute: '2-digit' });

        const period = hour < 12 ? 'AM' : 'PM';
        hour = hour % 12 || 12;

        const hourFormated = `${hour}:${minute} ${period}`;

        const timeDataFormated = `${day}/${month}/${year} às ${hourFormated}`;

        return timeDataFormated;
    }

    async function commentHandlerSubmit(event) {
        event.preventDefault()

        const formData = {
			comment: commentProd,
			product_id: idProd
		}

        formData.product_id = data.id

        console.log(formData)

        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/propertie/properties/addComment`, {
                method: 'POST',
                headers: {
                    'authorization': localStorage.getItem('token'),
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

            newComment.innerHTML = `
                <div id="info">
                    <a href="/user/${userData.nickname}" class="d-flex align-items-center text-decoration-none">
                        <img src="${userData.profile_picture}" width="40" class="rounded-circle me-2" alt="Avatar">
                        <p class="mb-0">${userData.nickname}</p>
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

    onMount(async () => {
        if(sessionStorage.getItem('user') != null) 
            userData = JSON.parse(sessionStorage.getItem('user'));
        else
            userData = 'uid'

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

            const responseComment = await fetch(`${localStorage.getItem('url')}/api/v1/propertie/properties/comments/${immobileData[0].id}`)

            const responseCommentData = await responseComment.json()
            commentData = responseCommentData.message

            document.title = immobileData[0].title + " - Olha a casa aí"
        } catch (error) {
            console.error(error);
        }
    });
</script>
<div class="container form-shadow">
    <div class="row justify-content-center mt-5">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-body">
                    {#if immobileData.length > 0}
                        {#each immobileData as immobile}
                            <img class="img-fluid mb-3" src={immobile.photo_url_product} alt={immobile.nickname}>
                            <div class="d-flex justify-content-between align-items-center">
                                <h2 class="fw-bold">{immobile.title}</h2>
                                <div>
                                    {#if userData.uid != null}
                                        {#if immobile.uid == userData.uid }
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
                                            <button class="btn btn-danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                                                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                                                </svg>
                                            </button>
                                        {/if}
                                    {/if}
                                </div>
                            </div>
                            <p class="fs-4 mb-3">Preço: <span class="text-success">R$ {immobile.price}</span></p>
                            <hr>
                            <div class="mb-3 p-3 rounded form-shadow" style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                                <a href="/user/{immobile.nickname}" class="d-flex align-items-center text-decoration-none">
                                    <img src="{immobile.profile_picture}" width="40" class="rounded-circle me-2" alt="Avatar">
                                    <p class="mb-0">{immobile.nickname}</p>
                                </a>
                            </div>
                            <hr>
                            <div id="comment-form">
                                <p class="text-center fs-4 fw-bold">Comentarios</p>
                                {#if userData.uid != null }
                                <form on:submit={commentHandlerSubmit}>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <div>
                                                <img src="{userData.profile_picture}" width="40" class="rounded-circle me-2" alt="Avatar">
                                            </div>
                                            <textarea type="text" class="form-control" style="height: 40px;" bind:value={commentProd}></textarea>
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
                            {#if commentData.length > 0}
                                {#each commentData as comment}
                                    <div id="comments">
                                        <div class="mb-3 p-3 rounded form-shadow" style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                                            <div id="info">
                                                <a href="/user/{comment.user_nickname}" class="d-flex align-items-center text-decoration-none">
                                                    <img src="{comment.user_profile_picture}" width="40" class="rounded-circle me-2" alt="Avatar">
                                                    <p class="mb-0">{comment.user_nickname}</p>
                                                </a>
                                            </div>
                                            <div id="comment-text" class="m-3">
                                                <p>{comment.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {:else}
                                <p class="text-center">Não há nada aqui</p>
                            {/if}
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