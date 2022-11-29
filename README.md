# :notes: Back to the Disc Backend

# Índice

- [Sobre](#Sobre)
- [Rotas](#Rotas)
  - [Rotas não autenticadas:](#Rotas-não-autenticadas)
    - [Cadastro](#Cadastro)
    - [Login](#Login)
    - [Listar discos](#Listar-discos)
    - [Ver descrição do disco](#Ver-descrição-do-disco)
  - [*Rotas autenticadas*:](#Rotas-autenticadas)
    - [Comprar discos](#Comprar-discos)
    - [Ver histórico](#Ver-histórico)
    - [Logout](#Logout)
- [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)

<br/>

# Sobre
API do [Back to the Disc](https://github.com/AnaLTFernandes/back-to-the-disc-frontend), uma página web para a compra de discos de vinil.

<br/>

# Rotas

URL base: `https://back-to-the-disc-backend.herokuapp.com`

<br/>

## Rotas não autenticadas

## Cadastro
- Rota: `/sign-up`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "name": "greg",
    "email": "greg@mail.com",
    "password": "gregg"
  }
  ```

- Possíveis erros:
	- Campos ausentes, vazios ou com tipos diferentes de string
	- Campo *email* com email em formato inválido
	- Campos *name* e *password* com menos de 4 caracteres
	- Já existe um usuário com os dados informados

## Login
- Rota: `/sign-in`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "email": "greg@mail.com",
    "password": "gregg"
  }
  ```
- A API responde um Token no formato:

  ```json
  "pwoehfcnmçksh.dflkjskbckjl.jfoakspfoiwujknfcç"
  ```
- Possíveis erros:
	- Campos ausentes, vazios ou com tipos diferentes de string
	- Campo *email* com email em formato inválido
	- Campos *password* com menos de 4 caracteres
	- Não existe um usuário com os dados informados

## Listar discos
- Rota: `/products/?page=`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "_id": "6325e42adeed675242d08044",
      "by": "Gorillaz",
      "name": "CRACKER ISLAND",
      "image": "https://cdn.shopify.com/s/files/1/0096/1884/9839.png",
      "price": "69.90",
      "musics": [
          "Cracker Island (feat. Thundercat)",
          "Oil (feat. Stevie Nicks)",
          "The Tired Influencer",
          "Tarantula",
          "Silent Running (feat. Adeleye Omotayo)",
          "New Gold (feat. Tame Impala and Bootie Brown)",
          "Baby Queen",
          "Tormenta (feat. Bad Bunny)",
          "Skinny Ape",
          "Possession Island (feat. Beck)"
      ],
      "status": "novo",
      "tags": [
          "gorillaz",
          "cracker",
          "island",
          "electronic",
          "pop",
          "rock",
          "indie"
      ]
    }
  ]
  ```
- Possíveis erros:
	- Query string *page* ausente ou inválida

## Ver descrição do disco
- Rota: `/description/{productId}`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  {
    "_id": "6325e49ddeed675242d08045",
    "productId": "6325e42adeed675242d08044",
    "by": "Gorillaz",
    "name": "CRACKER ISLAND",
    "description": "'Cracker Island' é o oitavo álbum de estúdio de Gorillaz.",
    "image": "https://cdn.shopify.com/s/files/1/0096/1884/9839.png",
    "price": "69.90",
    "musics": [
        "Cracker Island (feat. Thundercat)",
        "Oil (feat. Stevie Nicks)",
        "The Tired Influencer",
        "Tarantula",
        "Silent Running (feat. Adeleye Omotayo)",
        "New Gold (feat. Tame Impala and Bootie Brown)",
        "Baby Queen",
        "Tormenta (feat. Bad Bunny)",
        "Skinny Ape",
        "Possession Island (feat. Beck)"
    ],
    "status": "novo",
    "tags": [
        "gorillaz",
        "cracker",
        "island",
        "electronic",
        "pop",
        "rock",
        "indie"
    ]
  }
  ```
- Possíveis erros:
  - Parâmetro *productId* com tipo diferente de número ou correspondente a um disco não existente

## Rotas autenticadas
- Enviar Header Authorization no formato: `Bearer {token}`
- Possíveis erros:
	- Header Authorization ausente
	- Token inválido

## Comprar discos
- Rota: `/historic`
- Método: `POST`
- Exemplo de Body:

  ```ruby
  {
    "products": ["CRACKER ISLAND"],
    "payment": "pix" // "debito" | "boleto" | "credito",
    "sendEmail": true // false
  }
  ```
- Possíveis erros:
	- Campos do body ausentes ou vazios
	- Campo *products* com tipo diferente de array
	- Campo *payment* com tipo diferente de string
	- Campo *sendEmail* com tipo diferente de boolean

## Ver histórico
- Rota: `/historic`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "date": "2022-11-29T18:33:24.183Z",
      "products": [
        {
          "name": "CRACKER ISLAND",
          "image": "https://cdn.shopify.com/s/files/1/0096/1884/9839.png",
          "price": "69.90",
          "by": "Gorillaz",
          "quantity": 1
        }
      ],
      "payment": "pix"
    }
  ]
  ```

## Logout
- Rota: `/logout`
- Método: `PUT`

<br/>

# Como rodar em desenvolvimento

**Atenção:** para rodar o projeto é preciso ter o [MongoDB](https://www.mongodb.com/docs/manual/installation/) instalado em sua máquina.

1. Clone esse repositório:
>```ruby
> git clone https://github.com/AnaLTFernandes/back-to-the-disc-backend.git
>```

2. Instale as dependências:
>```ruby
> npm install
>```

3. Configure o arquivo .env com base no arquivo .env.example

4. Inicie o projeto:
>```ruby
> npm run dev
>```

5. Instale e configure o frontend em https://github.com/AnaLTFernandes/back-to-the-disc-frontend

6. Divirta-se nas rotas usando de URL base: `http://localhost:{ENV_PORT}`
