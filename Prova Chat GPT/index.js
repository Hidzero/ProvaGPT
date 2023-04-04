// Decretando variavel local de contador
let ct = 1;
// Pegando o label pelo id
document.getElementById("rd1").checked = true;

// Fazendo uma função para setar o intervalo de execuções da função
setInterval(function(){
    pxImg();
},5000)

// A função que fara um Loop das imagens
function pxImg(){
    ct++;
    if(ct>4){
        ct = 1;
    }

    document.getElementById("rd"+ct).checked = true;
}