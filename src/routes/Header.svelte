<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	import jQuery from 'jquery'
	import { startTokenExpirationTimer, tokenExpiration } from "../services/AuthService";

	let token, userData;
	let theme, darkModeSwitches, darkModeSwitchLabel;

	onMount(() => {
		token = localStorage.getItem('token');
		userData = JSON.parse(sessionStorage.getItem('user'));

		startTokenExpirationTimer(86400000);

		tokenExpiration.subscribe(value => {
			if (value === 'expired') {
				console.log('O token JWT expirou.');
			}
		});

		jQuery(document).ready(function(){
			theme = localStorage.getItem("theme");
			darkModeSwitches = jQuery(".dark-mode-switch");
			darkModeSwitchLabel = jQuery('.dark-mode-switch-label');

			if(theme == "light") {
				light();
				darkModeSwitches.prop('checked', false);
			}else{
				dark();
				darkModeSwitches.prop('checked', true);
			}

			darkModeSwitches.change(function(){
				if (jQuery(this).is(":checked")) {
					dark();
				} else {
					light();
				}
			});

			function light() {
				jQuery("body").removeClass("bg-dark text-white").addClass("bg-light text-dark")
				jQuery("nav").removeClass("bg-dark").addClass("bg-body-tertiary").removeAttr("data-bs-theme")
				jQuery(".form-shadow").removeClass("bg-dark").addClass("bg-body-tertiary").removeAttr("data-bs-theme")
				

				localStorage.setItem("theme", "light")
				darkModeSwitchLabel.html('Queima olho');
			}

			function dark() {
				jQuery("body").removeClass("bg-light text-dark").addClass("bg-dark text-white")
				jQuery("nav").removeClass("bg-body-tertiary").addClass("bg-dark").attr("data-bs-theme", "dark")
				jQuery(".form-shadow").removeClass("bg-body-tertiary").addClass("bg-dark").attr("data-bs-theme", "dark")

				localStorage.setItem("theme", "dark")
				darkModeSwitchLabel.html('Dark');
			}
		})
	});
</script>
<nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-body">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Olha a casa aí</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="position-absolute top-0 end-0 py-2 px-3">
					{#if token } 
					<div class="btn-group">
						<img src="{userData.profile_picture}" width="40" type="button" class="rounded-circle dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" alt="Avatar">
						<ul class="dropdown-menu dropdown-menu-end dropdown-menu-start">
						  <li><a class="dropdown-item" href="/user/{userData.nickname}">Ver perfil</a></li>
						  <li><a class="dropdown-item" href="/user/settings/account">Gerenciamento de conta</a></li>
						  <li><hr class="dropdown-divider"></li>
						  <li><a class="dropdown-item" href="/properties/interested/">Compras</a></li>
						  <li><a class="dropdown-item" href="/properties/rating">Suas avaliações</a></li>
						  <li><a class="dropdown-item" href="/properties/add">Começar a vender</a></li>
						  <li><hr class="dropdown-divider"></li>
						  <li class="p-1"><div class="form-check form-switch">
							<input class="form-check-input dark-mode-switch" type="checkbox" role="switch">
							<label class="form-check-label dark-mode-switch-label" for="dark-mode-switch">Queima olho</label>
						  </div></li>
						  <li><hr class="dropdown-divider"></li>
						  <li class="p-1"><div class="d-grid gap-2"><a class="btn btn-danger" href="/logout">Sair</a></div></li>
						</ul>
					</div>
					{:else}
					<div class="btn-group">
						<a class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" aria-current="page" href="/signin">Autenticação</a>
						<ul class="dropdown-menu dropdown-menu-end dropdown-menu-start">
							<li><a class="dropdown-item" href="/signin">Entrar na conta</a></li>
						  	<li><a class="dropdown-item" href="/signup">Criar conta</a></li>
						</ul>
					</div>
					{/if}
				</li>
			</ul>
			<form class="position-absolute top-0 start-50 translate-middle-x py-2 px-4" role="search" action="/search">
				<div class="input-group mb-3">
					<input class="form-control" type="search" name="q" placeholder="Faça uma pesquisa" aria-label="Search">
					<button class="input-group-text" id="basic-addon1" type="submit">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
						</svg>
					</button>
				</div>
			</form>
		</div>
	</div>
  </nav>