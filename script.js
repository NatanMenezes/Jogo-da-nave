var dx,dy //direções
var nave, bomba, barra, bala, att1, att2, velT
var vel, posX, posY, jogo, mudaX, mudaY, frame, lgTela, alTela;
var tecla
//var tiros, pt, tam

function teclaDw(){
     tecla = event.keyCode

    if(tecla == 37){
        dx = -1
    }else if(tecla == 39){
        dx = 1
    }else if(tecla == 38){
        dy = -1
    }else if(tecla == 40){
        dy = 1
    }else if(tecla == 32){
        tiro(posX+170,posY)
    }

}

function teclaUp(){

    dx = 0
    dy = 0

}


function inicia(){
    jogo = true
    nave = document.getElementById('imgnave')
    bomba = document.getElementById('missel')
    barra = document.getElementById('barra')
    

    dx = dy = 0

    vel = 5
    velt = 8

    posX= window.innerWidth/2
    posY= window.innerHeight/2

    nave.style.top += posY+'px'
    nave.style.left += posX+'px'

    loop()

}
function controlaJog(){

    posX += dx*vel
    posY += dy*vel

    nave.style.top = posY+'px'
    nave.style.left = posX+'px'
}
function loop(){
    if(jogo){
        controlaJog()
    }
    frame = requestAnimationFrame(loop)
}
window.addEventListener('load', inicia)
document.addEventListener('keydown', teclaDw)
document.addEventListener('keyup', teclaUp)

function tiro(x,y){
    bala = document.createElement('div')
    att1 = document.createAttribute('class')
    att2 = document.createAttribute('style')
    att1.value = 'tiro'
    att2.value = 'top:'+y+'px; left:'+x+'px;'
    bala.setAttributeNode(att1)
    bala.setAttributeNode(att2)
    document.body.appendChild(bala)
}


