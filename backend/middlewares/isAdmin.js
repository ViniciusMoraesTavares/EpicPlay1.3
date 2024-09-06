function isAdmin(req, res, next){
    const user = req.user;
    
    if (user.role !== 'admin'){
      return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
  }
  
  module.exports = isAdmin;
