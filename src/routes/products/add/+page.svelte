<script>
    // @ts-nocheck
    let title, description, photo_url_product, price, whatsapp_link;

	async function addProductHandlerSubmit(event) {
		event.preventDefault()

        let token = localStorage.getItem('token');
		const formData = {
			title: title,
			description: description,
            photo_url_product: photo_url_product,
            price: price,
            whatsapp_link: whatsapp_link
		}

		try {
			const response = await fetch(`${localStorage.getItem('url')}/api/v1/immobile/addImmobile`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
                    'authorization': token
				},
				body: JSON.stringify(formData)
			})

			const data = await response.json();

			console.log(data)
		}catch (error) {
			console.error(error)
		}
	}
</script>
<svelte:head>
	<title>Add product</title>
	<meta name="description" content="Add product this app" />
</svelte:head>

<form on:submit={addProductHandlerSubmit}>
	<label for="title">title:</label>
	<input type="text" id="title" bind:value={title}>
  
	<label for="description">description:</label>
	<input type="text" id="description" bind:value={description}>

    <label for="photo_url_product">photo_url_product:</label>
	<input type="text" id="photo_url_product" bind:value={photo_url_product}>

    <label for="price">price:</label>
	<input type="text" id="price" bind:value={price}>

    <label for="whatsapp_link">whatsapp_link:</label>
	<input type="text" id="whatsapp_link" bind:value={whatsapp_link}>
  
	<button type="submit">Enviar</button>
</form>