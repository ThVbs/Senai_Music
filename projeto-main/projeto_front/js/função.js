
const musicas = [
    'musica1.mp3',
    'musica2.mp3',
    'musica3.mp3'
  ];
  

  let musicaAtual = 0;

  const audio = document.getElementById('audio');
  
  function tocarMusica() {
    audio.src = musicas[musicaAtual];  
    audio.play();  
  }
  
  
  function pausarMusica() {
    audio.pause();  
  }
  
  function proximaMusica() {
    musicaAtual = (musicaAtual + 1) % musicas.length;  
    tocarMusica();  
  }
  

  function musicaAnterior() {
    musicaAtual = (musicaAtual - 1 + musicas.length) % musicas.length;  
    tocarMusica(); 
  }
  