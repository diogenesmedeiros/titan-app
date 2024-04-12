<script>
    if(typeof sessionStorage !== 'undefined' && sessionStorage !== null) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        window.location.href = '/signin'
    }
</script>