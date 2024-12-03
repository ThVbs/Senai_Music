async function cadastrarUsuario(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const email = document.getElementById("email").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const nomeCompleto = document.getElementById("nomeCompleto").value;
    const senha = document.getElementById("senha1").value;
    const confirmarSenha = document.getElementById("senha2").value;

    if (senha !== confirmarSenha) {
        document.getElementById("mensagem").innerText = "As senhas não coincidem!";
        return;
    }

    const usuario = { email, dataNascimento, nomeCompleto, senha };

    try {
        const resposta = await fetch("/api/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
        });

        if (resposta.ok) {
            alert("Conta criada com sucesso!");
            document.getElementById("formularioUsuario").reset();
        } else {
            const erro = await resposta.text();
            document.getElementById("mensagem").innerText = erro;
        }
    } catch (erro) {
        document.getElementById("mensagem").innerText = "Erro ao criar conta: " + erro.message;
    }
}
