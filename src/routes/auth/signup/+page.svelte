<script>
	// @ts-nocheck
	import { onMount } from "svelte";

	let username, birth, phone, state, city, nickname, biography, gender, email, password;

	function alerts(message, type) {
		const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
		const wrapper = document.createElement('div');

		alertPlaceholder.innerHTML = ''

		wrapper.innerHTML = `
		<div class="alert alert-${type} float-end m-4 z-3 alert-dismissible" role="alert">
			<div>${message}</div>
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		</div>
		`;

		alertPlaceholder.append(wrapper);
	}

	function next() {
        document.getElementById('div1').style.display = 'none';
        document.getElementById('div2').style.display = 'block';
        document.getElementById('btn-prev').style.display = 'block';
        document.getElementById('btn-next').style.display = 'none';
    }

    function prev() {
        document.getElementById('div2').style.display = 'none';
        document.getElementById('div1').style.display = 'block';
        document.getElementById('btn-prev').style.display = 'none';
        document.getElementById('btn-next').style.display = 'block';
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
            const stateSelect = document.getElementById('state');
            stateSelect.innerHTML = ''; // Limpa o conteúdo atual do select
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state.sigla;
                option.textContent = state.nome;
                stateSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao preencher estados:', error);
        }
    }

    // Função para preencher o select de cidades com base no estado selecionado
    async function populateCities() {
        try {
            const uf = document.getElementById('state').value; // Obtém o estado selecionado
            const cities = await getCitiesFromIBGE(uf);
            const citySelect = document.getElementById('city');
            citySelect.innerHTML = ''; // Limpa o conteúdo atual do select
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.nome;
                option.textContent = city.nome;
                citySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao preencher cidades:', error);
        }
    }

	async function signinHandlerSubmit(event) {
		event.preventDefault()

		const formData = {
			username: username,
			birth: birth,
			phone: phone,
			state: state,
			city: city,
			nickname: nickname,
			biography: biography,
			gender: gender,
			email: email,
			password: password
		}

		console.log(birth)

		try {
			const response = await fetch('http://localhost:8081/api/v1/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			if (response.ok) {
				const data = await response.json();

				document.getElementById('btn-submit').disabled = true;

				if(data.message != undefined) {
					alerts(data.message, 'success')
				}

				setTimeout(() => {
					window.location.href='/auth/signin'
				}, 4000);
            }else{
				const data = await response.json();

				if(data.message != undefined) {
					alerts(data.message, 'danger')

					setTimeout(() => {
						alertPlaceholder.innerHTML=''
					}, 6000);
				}
			}
		}catch (error) {
			console.error(error)
		}
	}

	async function handlerChangeState() {
		await populateCities();

		state = document.getElementById('state').value;
	}

	function handlerChangeCity() {
		city = document.getElementById('city').value;
	}

    onMount(() => {
        populateStates();
        getCompany();
    });
</script>
<svelte:head>
    <title>Cadastro - Olha a casa aí</title>
    <meta name="description" content="About this app" />
</svelte:head>
<div id="liveAlertPlaceholder" class="position-fixed top-0 end-0 p-3 m-4" style="z-index: 9999"></div>
<div class="container-fluid d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card shadow p-3 mb-5 bg-body rounded form-shadow" style="width: 400px;">
        <div class="card-body">
            <h5 class="card-title text-center mb-4">Cadastro</h5>
            <form on:submit={signinHandlerSubmit}>
				<div id="div1">
					<div class="mb-3">
						<label for="username" class="form-label">Seu nome</label>
						<input type="text" id="username" class="form-control" bind:value={username}>
					</div>
					<div class="row g-3">
						<div class="col-md-6">
							<label for="birth" class="form-label">Data de nascimento</label>
							<input type="date" id="birth" class="form-control" bind:value={birth}>
						</div>
						<div class="col-md-6">
							<label for="phone" class="form-label">Telefone</label>
							<input type="text" id="phone" class="form-control" bind:value={phone}>
						</div>
					</div>
					<div class="row g-3">
						<div class="col-md-6">
							<label for="state" class="form-label">Selecione o seu estado</label>
							<div class="input-group">
								<span class="input-group-text">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
										<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
									</svg>
								</span>
								<select type="text" id="state" on:change={handlerChangeState} class="form-control" aria-describedby="stateHelp"></select>
							</div>
							<div id="stateHelp" class="form-text">Selecione em qual estado está localizado seu imovel.</div>
						</div>
						<div class="col-md-6">
							<label for="city" class="form-label">Selecione a sua cidade</label>
							<div class="input-group">
								<span class="input-group-text">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
										<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
									</svg>
								</span>
								<select type="text" id="city" on:change={handlerChangeCity} class="form-control" aria-describedby="cityHelp"></select>
							</div>
							<div id="cityHelp" class="form-text">Selecione em qual cidade está localizado seu imovel.</div>
						</div>
					</div>
					<div class="mb-3">
						<label for="gender" class="form-label">Gênero</label>
						<select id="gender" class="form-select" bind:value={gender}>
							<option value="1">Masculino</option>
							<option value="2">Feminino</option>
							<option value="3">Outros</option>
						</select>
					</div>
				</div>
				<div id="div2" style="display: none;">
					<div class="mb-3">
						<label for="nickname" class="form-label">Nome do perfil</label>
						<input type="text" id="nickname" class="form-control" bind:value={nickname}>
					</div>
					<div class="mb-3">
						<label for="biography" class="form-label">Biografia</label>
						<textarea id="biography" class="form-control" rows="3" bind:value={biography}></textarea>
					</div>
					<div class="mb-3">
						<label for="email" class="form-label">Email</label>
						<input type="email" id="email" class="form-control" bind:value={email}>
					</div>
					<div class="mb-3">
						<label for="password" class="form-label">Senha</label>
						<input type="password" id="password" class="form-control" bind:value={password}>
					</div>
				</div>
				<div class="d-grid gap-2">
					<button type="button" id="btn-prev" class="btn btn-secondary" on:click={prev}>Anterior</button>
					<button type="button" id="btn-next" class="btn btn-primary" on:click={next}>Próximo</button>
				</div>
            </form>
        </div>
    </div>
</div>