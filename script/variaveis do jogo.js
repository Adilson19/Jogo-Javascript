//  Defindo as variaveis do jogo
var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 3,

// Objeto chao
chao = {
    y: 550,
    altura: 50,
    cor: "#c8da78",

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(0, this.y, LARGURA, this.altura);
    }
},

// Objeto bloco
bloco = {
    x: 50,
    y: 0,
    altura: 50,
    largura: 50,
    cor: "#ff9239",
    gravidade: 1.6,
    velocidade: 0,
    forcaDoPulo: 23.6,
    qntPulos: 0,
    // Atualiza a posicao do bloco
    atualiza: function(){
        this.velocidade += this.gravidade;
        this.y += this.velocidade;

        // Impede que o bloco caia abaixo do chao
        if(this.y > chao.y - this.altura){
            this.y = chao.y - this.altura;
            this.qntPulos = 0;
        }
    },
    // Faz o bloco pular
    pula: function(){
        // Impede que o bloco pule mais que o maximo de pulos
        if(this.qntPulos < maxPulos){
            this.velocidade = -this.forcaDoPulo;
            this.qntPulos++;
        }
    },

    // Desenha o bloco na tela
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
},

// Objeto obstaculos
obstaculos = {
    _obs: [],
    cores: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],

    insere: function(){
        this._obs.push({
            x: 200,
            largura: 30 + Math.floor(21 * Math.random()),
            altura: 30 + Math.floor(120 * Math.random()),
            cor: this.cores[Math.floor(5 * Math.random())]
        });
        this.timerInsere = 30 + Math.floor(10 * Math.random());
    },

    atualiza: function(){  

    },

    desenha: function(){
        for(var i = 0, tam = this._obs.length; i < tam; i++){
            var obs = this._obs[i];
            ctx.fillStyle = obs.cor;
            ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
        }
    }
};

// Função que trata o clique do mouse
function clique(event){
    bloco.pula();
}

// Função principal do jogo
function main(){
    ALTURA = window.innerHeight; // Devovlve o tamanho da janela do usuario
    LARGURA = window.innerHeight; // Devovlve o tamanho da janela do usuario

    if(LARGURA >= 500){ // Forcando a largura e altura a ter tamanho fixo
        LARGURA = 600;
        ALTURA = 600;
    }

    canvas = document.createElement("canvas"); // Cria o elemento canvas
    canvas.width = LARGURA; // Define a largura do canvas
    canvas.height = ALTURA; // Define a altura do canvas
    canvas.style.border = "1px solid #000"; // Define uma borda preta para o canvas 

    ctx = canvas.getContext("2d"); // Obtem o contexto 2D do canvas
    document.body.appendChild(canvas); // Adiciona o canvas ao corpo do documento
    document.addEventListener("mousedown", clique);

    roda();
}

// Função que roda o jogo
function roda(){
    atualiza();
    desenha();

    window.requestAnimationFrame(roda); // Chama a função roda novamente
}
function atualiza(){ // Atualiza a lógica do jogo
    frames++;

    bloco.atualiza();
} 
function desenha(){ // Desenha na tela
    ctx.fillStyle = "#80daff"; // Define a cor do fundo
    ctx.fillRect(0, 0, LARGURA, ALTURA); // Desenha o fundo

    chao.desenha();
    obstaculos.desenha();
    bloco.desenha();
} 

// Inicia o jogo funcao principal do jogo
main();