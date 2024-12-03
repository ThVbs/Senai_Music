const express = require("express");
const app = express();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const path = require("path");

const PORT = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "senas-music-db", 
  password: "admin", 
  port: 5432,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.send("servidor funcionando!");
});


app.listen(PORT, () => {
  console.log(`servidor rodando em http://localhost:${PORT}`);
});

// registrar um novo usuário
app.post("/api/usuarios/registrar", async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
      const hash = await bcrypt.hash(senha, 10);
      await pool.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
        [nome, email, hash]
      );
      res.status(201).send("usuário registrado com sucesso!");
    } catch (err) {
      res.status(500).send("erro ao registrar usuário: " + err.message);
    }
  });
  
  // login de usuário
  app.post("/api/usuarios/login", async (req, res) => {
    const { email, senha } = req.body;
    try {
      const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
      if (result.rows.length === 0) {
        return res.status(404).send("usuário não encontrado.");
      }
  
      const usuario = result.rows[0];
      const validPassword = await bcrypt.compare(senha, usuario.senha);
      if (!validPassword) {
        return res.status(401).send("senha incorreta.");
      }
  
      res.status(200).send("login bem-sucedido!");
    } catch (err) {
      res.status(500).send("erro ao fazer login: " + err.message);
    }
  });
  app.delete("/api/usuarios", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("E-mail é obrigatório.");
    }

    try {
        const resultado = await pool.query("DELETE FROM usuarios WHERE email = $1 RETURNING *", [email]);
        if (resultado.rowCount === 0) {
            return res.status(404).send("Usuário não encontrado.");
        }
        res.status(200).send("Usuário excluído com sucesso.");
    } catch (error) {
        console.error("Erro ao excluir usuário: ", error.message);
        res.status(500).send("Erro interno ao excluir o usuário.");
    }
});
app.post("/api/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        const resultado = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        if (resultado.rows.length === 0) {
            return res.status(404).send("Usuário não encontrado.");
        }

        const usuario = resultado.rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).send("Senha incorreta.");
        }

        res.status(200).send("Login bem-sucedido.");
    } catch (error) {
        console.error("Erro ao fazer login: ", error.message);
        res.status(500).send("Erro interno ao fazer login.");
    }
});


  
