//Chamando nosso prisma para realizar as manipulações SQL
const prisma = require('../models/PrismaService');


//Criando a classe/controller Products onde vão ter os métodos de CRUD
class ProductController{

    //Função para criar um produto
    static async create(req,res) {
        const {name, price, description} = req.body;

        try {
            const product = await prisma.product.create({
                data: { name, price, description },
            });

            res.status(201).json(product)
        } catch (error) {
            res.status(500).json({error: "Erro ao criar o produto"});
        }
    }

    //Função para listar os produtos
    static async list(req, res){
        const products = await prisma.product.findMany();
        res.json(products);
    }

    //Função para pegar um produto especifico pelo seu ID
    static async getById(req, res) {
        const { id } = req.params;

        try {
            const product = await prisma.product.findUnique({
                where: { id: Number(id) },
            });

            if(!product) return res.status(404).json({ error: "Produto não encontrado" });
            res.json(product);
        } catch (error) {
            res.status(500).json({error: "Erro ao buscar o produto."})
        }
    }

    //Função para atualizar um produto específico pelo seu ID
    static async update(req, res) {
        const { id } = req.params;
        const { name, price, description } = req.body;

        try {
            const updated = await prisma.product.update({
                where: { id: Number(id) },
                data: {name, price, description},
            });

            res.json(updated)
        } catch (error) {
            res.status(500).json({error: "Erro ao atualizar o produto"});
        }
    }


    static async delete(req, res) {
        const { id } = req.params;
        try{
            await prisma.product.delete({ where: { id: Number(id) } });
            res.json({message: "Produto deletado com sucesso!"});
        } catch(error) {
            res.status(500).json({error: "Erro ao deletar o produto"});
        }
    }
}


module.exports = ProductController;