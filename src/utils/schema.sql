create database gerenciador;

create table clientes (
	id serial Primary key,
  nome text not null,
  email text not null,
  senha text not null,
  cpf text not null,
  dataDeCadastro text
)

create table produtos (
	id serial primary key,
  nome text not null,
  descricao text,
  valor decimal
)

create table pedidos (
	id serial primary key,
  id_cliente integer references clientes(id),
  nomeDoProduto text,
  descricao text,
  valor decimal 
)
