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

    // Parte da requisição das musicas do front
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
async function renderMusicas() {
    const musicList = document.getElementById("music-list");

    try {
        const response = await fetch("/api/musicas");
        if (!response.ok) {
            throw new Error("Erro ao carregar músicas");
        }

        const musicas = await response.json(); 

        musicList.innerHTML = ""; 

        musicas.forEach(musica => {
            const musicItem = document.createElement("div");
            musicItem.className = "music-item";

            const title = document.createElement("h3");
            title.innerText = `${musica.titulo} - ${musica.artista}`;

            const album = document.createElement("p");
            album.innerText = `Álbum: ${musica.album}`;

            
            musicItem.appendChild(title);
            musicItem.appendChild(album);

           
            musicList.appendChild(musicItem);
        });
        
    } catch (error) {
        console.error(error.message);
        musicList.innerHTML = "<p>Erro ao carregar a lista de músicas.</p>";
    }
}

