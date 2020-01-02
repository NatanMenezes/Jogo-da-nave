var dx,dy //direções
var nave, bomba, barra, bala, att1, att2, velT
var vel, posX, posY, jogo, mudaX, mudaY, frame, lgTela, alTela;
var tecla
var contbombas, painel, bombastotal, velB
var vida, tmpq
var ie


function teclaDw(){//Reconhece a solicitação das teclas pressionadas

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
        tiro(posX+160,posY)
    }

}

function teclaUp(){//Para a nave quando a tecla é solta

    dx = 0
    dy = 0

}


function inicia(){//Inicializa as variáveis, as posições iniciais e o loop
    jogo = true

    //Elementos
    nave = document.getElementById('imgnave')
    bomba = document.getElementById('missel')
    barra = document.getElementById('barra')

    alTela = window.innerHeight //Altura da tela
    lgTela = window.innerWidth //Largura da tela
    

    dx = dy = 0 //Direções

    vel = 6 //Velocidade da nave
    velt = 9 //Velocidade do tiro
    velB = 3 //Velocidade da bomba

    ie = 0 //Índice de explosão

    //Posição inicial da nave
    posX= window.innerWidth/2
    posY= window.innerHeight/2

    nave.style.top += posY+'px'
    nave.style.left += posX+'px'

    vida = 250

    contbombas= 50

    tmpq = setInterval(criaBomba, 2000)// Cria bombas a cada 2 segundos

    loop() // Chama o loop principal do jog

}


function controlaJog(){//Muda a posição da nave com base no presssionament das teclas

    posX += dx*vel
    posY += dy*vel

    nave.style.top = posY+'px'
    nave.style.left = posX+'px'
}


function loop(){//Função principal, chama as funções e atualiza os procedimentos com o frame
    if(jogo){
        controlaJog()
        controleTiros()
        controlaBombas()
    }
    frame = requestAnimationFrame(loop)
}


window.addEventListener('load', inicia)
document.addEventListener('keydown', teclaDw)
document.addEventListener('keyup', teclaUp)

function tiro(x,y){//Cria o tiro
    bala = document.createElement('div')
    att1 = document.createAttribute('class')
    att2 = document.createAttribute('style')
    att1.value = 'tiro'
    att2.value = 'top:'+y+'px; left:'+x+'px;'
    bala.setAttributeNode(att1)
    bala.setAttributeNode(att2)
    document.body.appendChild(bala)
}


function controleTiros(){//Move e remove os tiros
    var tiros = document.getElementsByClassName('tiro')
    var tam = tiros.length
    for(var i = 0; i < tam; i++){
        if(tiros[i]){
            var pt = tiros[i].offsetTop
            pt -= velt
            tiros[i].style.top = pt+'px'
            colisaoTiroBomba(tiros[i])
            if(pt<0){
                tiros[i].remove()
            }
        }

    }

}


function criaBomba(){//Cria as bombas
    if(jogo){
        var y = 0
        var x = Math.random()*lgTela-50
        var bomba = document.createElement('img')
        var atb1 = document.createAttribute('class')
        var atb2 = document.createAttribute('style')
        var atb3 = document.createAttribute('src')
        atb1.value = 'imgmissel'
        atb2.value = 'top: '+y+'px; left: '+x+'px;'
        atb3.value = 'missel2.gif'
        bomba.setAttributeNode(atb1)
        bomba.setAttributeNode(atb2)
        bomba.setAttributeNode(atb3)
        document.body.appendChild(bomba)
        contbombas--

    }
}


function controlaBombas(){//Move e remove as bombas
    bombastotal =document.getElementsByClassName('imgmissel')
    var tamtot = bombastotal.length

    for(var i = 0; i < tamtot; i++){
        if(bombastotal[i]){
            var posi = bombastotal[i].offsetTop
            posi += velB
            bombastotal[i].style.top = posi+'px'
            if(posi > alTela){
                bombastotal[i].remove()
            }
        }
    }
}

function colisaoTiroBomba(tiro){//Remove os tiros e a bomba com a colisão
    var tamtot = bombastotal.length

    for(var i = 0; i < tamtot; i++){
        if(bombastotal[i]){
            if(
                (
                    (tiro.offsetTop <= (bombastotal[i].offsetTop+60))&&
                    ((tiro.offsetTop+6) >= (bombastotal[i].offsetTop))
                )&&
                (
                    (tiro.offsetLeft <= (bombastotal[i].offsetLeft+60))&&
                    ((tiro.offsetLeft + 6) >= (bombastotal[i].offsetLeft))
                )
            ){
                animaExplosao(bombastotal[i].offsetLeft+60, bombastotal[i].offsetTop+60)
                bombastotal[i].remove()
                tiro.remove()
            }
        }
    }
}


function animaExplosao(x, y){

    var som = document.createElement('audio')


    //Atributos do som
    var att5 = document.createAttribute('src')
    var att6 = document.createAttribute('id')

    att5.value = 'somexp2.mp3'
    att6.value = 'som'+ie

    som.setAttributeNode(att5)
    som.setAttributeNode(att6)

    document.body.appendChild(som)

    document.getElementById('som'+ie).play()
    ie++

}
