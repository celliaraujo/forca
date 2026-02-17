const prompt = require('prompt-sync')();

const palavras = ["MACACO", "GALINHA", "PEIXE"];
palavras.push("LEÃO", "COBRA", "MORCEGO");

//console.log(palavras);

let palavraSorteada = palavras[4];
let tamanhoPalavra = palavraSorteada.length;

console.log(`A palavra sorteada possui ${tamanhoPalavra} letras.`);
let palavraOculta = "";
for(let linha = 0; linha < tamanhoPalavra; linha++){
    palavraOculta += "_";
}
console.log(palavraOculta);

while(palavraOculta.includes("_")){
    const entrada = prompt("Digite uma letra: ");
    //console.log("Sua letra foi ", entrada);
    //Fazer um loop com indexof para encontrar cada posição onde a letra aparece....Não precisa... Basta iterar na string e cada posição que a letra for achada, substitui o underline na mesma posição na string da palavra oculta
    if(palavraSorteada.includes(entrada.toUpperCase())){
        //console.log(palavraSorteada[1]);
        //console.log("Letra ENCONTRADA!!!");
        let novaPalavra = "";
        for(let posicao = 0; posicao < tamanhoPalavra; posicao++){
            if(palavraSorteada[posicao] === entrada.toUpperCase()){
                novaPalavra += palavraSorteada[posicao];
            }else{
                novaPalavra += palavraOculta[posicao];
            }
        }
        palavraOculta = novaPalavra;
        console.log(palavraOculta);
    }else{
        console.log(`A letra '${entrada.toUpperCase()}' não faz parte da palavra.`);
    }
}
console.log("Parabéns!!!")
