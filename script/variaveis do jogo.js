var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 3,

chao = {
    y: 550,
    altura: 50,
    cor: "#c8da78",

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(0, this.y, LARGURA, this.altura);
    }
},

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

    atualiza: function(){
        this.velocidade += this.gravidade;
        this.y += this.velocidade;

        // Impede que o bloco caia abaixo do chao
        if(this.y > chao.y - this.altura){
            this.y = chao.y - this.altura;
            this.qntPulos = 0;
        }
    },

    pula: function(){
        // Impede que o bloco pule mais que o maximo de pulos
        if(this.qntPulos < maxPulos){
            this.velocidade = -this.forcaDoPulo;
            this.qntPulos++;
        }
    },

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
};


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
    bloco.desenha();
} 

// Inicia o jogo
main();