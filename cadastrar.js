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

const form = document.getElementById('form-palavra');

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita recarregar a página

  const txtPalavra = document.getElementById("palavra").value.toUpperCase();
  const txtDica = document.getElementById("dica").value;
  const txtCategoria = document.getElementById("categoria").value.toUpperCase();

  try {
    await db.collection("palavras").add({
      texto: txtPalavra,
      dica: txtDica,
      categoria: txtCategoria

    });
    alert("Palavra cadastrada com sucesso!");
    form.reset(); // limpa os campos
  } catch (erro) {
    console.error("Erro ao salvar no Firestore: ", erro);
  }
});