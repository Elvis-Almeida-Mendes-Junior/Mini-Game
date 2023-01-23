//criar player ramdomicamente
//criar fruta ramdomicamente
//adicionar movimentos
//habilitar movimentos apenas se o buttom for clicado
//indicar limites para os movimentos
//criar colisão entre player e fruta
//reset da fruta
//contabilizar pontos
//mostrar na tela
//set time
//stop 


const canvas = document.getElementById('canvas');//get canvas
const ctx = canvas.getContext('2d');//set contxt
const score = document.getElementById('score');//get score
const timing = document.getElementById('timing');//get timing
const btn = document.querySelector('button')//get button
let jogando = false;//jogando?
let pontos = 0;
let interval;
let time = 0;

const elements = {
    player:{
        x:Math.floor(Math.random() * 10),
        y:Math.floor(Math.random() * 10)
    },
    fruts:{
        x:Math.floor(Math.random() * 10),
        y:Math.floor(Math.random() * 10)
    }
}//elementos que vão ser desenhados

const generateElements = {
    playerGenerate(){
        ctx.fillStyle = '#2C82C9';
        ctx.fillRect(elements.player.x,elements.player.y, 1,1);
    },
    frutsGenerate(){
        ctx.fillStyle = '#2CC990'
        ctx.fillRect(elements.fruts.x,elements.fruts.y, 1,1);
    }
}//gerar esses elementos na tela

const aceptMove = {
    d(){
        if(limites.right()){
            elements.player.x +=1
        }
        
    },
    a(){
        if(limites.left()){

            elements.player.x -=1
        }
    },
    s(){
        if(limites.bottom()){
            elements.player.y +=1
        }

    },
    w(){
        if(limites.top())
        elements.player.y -=1
    }
}//movimentos aceitos

const limites = {
    top(){
        if(elements.player.y - 1 < 0){
            return false
        }
        else{
            return true
        }
    },
    bottom(){
        if(elements.player.y + 1 >= 10){
            return false
        }
        else{
            return true
        }
    },
    right(){
        if(elements.player.x + 1 >= 10){
            elements.player.x = 0
            return false
        }
        else{
            return true
        }
    },
    left(){
        if(elements.player.x - 1 < 0){
            elements.player.x = 9
            return false
        }
        else{
            return true
        }
    }
}//setar um limite // não pode sair da tela 

const createCollision = {
    checkCollision(){
        if(elements.player.x === elements.fruts.x && elements.fruts.y === elements.player.y){
            contablePoints.addPoints()
            return true
        }else{
            return false
        }
    },
    removeFruts(){
        if(this.checkCollision()){
            delete elements.fruts.y
            delete elements.fruts.x

            return true;
        }else{
            return false
        }
    },
    resetFruts(){
        if(this.removeFruts()){
           elements.fruts.x =  Math.floor(Math.random() * 10)
           elements.fruts.y = Math.floor(Math.random() * 10)
        }
    }
}//logica da collisão // logica do reset da fruta

const contablePoints = {
    addPoints(){
        pontos += 1
        score.innerText = pontos
    }
}
const btnFunctions = {
    setGameMode(){
        if(jogando === true){
            jogando = false
            clearInterval(interval)
            btn.innerHTML = 'Play';
        }else{
            jogando = true
            btn.innerHTML = 'Stop';
            setTime()
        }
        console.log(jogando)
    },
    breakButton(){
        btn.innerHTML = 'Refresh';
        btn.disabled = true;
    },
    play(){
        btnFunctions.setGameMode()
    }//mudar o estado de jogo
}
function setTime(){
        interval = setInterval(cronometro,100)

}
function cronometro(){

    time+=1
    timing.innerHTML-=1

    if(time === 20){
        clearInterval(interval);
        jogando = false;
        btnFunctions.breakButton()
    }



}



function renderElements(){
    ctx.fillStyle = '#ccc'
    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    generateElements.playerGenerate();
    generateElements.frutsGenerate();
    createCollision.resetFruts()


    requestAnimationFrame(renderElements)
}//exibe toda a parte grafica

document.addEventListener('keydown',(e)=>{
    let keyPressed = e.key;
    let move = aceptMove[keyPressed];

    if(move && jogando === true){
        move()
    }//setar os movimentos
    
});
btn.addEventListener('click',btnFunctions.play)
renderElements()