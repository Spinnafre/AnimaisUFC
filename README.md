# AnimaisUFC
Backend: Davi Silva (Spinnafre), Frontend (React):Davi silva, Narciso e Erick

## **:wine_glass: COMO UTILIZAR**

### Configurações Iniciais

Primeiro, você precisa ter o <kbd>[NodeJS](https://nodejs.org/en/download/)</kbd> instalado na sua máquina. 

Se você estiver utilizando o **Linux**, você pode optar por instalar o **Node** através do gerênciador de versões <kbd>[asdf]</kbd> para facilitar o processo de mudança da versão do **Node**, quando for necessário.

Você pode optar também por utilizar o **yarn** no lugar do **npm**. Você pode instalar clicando nesse <kbd>[link][yarn]</kbd>, ou através do <kbd>[asdf]</kbd>.

Após ter o **Node** instalado, instale as dependências do **React** de forma global, utilizando os comandos:

```sh
# React:
$ npm install create-react-app -g

```

Você precisa criar um arquivo `.env` e inserir as informações que condizem com o seu **servidor mongoDB**:
```sh
-MONGODB_URL:url do servidor mongoDB
-JWT_SECRET:senha
```
Em seguida você precisa criar um arquivo `config.js` e inserir as informações de configurações do servidor:
```sh
export default{
    MONGODB_URL:process.env.MONGODB_URL || "url do servidor",
    JWT_SECRET:process.env.JWT_SECRET || "senha"
    
}
```


Instale as dependências contidas nos arquivos `package.json` que se encontram na raíz do repositório (para o gerenciamento de commits), no diretório do **server** e no diretório do **website**. Para instalar as dependências, basta abrir o terminal no diretório e digitar o comando:

```sh
$ npm install

# ou
$ yarn
```

Veja os arquivos **`package.json`** do <kbd>[commitlint](./package.json)</kbd>, <kbd>[server](./sources/server/package.json)</kbd>, <kbd>[website](./sources/website/package.json)</kbd> e <kbd>[mobile](./sources/mobile/package.json)</kbd>.

### Utilizando o Server

```sh
# Abrindo o terminal no diretório do servidor:
$ cd backend

# Executando a aplicação em modo de desenvolvimento:
$ npm start

```

> Veja a parte de **scripts {}** do arquivo <kbd>[package.json](./sources/server/package.json)</kbd> para saber quais scripts estão disponíveis.

### Utilizando o Website

```sh
# Abrindo o terminal no diretório do website:
$ cd frontend

# Executando o website no modo de desenvolvimento:
$ npm start
```

> Se o browser não abrir automaticamente, acesse: http://localhost:3000.
