<script>
    function showTab(tabId) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(function(tab) {
            tab.classList.remove('active');
        });
        // Show selected tab content
        document.getElementById(tabId + '-tab').classList.add('active');
    }
</script>
<style>
    .img-r {
        width: 60px;
        height: 60px;
    }
    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
    }
    .btn-primary:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }
    .btn-primary:focus {
        box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.5);
    }
    .config-content {
        margin-top: 20px;
    }
    .tab-content {
        display: none;
    }
    .tab-content.active {
        display: block;
    }
</style>
<div class="position-absolute top-50 start-50 translate-middle">
    <div class="shadow-lg p-3 mb-5 rounded" style="max-width: 600px;">
        <div class="d-flex">
            <div class="p-2 flex-fill border-end">
                <img src="https://i.pinimg.com/736x/41/ec/b0/41ecb0b52ae253915a2e1e4f4a6409ff.jpg" class="rounded-circle img-r" alt="Avatar">
                <div class="p-2"><button type="button" class="btn btn-primary" on:click={showTab('geral')}>Geral</button></div>
                <div class="p-2"><button type="button" class="btn btn-primary" on:click={showTab('atualizar')}>Atualizar conta</button></div>
                <div class="p-2"><button type="button" class="btn btn-primary" on:click={showTab('privacidade')}>Configurações de privacidade</button></div>
            </div>
            <div class="p-2 flex-fill config-content">
                <div class="tab-content active" id="geral-tab">
                    <h2>Geral</h2>
                    <div class="border-bottom"></div>
                    <p>Aqui estão as configurações gerais.</p>
                </div>
                <div class="tab-content" id="atualizar-tab">
                    <h2>Atualizar conta</h2>
                    <div class="border-bottom"></div>
                    <p>Aqui estão as configurações para atualizar a conta.</p>
                </div>
                <div class="tab-content" id="privacidade-tab">
                    <h2>Configurações de Privacidade</h2>
                    <div class="border-bottom"></div>
                    <p>Aqui estão as configurações de privacidade.</p>
                </div>
            </div>
        </div>
    </div>
</div>