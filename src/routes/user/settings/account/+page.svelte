<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import jquery from "jquery";

    let userData = [];

    function showSection(sectionId) {
        jquery('.hidden').hide();
        jquery('#' + sectionId).show();
    }

    // Função para obter os estados do IBGE
    async function getStatesFromIBGE() {
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            const states = await response.json();
            return states;
        } catch (error) {
            console.error('Erro ao obter estados:', error);
            return [];
        }
    }

    // Função para obter as cidades de um estado específico do IBGE
    async function getCitiesFromIBGE(uf) {
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
            const cities = await response.json();
            return cities;
        } catch (error) {
            console.error('Erro ao obter cidades:', error);
            return [];
        }
    }

    // Função para preencher o select de estados
    async function populateStates() {
        try {
            const states = await getStatesFromIBGE();
            const stateSelect = jquery('#state');
            stateSelect.empty(); // Limpa o conteúdo atual do select
            states.forEach(state => {
                const option = jquery('<option>').val(state.sigla).text(state.nome);
                stateSelect.append(option);
            });
        } catch (error) {
            console.error('Erro ao preencher estados:', error);
        }
    }

    // Função para preencher o select de cidades com base no estado selecionado
    async function populateCities() {
        try {
            const uf = jquery('#state').val(); // Obtém o estado selecionado
            const cities = await getCitiesFromIBGE(uf);
            const citySelect = jquery('#city');
            citySelect.empty(); // Limpa o conteúdo atual do select
            cities.forEach(city => {
                const option = jquery('<option>').val(city.nome).text(city.nome);
                citySelect.append(option);
            });
        } catch (error) {
            console.error('Erro ao preencher cidades:', error);
        }
    }

    async function handlerChangeState() {
        await populateCities();

        const state = jquery('#state').val();
        console.log(state);
    }

    function handlerChangeCity() {
        const city = jquery('#city').val();
        console.log(city);
    }

    onMount(async () => {
        await populateStates();

        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/users/settings`, {
                method: 'POST',
                headers: {
                    'authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            } else {
                const responseData = await response.json();
                userData = responseData.message;

                console.log(userData)
            }
        } catch (error) {
            console.error(error);
        }

        jquery('#profile_picture_img').click(function () {
            jquery('.profile_picture').click();
        });

        jquery('.profile_picture').on('change', function (event) {
            var input = this;
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    jquery('#profile_picture_img').attr('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        });
    });
</script>
<style>
    #profile_picture_img {
        width: 180px;
        height: 180px;
    }

    .hidden {
        display: none;
    }

    .list-group-item {
        cursor: pointer;
    }

    .list-group-item:hover {
        background-color: #f0f0f0;
    }

    .list-group-item.active {
        background-color: #007bff;
        color: #fff;
    }

    .list-group-item.active:hover {
        background-color: #007bff;
    }
</style>
<svelte:head>
    <title>Fazer upload de uma foto - Olha a casa aí</title>
    <meta name="description" content="About this app" />
</svelte:head>
<div class="container mt-5 form-shadow">
  <div class="row">
    <div class="col-md-3">
      <div class="list-group">
        <button class="list-group-item list-group-item-action form-shadow" on:click={() => showSection('edit-account')}>Editar Conta</button>
        <button class="list-group-item list-group-item-action form-shadow" on:click={() => showSection('edit-personal-data')}>Editar Dados Pessoais</button>
        <button class="list-group-item list-group-item-action form-shadow" on:click={() => showSection('site-settings')}>Configurações do Site</button>
        <button class="list-group-item list-group-item-action form-shadow" on:click={() => showSection('privacy-data-deletion')}>Privacidade e Exclusão de Dados</button>
      </div>
    </div>
    <div class="col-md-9">
        {#if userData.length > 0}
        {#each userData as user}
        <div id="edit-account" class="hidden border rounded p-4">
            <h2 class="mb-3">Editar Conta</h2>
            <form enctype="multipart/form-data" class="row g-3">
                <div class="md-6">
                    <div class="text-center">
                        <img src="{user.profile_picture}" id="profile_picture_img" class="rounded-circle" alt="Avatar">
                    </div>
                    <div class="text-center">
                        <label for="username" class="form-label text-center">Selecione uma foto</label>
                    </div>
                    <input type="file" id="profile_picture" class="form-control profile_picture" style="visibility: hidden;">
                </div>
            </form>
            <form>
                <div class="row">
                    <div class="col-12 mb-3">
                        <label for="nickname" class="form-label">Seu nome de perfil</label>
                        <input type="text" id="nickname" class="form-control" value="{user.nickname}">
                    </div>
                    <div class="col-12 mb-3">
                        <label for="nickname" class="form-label">Breve descrição</label>
                        <textarea type="text" id="nickname" class="form-control">{user.biography}</textarea>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email" class="form-control" value="{user.email}">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="inputPassword4" class="form-label">Senha</label>
                        <input type="password" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="phoneNumber" class="form-label">Número de telefone</label>
                        <input type="text" class="form-control" value="{user.phone}">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="instagram" class="form-label">Instagram</label>
                        <input type="text" class="form-control" value="{user.instagram}">
                    </div>
                    <div class="col-md-6 mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="usePhone">
                        <label class="form-check-label" for="usePhone">Usar o número de telefone como forma de contato</label>
                    </div>
                    <div class="col-md-6 mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="useInstagram">
                        <label class="form-check-label" for="useInstagram">Usar Instagram como forma de contato</label>
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">Salvar alterações</button>
                </div>
            </form>
        </div>
        <div id="edit-personal-data" class="hidden border rounded p-3">
            <!-- Conteúdo para editar dados pessoais -->
            <h2>Editar Dados Pessoais</h2>
            <form>
                <div class="row">
                    <div class="col-12 mb-3">
                        <label for="nickname" class="form-label">Seu nome completo</label>
                        <input type="text" id="nickname" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="inputPassword4" class="form-label">CPF</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="inputPassword4" class="form-label">CNPJ</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="usePhone">
                        <label class="form-check-label" for="usePhone">Pessoa física</label>
                    </div>
                    <div class="col-md-6 mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="useInstagram">
                        <label class="form-check-label" for="useInstagram">Agência Imobiliária</label>
                    </div>
                    <div class="col-12 mb-3">
                        <label for="inputPassword4" class="form-label">Nome da empresa</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="state" class="form-label">Estado</label>
                        <select id="state" class="form-select state" on:change={handlerChangeState}>
                            <option selected>Selecione...</option>
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="city" class="form-label">Cidade</label>
                        <select id="city" class="form-select" on:change={handlerChangeCity}>
                            <option selected>Selecione um estado primeiro...</option>
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="inputPassword4" class="form-label">CEP</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="inputPassword4" class="form-label">Endereço Completo</label>
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">Salvar alterações</button>
                </div>
            </form>
        </div>
        <div id="site-settings" class="hidden border rounded p-3">
            <!-- Conteúdo para configurações do site -->
            <h2>Configurações do Site</h2>
            <p>Aqui você pode configurar o site.</p>
        </div>
        <div id="privacy-data-deletion" class="hidden border rounded p-3">
            <!-- Conteúdo para privacidade e exclusão de dados -->
            <h2>Privacidade e Exclusão de Dados</h2>
            <p>Aqui você pode gerenciar sua privacidade e solicitar a exclusão de dados.</p>
        </div>
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
  </div>
</div>
