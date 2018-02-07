
# Curso de NodeJS Avançado

Projeto oriundo de projeto desenvolvido em aulas do curso [Alura](http://www.alura.com.br).
O curso tem como objetivo a capacitação das funcionalidades focadas em webservices. Utilizei a comunicação de servidor REST interno e também de SOAP externo.

## Para utilização
1. Realize o `git clone`
2. Abra o diretório onde você baixar o projeto e execute o comando `npm install`
2.1. Abra o diretório `projeto-pagamento-cartao`: `cd projeto-pagamento-cartao` e instale esse segundo projeto também utilizando o comando `npm install`
3.
## Fazendo os testes
Temos a possibilidade de realizarmos testes em nosso webservice local e também no webservice dos correios.
- RESTIFY
-- Criando uma aplicação utilizando REST
-- Utilizando operações de GET, POST, DELETE, PUT
-- Para criar um pagamento em dinheiro, vamos mandar uma requisicao via POST para a url `http://localhost:3000/pagamentos/pagamento` 
JSON: `{"pagamento": {"forma_de_pagamento": "Dinheiro", "valor": 90.00, "moeda": "USD", "descricao": "criando um pagamento"} }`
-- Para utilizarmos o pagamento em cartão, teremos que iniciar nosso outro projeto (`projeto-pagamento-cartao`) que roda na porta 3001, pois ele vai servir como um webservice para nós fazermos os testes
-- Utilizando o método de pagamento cartão: utilize a seguinte url: `http://localhost:3000/pagamentos/pagamento` utilizando o seguinte JSON: `{ "pagamento": { "forma_de_pagamento": "cartao", "valor": 90.00, "moeda": "USD", "descricao": "criando um pagamento" }, "cartao": { "numero": 1234567891234567, "bandeira": "visa", "ano_de_expiracao": 2016, "mes_de_expiracao": "02", "cvv": 123 } }`

- Consultar a **api dos correios** para calcular prazo de entrega
-- Utilizar SOAP para fazer comunicação com webservice dos correios.
-- JSON: `{"nCdServico": "40010", "sCepOrigem": "21931190", "sCepDestino": "50594943"}`
-- Para testar você deve mandar o JSON para a seguinte url: `http://localhost:3000/correios/calculo-prazo`

