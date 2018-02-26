# Curso de NodeJS Avançado

Projeto oriundo de projeto desenvolvido em aulas do curso [Alura](http://www.alura.com.br).
O [curso de Node JS Avançado](https://www.alura.com.br/curso-online-nodejs-avancado), tem como objetivo a capacitação das funcionalidades focadas em webservices. Utilizei a comunicação de servidor REST interno e também de SOAP externo.

## Conteúdo
Nos exemplos desse projeto, teremos a capacidade de realizar as seguintes funções:

1. Criar um webservice REST
2. Comunicar-se com webservices REST, SOAP
3. Manipular arquivos

## Como utilizar?

1. Realize o `git clone`
2. Abra o diretório onde você baixar o projeto e execute o comando `npm install`
2.1. Abra o diretório `projeto-pagamento-cartao`: `cd projeto-pagamento-cartao` e instale esse segundo projeto também utilizando o comando `npm install`
3. Monte a estrutura de banco de dados disponibilizados no arquivo `banco.sql`

## Fazendo os testes

Temos a possibilidade de realizarmos testes em nosso webservice local e também no webservice dos correios.
### RESTIFY
- Criando uma aplicação utilizando REST
- Utilizando operações de GET, POST, DELETE, PUT
- Para criar um pagamento em dinheiro, vamos mandar uma requisicao via POST para a url `http://localhost:3000/pagamentos/pagamento` 
JSON: `{"pagamento": {"forma_de_pagamento": "Dinheiro", "valor": 90.00, "moeda": "USD", "descricao": "criando um pagamento"} }`
- Para utilizarmos o pagamento em cartão, teremos que iniciar nosso outro projeto (`projeto-pagamento-cartao`) que roda na porta 3001, pois ele vai servir como um webservice para nós fazermos os testes
- Utilizando o método de pagamento cartão: utilize a seguinte url: `http://localhost:3000/pagamentos/pagamento` utilizando o seguinte JSON: `{ "pagamento": { "forma_de_pagamento": "cartao", "valor": 90.00, "moeda": "USD", "descricao": "criando um pagamento" }, "cartao": { "numero": 1234567891234567, "bandeira": "visa", "ano_de_expiracao": 2016, "mes_de_expiracao": "02", "cvv": 123 } }`
- Para consultar um pagamento já existente, utilize a rota: `http://localhost:3000/pagamentos/pagamento/ID_DO_PAGAMENTO`

### Trabalhando com API dos Correios
- Consultar a **api dos correios** para calcular prazo de entrega
-- Utilizar SOAP para fazer comunicação com webservice dos correios.
-- JSON: `{"nCdServico": "40010", "sCepOrigem": "21931190", "sCepDestino": "50594943"}`
-- Para testar você deve mandar o JSON para a seguinte url: `http://localhost:3000/correios/calculo-prazo`
### Trabalhando com arquivos

- **Ler arquivos em buffer**: Nesse exemplo utilizamos o fs que já vem no *core* do node para ler um arquivo, e gravá-lo em outro arquivo. `util/fileReader.js`. Para executar, você deve navegar pelo terminal até a pasta util, e executar o comando: `node fileReader.js`
- **Ler arquivos com stream**: o arquivo utilizado agora é o `util/streamFileReader.js` que vai trabalhar com a função *createReadStream* de maneira que a leitura do arquivo não fique armazenada no buffer. Para testar utilize o comando `node streamFileReader.js`
- Receber **Upload de arquivo** no WS. Rota escrita em `controllers/uploads.js`. O intuito é enviarmos uma arquivo para o servidor e ele gravar dentro de uma pasta chamada files.
	Para realizar o teste, você vai ter que definir um header no post chamado filename apontando para o nome do arquivo em questão, e também realizar o envio da imagem em binary, também um content type (Content-type: application/octet-stream).
URL para ser postada: http://localhost:3000/upload/imagem (obs: no POSTMAN só marquei type POST, passei no headers o filename, em body marquei binary e selecionei o arquivo)

### Trabalhando com memchached
- Para fazer esse exemplo funcionar, você precisa instalar o memcached em sua máquina, após instalar, execute utilizando `memcached -vv`. As configurações do memcached está no arquivo servicos/memcachedClient.js, e as configurações para setar ou gravar um novo cache estão no arquivo controllers/pagamentos.js no `app.get('/pagamentos/pagamento/:id'` e também no `app.post('/pagamentos/pagamento', function(req, res){`

### Trabalhando com Logs
- Exemplos realizados utilizando Winston.
- Exemplos realizados utilizando Morgan (específico para express), integrando com o Winston.