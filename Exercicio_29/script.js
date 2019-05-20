//variavel global para contagem do tempo
let countdown;
//selecionar a div onde o timer irá ser exibido
const timerDisplay = document.querySelector('.display__time-left');
//selecionar a div onde o horario após o timer irá ser exibido
const endTime = document.querySelector('.display__end-time');
//selecionar os botoes que vao determinar o tempo do timer
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //quando iniciar o timer limpar qualquer outro timer que exista para que quando clicar nos botoes, eles nao rodem ao mesmo tempo, se tiver algum timer no countdown ele vai limpar
    clearInterval(countdown);

    //descobrir quando o timer começou
    const now = Date.now();
    const then = now + seconds * 1000;
    //a cada segundo exibir quando tempo falta

    //exibir a contagem antes do interval, para aparecer o tempo total
    displayTimeLeft(seconds);
    //exibir a hora pós contagem quando rodar essa função
    displayEndTime(then);

    countdown = setInterval(() => {
        //fazer a contagem do tempo decrescente
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //ao usar a função acima, pode ver no console que ao diminuir e passar do zero ele começa a contar negativo, por isso é necessario parar a função quando chegar em um valor menos que zero
        if(secondsLeft < 0) {
            clearInterval(countdown);  
            return;
        }

        //exibir o contador no console
        displayTimeLeft(secondsLeft);
    }, 1000); 
}

//ao usar apenas o interval, ele começa a rodar a partir do tempo que foi colocado, no caso, 1 segundo, por isso caso tenha 10 segundos ele vai começar a contar a partir do 9, por isso precisamos criar uma função para exibir o tempo que falta
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    //atribuir a variavel criada la em cima os valores de minutos e segundos
    //fazer um if para os segundos, caso o numero seja menor que 10 adicionar um zero na frente
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    //adicionar o timer à tab no browser (title)
    document.title = display;
    timerDisplay.textContent = display;
}

//exibir o tempo final, depois que o timer acabar (exemplo: volte tal hora)
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

//funcao para iniciar o timer quando clica no botao
function startTimer() {
    //pegar os valores do data-time do botao que foi clicado e transformar em int
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

//identificar o evento do click no botao e atribuir a função 
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    //pegar o que foi digitado
    const mins = this.minutes.value;
    //atribuir como parametro da funcao, transformando em segundos
    timer(mins * 60);
    //limpar cada vez que for digitado outro
    this.reset();
});