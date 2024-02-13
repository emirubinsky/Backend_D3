import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const PORT = 3000;

const productManager = new ProductManager('productos.json');

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        // Obtener el límite de resultados de la query param (?limit=)
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        // Obtener todos los productos
        let products = await productManager.getAllProducts();
        // Aplicar el límite de resultados si se especifica
        if (limit) {
            products = products.slice(0, limit);
        }
        // Enviar los productos como respuesta
        res.json(products);
    } catch (error) {
        // Manejar errores
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        // Obtener el producto por su ID
        const product = await productManager.getProductById(productId);
        // Si el producto no se encuentra, devolver un error 404
        if (!product) {
            res.status(404).send('Producto no encontrado');
            return;
        }
        // Enviar el producto como respuesta
        res.json(product);
    } catch (error) {
        // Manejar errores
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
