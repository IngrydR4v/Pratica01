const repository = require('../models/product-repository');

module.exports = {

    index: async (req, res) => {
        try {
            const result = await repository.find();

            return res.json(result);

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },

    create: async (req, res) => {
        const product = req.body;

        try {

            const result = await repository.create(product);

            product.id = result[0];

            res.status(201).json(product);
            
            
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },

    show: async (req, res) => {

        try {

            const result = await repository.findById(req.params);

            if (result.length === 0) {
                return res.status(404).json({message: 'Not found'});
            }

            return res.json(result[0])

            
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },

    update: async (req, res) => {
        const product = req.body;

        try {

            const result = await repository.findById(req.params);

            if (result.length === 0) {
                return res.status(404).json({message: 'Not found'});
            }

            await repository.update(product);

            res.json(product);
            
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },

    delete: async (req, res) => {
        try {

            const result = await repository.findById(req.params);

            if (result.length === 0) {
                //Não encontrado
                return res.status(404).json({message: 'Not found'});
            }

            await repository.delete(req.params)

            return res.status(204).json();
            
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

}