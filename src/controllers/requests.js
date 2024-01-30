const pool = require('../services/connection');


const listRequests = async (req, res) => {

    try {
        const query = "select * from pedidos";

        const { rows } = await pool.query(query);

        res.status(200).json(rows);

    } catch (error) {
        res.status(400).json({ message: "Erro Interno" });
    }
}

const requests = async (req, res) => {
    const id = req.params.id
    try {
        const query = "select * from clientes join pedidos on clientes.id = id_cliente";
        const params = [id]
        const { rows } = await pool.query(query, params)
        return res.status(200).json(rows)
    } catch (error) {
        console.log(error)
    }
}

const addRequests = async (req, res) => {
    const id = req.params.id
    const { nome, descricao, valor } = req.body;
    try {
        if (!descricao || !nome || !valor) {
            return res.status(400).json({ message: "Todos os dados são obrigatorios" });
        }
        const queryRegister = "insert into pedido (nomedoproduto, descricao, valor, id_cliente) values ($1, $2, $3,$4)";
        const params = [nome, descricao, valor, id];
        const record = await pool.query(queryRegister, params);

        return res.status(201).json({ message: "pedido Cadastrado com sucesso!" });
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Erro Interno" });
    }
}

const editRequests = async (req, res) => {
    const id = req.params.id
    const { nome, descricao, valor } = req.body

    try {
        if (!nome || !descricao || !valor) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
        }
        const query = "update pedidos set nomedoproduto = $1, descricao = $2, valor = $3 where id_cliente = $4";
        const params = [nome, descricao, valor, id]

        const { rows } = await pool.query(query, params)
        return res.status(200).json({ message: "Peido atualizado" })

    } catch (error) {
        console.log(error)
    }
}

const deleteRequest = async (req, res) => {
    const id = req.params.id

    try {
        const query = "delete from pedidos where id_cliente = $1";
        const params = [id]

        const { rows } = await pool.query(query, params)
        return res.status(200).json({ message: "Pedido deletado" })
    } catch (error) {
        console.log(error)
    }
}

module.exports= {listRequests, addRequests, requests,editRequests,deleteRequest}