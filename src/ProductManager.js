const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getAllProducts() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            const products = JSON.parse(data);
            const product = products.find(p => p.id === parseInt(productId));
            return product;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductManager;
