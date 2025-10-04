//  Defindo as variaveis do jogo
var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 3, velocidade = 6, estadoAtual,

    // Estados do jogo
    estados = {
        jogar: 0,
        jogando: 1,
        perdeu: 2
    },

    // Objeto chao
    chao = {
        y: 550,
        altura: 50,
        cor: "#c8da78",

        desenha: function () {
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
        score: 0,

        // Atualiza a posicao do bloco
        atualiza: function () {
            this.velocidade += this.gravidade;
            this.y += this.velocidade;

            // Impede que o bloco caia abaixo do chao
            if (this.y > chao.y - this.altura && estadoAtual != estados.perdeu) {
                this.y = chao.y - this.altura;
                this.qntPulos = 0;
                this.velocidade = 0;
            }
        },
        // Faz o bloco pular
        pula: function () {
            // Impede que o bloco pule mais que o maximo de pulos
            if (this.qntPulos < maxPulos) {
                this.velocidade = -this.forcaDoPulo;
                this.qntPulos++;
            }
        },

        reset: function () {
            this.velocidade = 0;
            this.y = 0;
            this.score = 0;
        },

        // Desenha o bloco na tela
        desenha: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.largura, this.altura);
        }
    },

    // Objeto obstaculos
    obstaculos = {
        _obs: [],
        cores: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
        tempoInsere: 0,

        insere: function () {
            this._obs.push({
                x: LARGURA,
                //largura: 30 + Math.floor(21 * Math.random()),
                largura: 50,// locando uma largura fixa
                altura: 30 + Math.floor(120 * Math.random()),
                cor: this.cores[Math.floor(5 * Math.random())]
            });
            this.tempoInsere = 30 + Math.floor(21 * Math.random());
        },

        // Atualiza a posicao dos obstaculos
        atualiza: function () {
            // Veifica se eh tempo de inserir um novo obstaculo
            if (this.tempoInsere == 0)
                this.insere();
            else
                this.tempoInsere--;



            for (var i = 0, tam = this._obs.length; i < tam; i++) {
                var obs = this._obs[i];

                obs.x -= velocidade;

                if (bloco.x < obs.x + obs.largura && bloco.x + bloco.largura >= obs.x && bloco.y + bloco.altura >= chao.y - obs.altura)
                    estadoAtual = estados.perdeu;

                else if (obs.x == 0)
                    bloco.score++;

                else if (obs.x <= -obs.largura) {
                    this._obs.splice(i, 1);
                    tam--;
                    i--;
                }
            }
        },

        limpa: function () {
            this._obs = [];
        },

        desenha: function () {
            for (var i = 0, tam = this._obs.length; i < tam; i++) {
                var obs = this._obs[i];
                ctx.fillStyle = obs.cor;
                ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
            }
        }
    };

// Função que trata o clique do mouse
function clique(event) {
    if (estadoAtual == estados.jogando)
        bloco.pula();

    else if (estadoAtual == estados.jogar) {
        estadoAtual = estados.jogando;
    }

    else if (estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA) {
        estadoAtual = estados.jogar;
        obstaculos.limpa();
        bloco.reset();        
    }
}

// Função principal do jogo
function main() {
    ALTURA = window.innerHeight; // Devovlve o tamanho da janela do usuario
    LARGURA = window.innerWidth; // Devovlve o tamanho da janela do usuario

    if (LARGURA >= 500) { // Forcando a largura e altura a ter tamanho fixo
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

    estadoAtual = estados.jogar; // Define o estado inicial do jogo
    roda();
}

// Função que roda o jogo
function roda() {
    atualiza();
    desenha();

    // Chama a função roda novamente
    window.requestAnimationFrame(roda);
}

// Atualiza a lógica do jogo
function atualiza() {
    frames++;

    bloco.atualiza();

    if (estadoAtual == estados.jogando)
        obstaculos.atualiza();
}

//  Funcao que Desenha na tela
function desenha() {
    ctx.fillStyle = "#80daff"; // Define a cor do fundo
    ctx.fillRect(0, 0, LARGURA, ALTURA); // Desenha o fundo

    // Mudando a cor para branco
    ctx.fillStyle = "#fff";
    ctx.font = "50px Arial";
    ctx.fillText(bloco.score, 30, 68);

    if (estadoAtual == estados.jogar) {
        ctx.fillStyle = "green";
        ctx.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);
    }

    else if (estadoAtual == estados.perdeu) {
        ctx.fillStyle = "red";
        ctx.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);

        ctx.save();
        ctx.translate(LARGURA / 2, ALTURA / 2);
        ctx.fillStyle = "#fff";

        if(bloco.score < 10)
            ctx.fillText(bloco.score, -13, 19);

        else if (bloco.score >= 10 && bloco.score < 100)
            ctx.fillText(bloco.score, -26, 19);
        else
            ctx.fillText(bloco.score, -39, 19);

        ctx.restore();
    }

    else if (estadoAtual == estados.jogando)
        obstaculos.desenha();

    chao.desenha();
    bloco.desenha();
}

// Inicia o jogo funcao principal do jogo
main();