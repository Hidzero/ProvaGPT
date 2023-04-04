// variavel pergunta 
const pergunta = document.getElementById('pergunta');

const resultado = document.getElementById('resultado');

const OPEN_API_KEY = "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"

pergunta.addEventListener('keypress', (e)=>{
    if(pergunta.value && e.key === 'Enter')
    enviarPergunta();
});


function enviarPergunta() {
    var sQuestion = pergunta.value;

    fetch("https://api.openai.com/v1/completions", {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + OPEN_API_KEY,
        },
            body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: sQuestion,
            max_tokens: 2048, //Tamanho da Resposta
            temperature: 0.5, //Criatividade da Resposta
        }),
    })
        .then((response) => response.json())
        .then((json) => {
            if(resultado.value) resultado.value += '\n'

            if(json.error?.message){
                resultado.value += `Error: ${json.error.mesage}`
            } else if(json.choices?.[0].text){
                var text = json.choices[0].text || 'Não tenho uma resposta';
                resultado.value += 'Chat ' + text;
            }
            resultado.scrollTop = resultado.scrollHeight;
        })
        .catch((error) => console.error('Error:', error))
        .finally(() => {
            pergunta.value = '';
            pergunta.disabled = true;
            pergunta.focus();
        });

    if(resultado.value) resultado.value += '\n\n\n';
    resultado.value += `Eu: ${sQuestion}`
    pergunta.value = 'So um momento, estou pensando...'
    pergunta.disabled = true;

    resultado.scrollTop = resultado.scrollHeight;

}
