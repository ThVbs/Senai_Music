// Dados fictícios
const playlists = [
    { name: "Hits 2023" },
    { name: "Relax" },
    { name: "Workout" },
    { name: "Indie Vibes" }
];

const likedSongs = [
    "Canção 1 - Artista A",
    "Canção 2 - Artista B",
    "Canção 3 - Artista C",
    "Canção 4 - Artista D",
];

// Função para carregar playlists
function loadPlaylists() {
    const playlistContainer = document.getElementById("playlist-container");
    playlists.forEach(playlist => {
        const div = document.createElement("div");
        div.classList.add("playlist");
        div.textContent = playlist.name;
        playlistContainer.appendChild(div);
    });
}

// Função para carregar músicas curtidas
function loadLikedSongs() {
    const likedSongsContainer = document.getElementById("liked-songs");
    likedSongs.forEach(song => {
        const li = document.createElement("li");
        li.textContent = song;
        likedSongsContainer.appendChild(li);
    });
}

// Inicializa os dados na página
loadPlaylists();
loadLikedSongs();
