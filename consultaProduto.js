const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configurações do banco de dados
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'meubanco'
});

// Conexão com o banco de dados
connection.connect();

// Rota para exibir o formulário de consulta
app.get('/consulta', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de clientes</title>
      </head>
      <body>
        <h1>Consulta de clientes</h1>
        <form method="POST" action="/clientes">
          <label for="item">Item:</label>
          <input type="text" id="item" name="item"><br><br>
          <label for="descricao">Descrição:</label>
          <input type="text" id="descricao" name="descricao"><br><br>
          <label for="quantidade">Quantidade</label>
          <input type="text" id="quantidade" name="quantidade"><br><br>
          <label for="valor">Valor do produto</label>
          <input type="text" id="Valor" name="Valor"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/clientes', (req, res) => {
  //const item = req.body.item;
  const { item, descricao, quantidade, valor } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes WHERE item LIKE '%${item}%'`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Produtos Cadastrasdos</title>
        </head>
        <body>
          <h1>Produtos cadastrados</h1>
          <table>
            <tr>
              <th>Item</th>
              <th>Descição</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.item}</td>
          <td>${produto.descricao}</td>
          <td>${produto.quantidade}</td>
          <td>${produto.valor}</td>
        </tr>
      `;
    });
    
    html += `
          </table>
        </body>
      </html>
    `;
    
    res.send(html);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
