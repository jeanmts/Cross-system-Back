const pool = require('../services/connection');


const listProducts = async (req, res) => {

    try {
        const query = "select id,nome,descricao,valor from produtos"

        const { rows } = await pool.query(query);

        res.status(200).json(rows);

    } catch (error) {
        res.status(400).json({ message: "Erro Interno" });
    }
}

const product = async (req, res) => {
    const id = req.params.id
    try {
        const query = "select id,nome,descricao,valor from produtos where id = $1";
        const params = [id]
        const { rows } = await pool.query(query, params)
        return res.status(200).json(rows)
    } catch (error) {
        console.log(error)
    }
}

const addProducts = async (req, res) => {

    const { nome, descricao, valor } = req.body;
    try {
        if (!descricao || !nome || !valor) {
            return res.status(400).json({ message: "Todos os dados são obrigatorios" });
        }
        const queryRegister = "insert into produtos (nome, descricao, valor) values ($1, $2, $3)";
        const params = [nome, descricao, valor];
        const record = await pool.query(queryRegister, params);

        return res.status(201).json({ message: "Produto Cadastrado com sucesso!" });

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Erro Interno" });
    }
}
const editProduct = async (req, res) => {
    const id = req.params.id
    const { nome, descricao, valor } = req.body

    try {
        if (!nome || !descricao || !valor) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
        }
        const query = "update clientes set nome = $1, email = $2, cpf = $3 where id = $4";
        const params = [nome, descricao, valor, id]

        const { rows } = await pool.query(query, params)
        return res.status(200).json({ message: "Produto atualizado" })

    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id

    try {
        const query = "delete from produtos where id = $1";
        const params = [id]

        const { rows } = await pool.query(query, params)
        return res.status(200).json({ message: "Produto deletado" })
    } catch (error) {
        console.log(error)
    }
}



module.exports = { listProducts, product, addProducts, editProduct, deleteProduct }