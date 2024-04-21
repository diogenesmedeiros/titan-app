<script>
    // @ts-nocheck
    let title, description, price, state, city, address, cep, typeProperty, roomNumbers, totalArea, constructionYear, includedAmenities, saleConditions, instagram, instagramContact, phone, whatsappContact;
	let formData;

    function alertMessage(message, type) {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        const wrapper = document.createElement('div');

        alertPlaceholder.innerHTML = ''
            
        wrapper.innerHTML = `
        <div class="alert alert-${type} float-end m-4 alert-dismissible z-3" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;

        alertPlaceholder.append(wrapper);
    }

        // Função para formatar valores para moeda BRL
        const formatarMoeda = (valor) => {
        // Remover caracteres que não são dígitos
        const apenasNumeros = valor.replace(/[^\d]/g, '');

        // Converter para número decimal
        const numero = parseFloat(apenasNumeros) / 100;

        // Formatador para moeda BRL
        const formatador = Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formatador.format(numero);
    };

    // Evento para ajustar a entrada do usuário conforme a digitação
    const aoDigitar = (event) => {
        const campo = event.target;
        const valorBruto = campo.value;

        // Aplicar formatação
        const valorFormatado = formatarMoeda(valorBruto);

        const cursorPosition = campo.selectionStart;

        campo.value = valorFormatado;

        // Ajustar posição do cursor para evitar bugs
        campo.selectionStart = cursorPosition;
        campo.selectionEnd = cursorPosition;

        price = valorFormatado
    };

    async function addProductHandlerSubmit(event) {
        event.preventDefault();

        alert(price)

    	formData = {
            title: title,
            description: description,
            price: price,
            state: state,
            city: city,
            address: address,
            cep: cep,
            typeProperty: typeProperty,
            roomNumbers: roomNumbers,
            totalArea: totalArea,
            constructionYear: constructionYear,
            includedAmenities: includedAmenities,
            saleConditions: saleConditions,
            instagram: instagram,
            phone: phone,
        };

        try {
            const response = await fetch('http://localhost:8081/api/v1/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify(formData)
            });

            if(response.ok) {
                const data = await response.json();

                if(data.message != undefined) {
					alertMessage(data.message, 'success')

					setTimeout(() => {
						alertPlaceholder.innerHTML=''
					}, 6000);
				}

				setTimeout(() => {
                    window.location.href = `/properties/update/upload/${data.id}`
				}, 4000);
            }else{
                const data = await response.json();

                if(data.message != undefined) {
                    alertMessage(data.message, 'danger')

                    setTimeout(() => {
                    }, 6000);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getCepInfo() {
        try {
            const cep = document.getElementById('cep').value

            const response = await fetch(`https://api.postmon.com.br/v1/cep/${cep}`);
            const cepData = await response.json();

            city = cepData.cidade;
            state = cepData.estado;

            /*
            logradouro
            bairro
            */
        }catch(err) {
            alertMessage(err, 'danger')
        }
    }
</script>
<svelte:head>
	<title>Adicionar imovel - Olha a casa aí</title>
	<meta name="description" content="Add product this app" />
