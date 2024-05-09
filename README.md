# Atlântida API

## Descrição 
A Atlântida API é uma plataforma de gerenciamento de mergulhos desenvolvida para facilitar a gestão de informações relacionadas a mergulhos, usuários, certificados, pontos de mergulho, estatísticas e comentários.

## Tags
A API utiliza as seguintes tags para categorizar os endpoints:

- **addresses:** Endereço dos usuários
- **users:** Usuários da plataforma
- **certificates:** Certificados dos usuários
- **dive logs:** Megulhos do usuário
- **dive statistics:** Estatísticas dos mergulhos do usuário
- **diving spots:** Pontos de mergulho
- **comments:** Comentários sobre os pontos de mergulho

## Como Usar
Para utilizar a API, siga os passos abaixo:

1. Clone o projeto: 
   ```
   git clone https://tcc-atlantida@dev.azure.com/tcc-atlantida/atlantida/_git/atlantida-api
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

4. Acesse a documentação da API:
   Abra o navegador e acesse [http://localhost:3000/api-docs](http://localhost:3000/api-docs) para visualizar a documentação interativa da API no Swagger.

## Segurança
A API utiliza autenticação JWT (JSON Web Token) para garantir a segurança dos endpoints.

## Requisitos
Para utilizar a API, é necessário ter uma aplicação cliente capaz de realizar requisições HTTP para os endpoints disponibilizados.

## Licença
Este projeto está licenciado sob a licença Privada.