const btnTestar = document.getElementById("btn-testar");
const palavras = [];
const dicas = [];
let palavraSorteada = "";
let tamanhoPalavra = 0;
let palavraOculta = "";
const palavra = document.querySelector('.palavra');
const divDica = document.querySelector('.dica');

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
    }
    console.log(dicas[0]);

}

async function main(){
    await carregarDados();
    await carregarPalavras();
    await iniciarJogo();
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


function iniciarJogo(){
    palavraSorteada = palavras[0];
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
    txtDica.innerText = dicas[0];
    divDica.appendChild(txtDica);


    console.log(palavraOculta);

    

}




