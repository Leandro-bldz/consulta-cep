function limpa_formulario_cep() {
// Função que limpa os valores do formulario de CEP
  document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    // atualiza os campos com os valores
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
    document.getElementById('ibge').value=(conteudo.ibge);
  } // fim if
  else {
    // Caso o CEP não for encontrado
    limpa_formulario_cep();
    alert("CEP não encontrado!");
  }
}

function pesquisacep(valor) {
  // Variável CEP só com dígitos
  var cep = valor.replace(/\D/g, '');

  // Verifica se o campo CEP possui valor informado
  if (cep != "") {

    // RegEx (Expressão Regular) para validação do CEP
    var validacep = /^[0-9]{8}$/;

    // Validação do formato do CEP
    if (validacep.test(cep)) {

      // Faz o preenchimento dos campos com "..." enquanto consulta
      document.getElementById('rua').value="...";
      document.getElementById('bairro').value="...";
      document.getElementById('cidade').value="...";
      document.getElementById('uf').value="...";
      document.getElementById('ibge').value="...";

      // Cria um elemento JavaScript
      var script = document.createElement('script');

      // Sincronização com o callback
      script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      // Inserção de script no documento e carregamento
      document.body.appendChild(script);
    } // fim if
    else {
      // CEP não válido
      limpa_formulario_cep();
      alert("Formato de CEP inválido!");
    }
  } // fim if
  else {
    // CEP sem valor, limpa o formulário
    limpa_formulario_cep();
  }
}