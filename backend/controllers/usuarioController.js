const { Usuario } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const getAllUsuarios = async (req, res) =>{
  try{
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nome', 'email', 'role'] 
    });
    res.json(usuarios);
  }catch(err){
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

const createUsuario = async (req, res) =>{
  try{
    const {email, nickname, senha} = req.body;

    const usuarioExistente = await Usuario.findOne({
      where: {
        [Op.or]: [
          { email },
          { nickname }
        ]
      }
    });

    if(usuarioExistente){
      if(usuarioExistente.email === email){
        return res.status(400).json({ error: 'Já existe um usuário com esse email.' });
      }
      if(usuarioExistente.nickname === nickname){
        return res.status(400).json({ erro: 'Já existe um usuário com esse nick'});
      }
    };

    const hashedPassword = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      ...req.body,
      senha: hashedPassword,
      role: 'user'
    });
    res.status(201).json(usuario);
  }catch(err){
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
};

const createAdmin = async (req, res) =>{
  try{
    const{nome, email, senha, nickname} = req.body;

    const adminExistente = await Usuario.findOne({
      where: {
        [Op.or]: [
          { email },
          { nickname }
        ]
      }
    });

    if(adminExistente){
      if(adminExistente.email === email){
        return res.status(400).json({ error: 'Já existe um administrador com esse email.' });
      }
      if(adminExistente.nickname === nickname){
        return res.status(400).json({ error: 'Já existe um administrador com esse nick.' });
      }
    }

    const hashedPassord = await bcrypt.hash(senha, 10);

    const admin = await Usuario.create({
      nome,
      email,
      senha: hashedPassord,
      nickname,
      role: 'admin'
    });

    res.status(201).json(admin);
  }catch(err){
    res.status(400).json({ erro: 'Erro ao criar administrador' });
  }
};

exports.atualizarRole = async (req, res) =>{
  try{
    const { id } = req.params;
    const { role } = req.body;

    if(!['user', 'admin'].includes(role)){
      return res.status(400).json({ error: 'Permissão Negada.' });
    }

    const usuario = await Usuario.findByPk(id);
    if(!usuario){
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if(usuario.role === 'admin' && role === 'user'){
      return res.status(403).json({ error: 'Não é permitido rebaixar um administrador.' });
    }

    usuario.role = role;
    await usuario.save();

    res.json(usuario);
  }catch(err){
    res.status(400).json({ error: 'Erro ao atualizar permissão.' });
  }
};

const updateUsuario = async (req, res) => {
  try{
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if(!usuario){
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await usuario.update(req.body);
    res.json(usuario);
  }catch(err){
    res.status(400).json({ error: 'Erro ao atualizar usuário.' });
  }
};

const deleteUsuario = async (req, res) => {
  try{
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if(!usuario){
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await usuario.destroy();
    res.json({ message: 'Usuário deletado com sucesso.' });
  }catch(err){
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
};

module.exports ={
  getAllUsuarios,
  createUsuario,
  createAdmin,
  updateUsuario,
  deleteUsuario
};