// const pergunta pega pelo id atraves do DOM
const pergunta = document.getElementById("pergunta");
// const resultado pega pelo id atraves do DOM
const resultado = document.getElementById("resultado");
// Mantem a chave da API guardada
const OPEN_API_KEY = "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"

// Se a pergunta tiver valor e o "Enter" for pressionado ele executa a função 
pergunta.addEventListener("keypress", (e)=>{
    if(pergunta.value && e.key === "Enter")
    enviarPergunta();
});

// Função para enviar a pergunta ao chat e retornar a resposta
function enviarPergunta() {
    var sQuestion = pergunta.value;

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPEN_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: sQuestion,
            max_tokens: 2048, //Tamanho da Resposta
            temperature: 0.5, //Criatividade da Resposta
        }),
    })
        .then((response) => response.json())
        // Tratativa de erro caso de problema na api
        .then((json) => {
            if(resultado.value) resultado.value += "\n";

            if(json.error?.message) {
                resultado.value += `Error: ${json.error.mesage}`;
            } else if(json.choices?.[0].text) {
                var text = json.choices[0].text || 'Não tenho uma resposta';
                resultado.value += 'Chat:' + text + "\n\n";
            }
            resultado.scrollTop = resultado.scrollHeight;
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => {
            pergunta.value = "";
            pergunta.disabled = false;
            pergunta.focus();
        });

    if(resultado.value) resultado.value += '';
    resultado.value += `Eu: ${sQuestion}`
    pergunta.value = 'So um momento, estou pensando...'
    pergunta.disabled = true;

    resultado.scrollTop = resultado.scrollHeight;

}
