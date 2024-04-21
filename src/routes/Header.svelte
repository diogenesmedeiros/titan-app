<script>
	// @ts-nocheck
	import jQuery from 'jquery'
	import { onMount } from "svelte";

	import { startTokenExpirationTimer, tokenExpiration, updateSession } from "../services/AuthService";

	let token
	let userData = [];
	let theme, darkModeSwitches, darkModeSwitchLabel;

	onMount(async () => {
		token = sessionStorage.getItem('token')

		const response = await fetch('http://localhost:8081/api/v1/users', {
			method: 'GET',
			headers: {
				'authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
			}
		})

		if(response.ok) {
			const responseData = await response.json();
			userData = responseData.message
		}

		startTokenExpirationTimer(86400000);
		updateSession()

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
<style>
	.img-r {
		width: 40px;
		height: 40px;
	}
</style>
<nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary border-bottom border-body">
	<div class="container-fluid">
	  <a class="navbar-brand" href="/">Olha a casa aí</a>
	  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse" id="navbarContent">
		<ul class="navbar-nav me-auto"></ul>
		<form class="d-flex mx-auto" role="search" action="/search">
		  <div class="input-group">
			<input class="form-control" type="search" name="q" placeholder="Faça uma pesquisa" aria-label="Search">
			<button class="btn btn-outline-secondary" type="submit">
			  <i class="bi bi-search"></i>
			</button>
		  </div>
		</form>
		<ul class="navbar-nav ms-auto">
		  <li class="nav-item dropdown">
			{#if token}
			{#each userData as user}
			<a class="nav-link dropdown-toggle" href="#" id="userMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
			  <img src="{user.profile_picture}" class="rounded-circle img-r" alt="Avatar">
			</a>
			<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
			  <li>
				<a class="dropdown-item" href="/user/{user.nickname}">
				  <div class="d-flex align-items-center">
					<img src="{user.profile_picture}" class="rounded-circle" style="width: 40px; height: 40px;" alt="Avatar">
					<span class="ms-2">{user.nickname}</span>
				  </div>
				</a>
			  </li>
			  <li><hr class="dropdown-divider"></li>
			  <li><a class="dropdown-item" href="/properties/interested/">Meus interesses</a></li>
			  <li><a class="dropdown-item" href="/properties/sales">Minhas vendas</a></li>
			  <li><hr class="dropdown-divider"></li>
			  <li class="dropdown-item">
				<div class="form-check form-switch">
				  <input class="form-check-input dark-mode-switch" type="checkbox" role="switch">
				  <label class="form-check-label" for="dark-mode-switch">Queima olho</label>
				</div>
			  </li>
			  <li><hr class="dropdown-divider"></li>
			  <li class="dropdown-item">
				<a class="btn btn-danger w-100" href="/auth/logout">Sair</a>
			  </li>
			</ul>
			{/each}
			{:else}
			<a class="nav-link dropdown-toggle" href="#" id="authMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				<i class="bi bi-box-arrow-in-right" style="font-size: 2rem;"></i>
			</a>
			<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="authMenu">
			  <li><a class="dropdown-item" href="/auth/signin">Entrar na conta</a></li>
			  <li><a class="dropdown-item" href="/auth/signup">Criar conta</a></li>
			</ul>
			{/if}
		  </li>
		</ul>
	  </div>
	</div> 
</nav>  