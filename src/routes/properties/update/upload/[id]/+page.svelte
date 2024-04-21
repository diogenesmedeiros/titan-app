<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import jquery from "jquery";
  
    let fileInput, thumbnailFile;
  
    export let data;

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

    async function uploadThumbnail(event) {
      event.preventDefault();

      alerts('Aguarde...', 'warning')
  
      let formData = new FormData();
  
      // Verifique se há arquivos para enviar
      if (thumbnailFile.files.length === 0) {
        console.error("Nenhum arquivo selecionado para upload.");
        return;
      }
  
      formData.append('midia', thumbnailFile.files[0]);
  
      try {
        const response = await fetch(`http://localhost:8081/api/v1/properties/upload/thumbnail/${data.id}`, {
          method: 'POST',
          headers: {
            'authorization': sessionStorage.getItem('token'),
          },
          body: formData,
        });
  
        if (response.ok) {
          const responseData = await response.json();
          alerts(responseData.message, 'success')
        } else {
          alerts('Não foi possivel fazer o upload', 'danger')
        }
      } catch (err) {
        return false;
      }
    }
  
    async function uploadPictures(event) {
      event.preventDefault();
  
      let formData = new FormData();
  
      // Verifique se há arquivos para enviar
      if (fileInput.files.length === 0) {
        console.error("Nenhum arquivo selecionado para upload.");
        return;
      }
  
      // Adicione todos os arquivos ao FormData
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.delete('midia');
        formData.append('midia', fileInput.files[i]);
  
        try {
          const response = await fetch(`http://localhost:8081/api/v1/properties/upload/midia/${data.id}`, {
            method: 'POST',
            headers: {
              'authorization': sessionStorage.getItem('token'),
            },
            body: formData,
          });
  
          if (response.ok) {
            const responseData = await response.json();

            if(fileInput.files.length == i) {
              alerts(responseData.message, 'success')
            }
          } else {
            if(fileInput.files.length == i) {
              alerts('Não foi possivel fazer o upload', 'danger')
            }
          }
        } catch (err) {
          console.error('Erro durante o upload:', err);
        }
      }
    }
  
    onMount(() => {
      jquery('#thumbnail_img').click(() => {
        jquery('.thumbnail').click();
      });
  
      jquery('#profile_picture_img').click(() => {
        jquery('.profile_picture').click();
      });
  
      jquery('.thumbnail').on('change', function () {
        const files = this.files;
        jquery('#preview_area_thumbnail').empty();
  
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = "img-thumbnail";
            img.width = 100; // Tamanho da pré-visualização
            jquery('#preview_area_thumbnail').append(img);
          };
          reader.readAsDataURL(files[i]);
        }
      });
  
      jquery('.profile_picture').on('change', function () {
        const files = this.files;
        jquery('#preview_area').empty();
  
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = "img-thumbnail";
            img.width = 100;
            jquery('#preview_area').append(img);
          };
          reader.readAsDataURL(files[i]);
        }
      });
    });
  </script>
  
  <style>
    #preview_area, #preview_area_thumbnail {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
  
    .file-input {
      visibility: hidden;
      position: absolute;
      width: 1px;
      height: 1px;
    }
  </style>
  <div id="liveAlertPlaceholder" class="position-fixed top-0 end-0 p-3 m-4" style="z-index: 9999"></div>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg form-shadow">
      <h3 class="card-title text-center">Upload de Imagens</h3>
      <form on:submit={uploadPictures} enctype="multipart/form-data">
        <div class="mb-3 text-center">
          <input type="file" id="thumbnail_input" class="file-input thumbnail" accept="image/*" bind:this={thumbnailFile} on:change={uploadThumbnail} />
          <button type="button" class="btn btn-outline-primary" id="thumbnail_img">Selecionar capa (600x400)</button>
        </div>
        <div id="preview_area_thumbnail" class="mb-3"></div>
        <p class="text-center">Selecione uma imagem para a capa do imóvel</p>
        <div class="mb-3 text-center">
          <input type="file" id="profile_input" class="file-input profile_picture" multiple accept="image/*" bind:this={fileInput} />
          <button type="button" class="btn btn-outline-primary" id="profile_picture_img">Selecionar Imagens (600x400)</button>
        </div>
        <div id="preview_area" class="mb-3"></div>
        <p class="text-center">Selecione uma ou mais imagens para o imóvel</p>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary">Enviar</button>
        </div>
      </form>
    </div>
  </div>
  