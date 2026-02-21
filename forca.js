const btnTestar = document.getElementById("btn-testar");
const palavras = [];
const dicas = [];
let palavraSorteada = "";
let tamanhoPalavra = 0;
let palavraOculta = "";
const palavra = document.querySelector('.palavra');
const divDica = document.querySelector('.dica');
let palavraAtual = 0;
let indicePalavras = [];

async function carregarDados(){
    try {
        const resposta = await fetch('dados.json');
        if(!resposta.ok){
            throw new Error('Erro ao carregar dados.');
        }

        const dados = await resposta.json();

        console.log(dados);
        return dados;
    }catch(erro){
        console.error('Erro ao buscar JSON: ', erro);
    }

}


async function carregarPalavras(){
    const objeto = await carregarDados();

    for(let posicao = 0; posicao < objeto.palavras.length; posicao++){
        palavras.push(objeto.palavras[posicao].texto);
        dicas.push(objeto.palavras[posicao].dica);
        indicePalavras.push(posicao);
    }

    indicePalavras = shuffle(indicePalavras);
    console.log(indicePalavras);


}

function iniciarJogo(){
    palavraSorteada = palavras[indicePalavras[palavraAtual]];
    tamanhoPalavra = palavraSorteada.length;
    console.log(`A palavra sorteada possui ${tamanhoPalavra} letras.`);
    palavraOculta = "";
    for(let letra = 0; letra < tamanhoPalavra; letra++){
        palavraOculta += "_";
        let caixa = document.createElement('div');
        caixa.classList.add('caixa');
        caixa.id = `letra${letra}`;
        palavra.appendChild(caixa);

    }

    let txtDica = document.createElement('h3');
    txtDica.innerText = dicas[indicePalavras[palavraAtual]];
    divDica.appendChild(txtDica);

    console.log(palavraOculta);    

}

async function main(){
    await carregarDados();
    await carregarPalavras();
    await iniciarJogo();
}

function shuffle(dados){
    for(let i = dados.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [dados[i], dados[j]] = [dados[j], dados[i]];
    }

    return dados;
}

main();


btnTestar.addEventListener('click', function(){
    const inputLetra = document.getElementById("letra");
    if(palavraSorteada.includes(inputLetra.value.toUpperCase())){        
        let novaPalavra = "";
        for(let posicao = 0; posicao < tamanhoPalavra; posicao++){
            if(palavraSorteada[posicao] === inputLetra.value.toUpperCase()){
                const letraAtual = document.getElementById(`letra${posicao}`);
                letraAtual.innerText = inputLetra.value.toUpperCase();
                novaPalavra += inputLetra.value.toUpperCase();
            }else{
                novaPalavra += palavraOculta[posicao];
            }            
        }
        palavraOculta = novaPalavra;
    }
    inputLetra.value = "";

});