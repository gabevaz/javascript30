/*Basicamente o js vai ser dividido em 3 partes*/

/*1ª - Pegar os elementos*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*2ª - Construir as funções*/

//função para dar play ou pause no video
function togglePlay() {
    // if(video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }

    //outra forma de fazer o mesmo if:
    const method = video.paused  ? 'play' : 'pause';
    video[method]();
}

//função para atualizar os botoes para play e pause
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

//função para pular ou retroceder o video
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

//função para input range de volume e acelerar/desacelerar video
function handleRangeUpdate(){
    //pegar o name e atribuir o value que pegar a partir do evento
    video[this.name] = this.value;
}

//função parar atualizar a barra de tempo 
function handleProgress(){
    //a propriedade que estiliza a posição da barra chama flex-basis e é definida por uma porcentagem, por isso precisamos identificar o tempo do video e a porcentagem de acordo com esse tempo
    //as propriedades currentTime e duration vêm do video
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

//função para permitir q ao clicar na barra de tempo mude o tempo do video
function scrub(e) {
    //e.offsetX pega onde foi clicado, divide pelo tamanho da barra em px e multiplica pela duração do video
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/*3ª Chamar os eventos*/

//chamar a função togglePlay quando clicar no video ou no botao de play/pause
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
//trocar os icones conforme o estado do video (rodando ou pausado)
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
//chamar a função de skip quando clicar no botao de pular ou voltar o video
skipButtons.forEach(button => button.addEventListener('click', skip));
//escutar alguma mudança nos inputs range
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
//chamar evento que ouve o progresso do video conforme ele roda e adicionar a função
video.addEventListener('timeupdate', handleProgress);
//chamar a função scrub quando clicar na barra
progress.addEventListener('click', scrub);
//criar evento para chamar a função scrub quando o mouse é arrastado em cima da barra de tempo
//foi criada a variavel mousedown para identificar se está sendo clicado, se tiver vai chamar a função, se nao, nao vai
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);