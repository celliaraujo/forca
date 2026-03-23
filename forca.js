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



const firebaseConfig = {
  apiKey: "AIzaSyDLDQaewAaEvDkW3j_CaTSaqJk9nduZbPU",
  authDomain: "forca-game-42393.firebaseapp.com",
  projectId: "forca-game-42393",
  storageBucket: "forca-game-42393.appspot.com",
  messagingSenderId: "508078540374",
  appId: "1:508078540374:web:85c383e66efc95cea1ddf7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function cadastrarPalavra(palavra, dica) {
  await db.collection("palavras").add({ palavra, dica });
  alert("Palavra cadastrada!");
}

async function carregarPalavras() {
  const snapshot = await db.collection("palavras").get();
  let lista = [];
  snapshot.forEach(doc => lista.push(doc.data()));
  return lista;
}

/* async function carregarDados(){
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

} */


/* async function carregarPalavras(){
    const objeto = await carregarDados();

    for(let posicao = 0; posicao < objeto.palavras.length; posicao++){
        palavras.push(objeto.palavras[posicao].texto);
        dicas.push(objeto.palavras[posicao].dica);
        indicePalavras.push(posicao);
    }

    indicePalavras = shuffle(indicePalavras);
    console.log(indicePalavras);


} */

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
    txtDica.innerText = "Dica: " + dicas[indicePalavras[palavraAtual]];
    divDica.appendChild(txtDica);

    console.log(palavraOculta);    

}

function parabens(){
    let parabens = document.createElement('h4');
    parabens.innerText = "PARABÉNS!!!"
    const inputArea = document.querySelector('.input-area');
    inputArea.innerHTML = "";
    inputArea.appendChild(parabens);

}

function shuffle(dados){
    for(let i = dados.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [dados[i], dados[j]] = [dados[j], dados[i]];
    }

    return dados;
}

async function main(){
    const lista = await carregarPalavras();

  // Preenche os arrays palavras e dicas com os dados do Firestore
  for (let posicao = 0; posicao < lista.length; posicao++) {
    palavras.push(lista[posicao].palavra);
    dicas.push(lista[posicao].dica);
    indicePalavras.push(posicao);
  }

  // Embaralha os índices
  indicePalavras = shuffle(indicePalavras);

  // Só inicia o jogo se houver palavras
  if (palavras.length > 0) {
    iniciarJogo();
  } else {
    console.error("Nenhuma palavra encontrada no Firestore!");
  }
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

    if(!palavraOculta.includes('_')){
        parabens();
    }

});