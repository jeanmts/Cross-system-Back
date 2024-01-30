const pool = require('../services/connection');



const listUsers = async (req, res) => {

    try {
        const query = "select id,nome, email,cpf, datadecadastro from clientes"
        const { rows } = await pool.query(query);
        res.status(200).json(rows)
    } catch (error) {
        res.status(400).json({ message: "Erro Interno" });
    }
}
const detailUser = async (req, res) => {
    const id = req.params.id
    const { email, nome, cpf } = req.body

    try {
        if (!nome || !email || !cpf) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
        }
        const query = "update clientes set nome = $1, email = $2, cpf = $3 where id = $4";
        const params = [nome, email, cpf, id]

        const { rows } = await pool.query(query, params)
        return res.status(200).json({ message: "Cliente atualizado" })

    } catch (error) {
        console.log(error)
    }
}
const user = async (req, res) => {
    const id = req.params.id
    try {
        const query = "select nome,cpf,email from clientes where id = $1";
        const params = [id]
        const { rows } = await pool.query(query, params)
        return res.status(200).json(rows)
    } catch (error) {
        console.log(error)
    }
}
const addUser = async (req, res) => {

    const { email, nome, cpf, senha, dataDeCadastro } = req.body;
    try {
        if (!email || !nome || !cpf || !senha) {
            return res.status(400).json({ message: "Todos os dados são obrigatorios" });
        }
        const queryRegister = "insert into clientes (email, nome, cpf, senha, dataDeCadastro) values ($1, $2, $3, $4, $5)";
        const params = [email, nome, cpf, senha, dataDeCadastro];
        const record = await pool.query(queryRegister, params);

        return res.status(201).json({ message: "Usuario Cadastrado com sucesso!" });

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Erro Interno" });
    }
}

const loginUser = async (req, res) => {
    const { email, senha } = req.body;
    const query = "select * from clientes where email = $1";
    const params = [email];
    try {
        if (!email || !senha) {
            return res
                .status(404)
                .json({ mensagem: "email e senha são obrigatorios" });
        }
        const responseQuery = await pool.query(query, params);

        if (responseQuery.rowCount < 1) {
            return res.status(404).json({ message: "E-mail ou senha invalida" });
        }
        const user = responseQuery.rows[0]
        return res.status(200).json({ message: "Usuario logado com sucesso" })

    } catch (error) {
        console.log(error);

    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        const query = "delete from clientes where id = $1";
        const params = [id]

        const { rows } = await pool.query(query, params)
        return res.status(200).json({ message: "Cliente deletado" })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { listUsers, addUser, loginUser, detailUser, deleteUser, user }