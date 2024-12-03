const express = require("express");
const app = express();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const path = require("path");

const PORT = 3000;

// Configuração do banco de dados
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "senas-music-db",
    password: "admin",
    port: 5432,
});

// Configuração do servidor
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Registrar usuário
app.post("/api/usuarios/registrar", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const hash = await bcrypt.hash(senha, 10);
        await pool.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
            [nome, email, hash]
        );
        res.status(201).send("Usuário registrado com sucesso!");
    } catch (err) {
        res.status(500).send("Erro ao registrar usuário: " + err.message);
    }
});

// Login de usuário
app.post("/api/usuarios/login", async (req, res) => {
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

        res.status(200).send("Login bem-sucedido!");
    } catch (err) {
        res.status(500).send("Erro ao fazer login: " + err.message);
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