</svelte:head>
<div id="liveAlertPlaceholder" class="position-fixed top-0 end-0 p-3 m-4" style="z-index: 9999"></div>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="shadow-lg p-3 mb-5 rounded form-shadow" style="margin-top: 5%;">
                <form on:submit={addProductHandlerSubmit} class="row g-3">	  
                    <div class="mb-3">
                        <label for="title" class="form-label">Titulo do imovel</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="title" bind:value={title} aria-describedby="titleHelp">
                        </div>
                        <div id="titleHelp" class="form-text">Coloque algo que atraia seus clientes.</div>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Descrição do imovel</label>
                        <textarea type="text" class="form-control" id="description" bind:value={description} aria-describedby="descriptionHelp"></textarea>
                        <div id="descriptionHelp" class="form-text">Fale um pouco sobre seu imovel.</div>
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Preço do imovel</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="price" bind:value={price} on:input={aoDigitar} aria-describedby="priceHelp">
                        </div>
                        <div id="descriptionHelp" class="form-text">Dê um preço ao seu imovel.</div>
                    </div>
                    <div class="col-12">
                        <label for="cep" class="form-label">CEP</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="cep" bind:value={cep} aria-describedby="cepHelp">
                            <button type="button" class="btn btn-secondary" on:click={getCepInfo}>buscar</button>
                        </div>
                        <div id="titleHelp" class="form-text">Coloque o cep onde a sua casa esta localizada. Automaticamente sua cidade e estados serão preenchidas, assim como a rua e o bairro.</div>
                    </div>
                    <div class="col-12">
                        <label for="address" class="form-label">Rua</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"/>
                                    <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="address" bind:value={address} aria-describedby="addressHelp">
                        </div>
                        <div id="addressHelp" class="form-text">Rua onde sua casa esta localizada.</div>
                    </div>
                    <div class="col-12">
                        <label for="typeProperty" class="form-label">Tipo de propriedade</label>
                        <select id="typeProperty" class="form-control" bind:value={typeProperty}>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Terreno">Terreno</option>
                            <option value="Comercial">Comercial</option>
                        </select>
                        <div id="titleHelp" class="form-text">Selecione o tipo da propriedade.</div>
                    </div>            
                    <div class="col-12">
                        <label for="roomNumbers" class="form-label">Número de quartos</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-closed-fill" viewBox="0 0 16 16">
                                    <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="roomNumbers" bind:value={roomNumbers} aria-describedby="roomNumbersHelp">
                        </div>
                        <div id="roomNumbersHelp" class="form-text">Coloque o número de quartos existentes.</div>
                    </div>
                    <div class="col-md-6">
                        <label for="totalArea" class="form-label">Área Total (em metros quadrados)</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rulers" viewBox="0 0 16 16">
                                    <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1z"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="totalArea" bind:value={totalArea} aria-describedby="totalAreaHelp">
                        </div>
                        <div id="totalAreaHelp" class="form-text">Coloque a área total que a propriedade tem em metros quadrados.</div>
                    </div>
                    <div class="col-md-6">
                        <label for="constructionYear" class="form-label">Ano da construção</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </span>
                            <input type="date" class="form-control" id="constructionYear" bind:value={constructionYear} aria-describedby="constructionYearHelp">
                        </div>
                        <div id="constructionYearHelp" class="form-text">Coloque o ano de construção da propriedade.</div>
                    </div>
                    <div class="col-md-6">
                        <label for="title" class="form-label">Comodidades Incluídas</label>
                        <select id="comodidadesIncluidas" class="form-control" bind:value={includedAmenities}>
                            <option value="Garagem">Garagem</option>
                            <option value="Jardim">Jardim</option>
                            <option value="Piscina">Piscina</option>
                            <option value="Varanda">Varanda</option>
                            <option value="Churrasqueira">Churrasqueira</option>
                            <option value="Garagem, Jardim Piscina, Varanda, Churrasqueira">Todas as opções</option>
                            <option value="Não tem">Nenhuma das opções</option>
                        </select>
                        <div class="form-text">Selecione as comodidades Incluídas.</div>
                    </div>
                    <div class="col-md-6">
                        <label for="title" class="form-label">Condições de Venda</label>
                        <select id="condicoesVenda" class="form-control" bind:value={saleConditions}>
                            <option value="À vista">À vista</option>
                            <option value="Financiado">Financiado</option>
                            <option value="Aluguel com opção de compra">Aluguel com opção de compra</option>
                        </select>
                        <div id="titleHelp" class="form-text">Coloque qual o tipo de condição de venda.</div>
                    </div>            
                    <div class="col-md-6">
                        <label for="instagram" class="form-label">Seu nome de usuário do Instagram</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="instagram" bind:value={instagram} aria-describedby="instagramHelp">
                            <div class="form-check m-2">
                                <input class="form-check-input" type="checkbox" value="instagram" bind:this={instagramContact} id="instagramContact">
                                <label class="form-check-label" for="instagramContact">Usar meu numero para contato no instagram. Tem como você deixar um instagram padrão nas configurações, então deixe essa opção ativa caso você queira usa-la.</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="phone" class="form-label">Seu numero de whatsapp</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="phone" bind:value={phone} aria-describedby="phoneHelp">
                            <div class="form-check m-2">
                                <input class="form-check-input" type="checkbox" value="whatsapp" bind:this={whatsappContact} id="whatsappContact">
                                <label class="form-check-label" for="whatsappContact">Usar meu numero para contato no whatsapp. Tem como você deixar um numero padrão nas configurações, então deixe essa opção ativa caso você queira usa-la.</label>
                            </div>
                        </div>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>