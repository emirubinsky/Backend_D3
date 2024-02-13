import fs from 'fs';

class ProductManager {
    constructor(fileName) {
        this.fileName = fileName;
    }

    // Método para obtener todos los productos
    async getAllProducts() {
        return new Promise((resolve, reject) => {
            // Leer el archivo de productos
            fs.readFile(this.fileName, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                // Convertir los datos a formato JSON
                const products = JSON.parse(data);
                // Resolver la promesa con los productos
                resolve(products);
            });
        });
    }

    // Método para obtener un producto por su ID
    async getProductById(productId) {
        return new Promise((resolve, reject) => {
            // Leer el archivo de productos
            fs.readFile(this.fileName, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                // Convertir los datos a formato JSON
                const products = JSON.parse(data);
                // Buscar el producto por su ID
                const product = products.find(p => p.id === parseInt(productId));
                // Resolver la promesa con el producto encontrado
                resolve(product);
            });
        });
    }
}

export default ProductManager;
