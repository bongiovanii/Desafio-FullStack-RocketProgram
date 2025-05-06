const prisma = require('../models/PrismaService');

class CartController {
  // Adiciona item ao carrinho
  static async addToCart(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    try {
      // Verifica se o item já está no carrinho
      const existingItem = await prisma.cartItem.findFirst({
        where: { userId, productId },
      });

      if (existingItem) {
        // Atualiza a quantidade
        const updatedItem = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
        return res.json(updatedItem);
      }

      // Cria novo item
      const newItem = await prisma.cartItem.create({
        data: { userId, productId, quantity },
      });

      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar item ao carrinho' });
    }
  }

  // Lista os itens do carrinho
  static async getCart(req, res) {
    const userId = req.userId;

    try {
      const items = await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true },
      });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }
  }

  // Remove um item do carrinho
  static async removeFromCart(req, res) {
    const { itemId } = req.params;

    try {
      await prisma.cartItem.delete({ where: { id: Number(itemId) } });
      res.json({ message: 'Item removido' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover item' });
    }
  }

  // Atualiza a quantidade
  static async updateQuantity(req, res) {
    const { itemId, quantity } = req.body;

    try {
      const updated = await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar quantidade' });
    }
  }
}

module.exports = CartController;
