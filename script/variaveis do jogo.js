var canvas, ctx, ALTURA, LARGURA, frames = 0;
function clique(event){
    alert("Clique");
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
}
function roda(){}
function atualiza(){} // Atualiza a lógica do jogo
function desenha(){} // Desenha na tela

// Inicia o jogo
main();