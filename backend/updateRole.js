const sequelize = require('./config/config'); // ajuste o caminho se necessário
const usuario = require('./models/usuario')(sequelize); // ajuste o caminho se necessário

async function updateRole(userId) {
  try {
    const user = await usuario.findByPk(userId); // Encontre o usuário pelo ID
    if (user) {
      user.role = 'admin'; // Atualize o campo role
      await user.save(); // Salve as mudanças
      console.log(`O usuário com ID ${userId} agora é admin.`);
    } else {
      console.log(`O usuário com ID ${userId} não encontrado.`);
    }
  } catch (error) {
    console.error('Erro ao atualizar o role:', error);
  } finally {
    await sequelize.close(); // Feche a conexão com o banco
  }
}

updateRole(1); // Substitua "1" pelo ID do usuário que deseja atualizar