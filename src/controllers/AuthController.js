const prisma = require('../models/PrismaService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.ACCESS_KEY;

class AuthController {
  async register(req, res) {
    const { username, password } = req.body;
    try {
      const usuarioExistente = await prisma.user.findUnique({ where: { username } });
      if (usuarioExistente) {
        return res.status(400).json({ error: "Usuário já existente" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({ data: { username, password: hashedPassword } });

      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar o usuário" });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}

module.exports = new AuthController();
