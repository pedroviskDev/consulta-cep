const formulario = document.getElementById("formulario");
const formularioEndereco = document.getElementById("formulario__endereco")
const divEndereco = document.querySelector(".endereco")
formulario.addEventListener("submit", (e) =>{
    const cep = formulario.cep.value;
    const cepValido = validarCep(cep);
    e.preventDefault();
    if(cepValido){
        fetch(`https://viacep.com.br/ws/${cepValido}/json/`).then(response => {
            response.json()
              .then((dados) => {
                if(dados.hasOwnProperty('erro')){
                    alert("CEP inexistente");
                }else{
                    preencherCampos(dados)
                    divEndereco.classList.add("show");
                }
              } )
              
          })
          
    }
    else{
        alert("Insira um CEP válido !!")
    }
})

const validarCep = (cep) => {
    cep = cep.replace(/[^0-9]/gi, "");
    if (cep.length == 8) {
        return cep;
    }
    return null
}

function preencherCampos(dados){
    formularioEndereco.estado.value = dados.uf;
    formularioEndereco.cidade.value = dados.localidade;
    formularioEndereco.bairro.value = dados.bairro;
    formularioEndereco.logradouro.value = dados.logradouro;
    formularioEndereco.complemento.value = dados.complemento;

}