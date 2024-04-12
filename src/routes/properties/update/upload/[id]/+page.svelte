<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import jQuery from 'jquery'
    import jquery from "jquery";

    let fileInput;

    export let data

    async function uploadProfilePicture(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('midia', fileInput.files[0]);

        try {
            const response = await fetch(`${localStorage.getItem('url')}/api/v1/properties/upload/${data.id}`, {
                method: 'POST',
                headers: {
                    'authorization': sessionStorage.getItem('token'),
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }
        } catch (err) {
            console.error('Erro durante o upload:', err);
        }
    }

    onMount(() => {
        jquery('#profile_picture_img').click(function() {
            jquery('.profile_picture').click();
        });

        jQuery(document).ready(function() {
            var readyURL = function(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        jQuery('#profile_picture_img').attr('src', e.target.result);
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            };

            jQuery('.profile_picture').on('change', function(event) {
                readyURL(this);
            });
        });
    });
</script>
<style>
    #profile_picture_img {
        width: 200px;
        height: 200px;
    }
</style>
<svelte:head>
    <title>Fazer upload de uma foto - Olha a casa aí</title>
    <meta name="description" content="About this app" />
</svelte:head>
<div class="position-absolute top-50 start-50 translate-middle">
    <div class="shadow-lg p-3 mb-5 rounded form-shadow">
        <form on:submit={uploadProfilePicture} enctype="multipart/form-data" class="row g-3">
            <div class="md-6">
                <div class="text-center">
                    <input type="file" id="midia" class="form-control profile_picture" style="visibility: hidden; width: 1px; height: 1px;" bind:this={fileInput}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/olhaacasaai.appspot.com/o/media%2Fphoto%2Fdefault%2Fprofile_picture.png?alt=media&token=76f1679b-90d5-47cc-9419-702293b5788a" id="profile_picture_img" class="rounded" alt="Avatar">
                </div>
                <p class="text-center m-2">Selecione uma arquivo de video ou foto para o imovel</p>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
    </div>
</div>