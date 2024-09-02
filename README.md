# Atlântida API

## Descrição 
A Atlântida API é uma plataforma de gerenciamento de mergulhos desenvolvida para facilitar a gestão de informações relacionadas a mergulhos, usuários, certificados, pontos de mergulho, estatísticas e comentários.

## Tags
Para uma organização eficiente dos endpoints, a API utiliza as seguintes tags:

- **addresses:** Gerencia os endereços dos usuários.
- **users:** Gerencia as informações dos usuários da plataforma.
- **certificates:** Gerencia os certificados de mergulho dos usuários.
- **dive logs:** Gerencia os registros de mergulho dos usuários.
- **dive statistics:** Gerencia as estatísticas relacionadas aos mergulhos dos usuários.
- **diving spots:** Gerencia os pontos de mergulho disponíveis.
- **comments:** Gerencia os comentários sobre os pontos de mergulho.

## Como Usar
Para começar a usar a API, siga os passos abaixo:

1. Clone o repositório do projeto:
   ```bash
   git clone https://tcc-atlantida@dev.azure.com/tcc-atlantida/atlantida/_git/atlantida-api
   ```

2. Instale as dependências necessárias:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto.
   - Copie as variáveis do arquivo `.env copy` e ajuste conforme necessário.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse a documentação interativa da API:
   - Abra o navegador e acesse [http://localhost:3000/api-docs](http://localhost:3000/api-docs) para visualizar a documentação gerada pelo Swagger.

## Segurança
A API utiliza autenticação JWT (JSON Web Token) para proteger os endpoints, garantindo que apenas usuários autorizados possam acessar ou modificar os dados.

## Requisitos
Para interagir com a API, é necessário ter uma aplicação cliente que possa realizar requisições HTTP para os endpoints disponíveis.

## Licença
Este projeto é licenciado sob uma licença privada.