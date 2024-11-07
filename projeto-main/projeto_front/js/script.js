function mostrarSenha(){
    var x = document.getElementById("senha1")
    if(x.type === "password"){
        x.type = Text;
    }else{
        x.type = "password";
    }

}

function confirmarSenha() {
    const senha1 = document.getElementById('senha1').value;
    const senha2 = document.getElementById('senha2').value;
    const mensagem = document.getElementById('mensagem');

    if (senha1 !== senha2) {
        mensagem.textContent = "As senhas não coincidem. Tente novamente!";
    } else {
        mensagem.textContent = "Senhas coincidem!";
        
    }
}
function procuraMusicas(músicas) {
    procurar.addEventListener("click"), () => {
        const searchTerm = searchBar.value.toLowerCase().trim();

        if (searchTerm === "") {
            fishList.innerHTML = "<li>Digite um termo para iniciar a busca</li>";
            return;
        }
    }
}
