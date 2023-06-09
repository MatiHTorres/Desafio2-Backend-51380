const fs = require("fs")

class ProductManager {
    constructor(path){
        this.products = []
        this.path = path
        this.id = 1
    }

    async addProduct(product) {

        let checkCode = this.products.find((prod) => prod.code === product.code)
        if(!checkCode){
            if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock){
                
                let newProduct = {...product,id: this.id}
                this.products.push(newProduct)
                this.id ++
                await fs.promises.writeFile(this.path,JSON.stringify(this.products, null, 2))
    
                return console.log('Product Added Successfully') 
            } else {
                return console.log('Error , Fields Missing')
            }
         
        } else {
            return console.log('This CODE already exists')   
        }
   
        
    }

    async getProducts(){
        let products = []   
        const thoseProducts = await fs.promises.readFile(this.path,"utf-8")
        products = JSON.parse(thoseProducts)
        
        return console.log(products)
    }

    async getProductByid(id){
        let products = []   
        const thoseProducts = await fs.promises.readFile(this.path,"utf-8")
        products = JSON.parse(thoseProducts)
        
        let found = products.find((prod) => prod.id === id)
        if(found){
            console.log('Product found successfully')
            return console.log(found)
        } else {
            return console.log('Product not found')
        }
    }

    async updateProduct(id , ...updates){
        await this.deleteProduct(id)
       
        let prod = []   
        const thoseProducts = await fs.promises.readFile(this.path,"utf-8")
        prod = JSON.parse(thoseProducts)
        
        let prodUpdate = [...updates,...prod]
        await fs.promises.writeFile(this.path, JSON.stringify(prodUpdate,null,2))
    }

    async deleteProduct(id){
        let prod = []   
        const thoseProducts = await fs.promises.readFile(this.path,"utf-8")
        prod = JSON.parse(thoseProducts)

        let productFilter = prod.filter((prod) => prod.id != id)

        await fs.promises.writeFile(this.path,JSON.stringify(productFilter,null,2))
    }
}

const product1 = {
    title: 'Catan',
    description: 'Juego de mesa , Catan',
    price: 25000, // Peso Chileno
    thumbnail: 'https://devirinvestments.s3.eu-west-1.amazonaws.com/img/catalog/product/8436017220100-1200-face3d.jpg',
    code: '1827',
    stock: '15'
}

const product2 = {
    title: 'Monopoly',
    description: 'Juego de mesa , Monopoly',
    price: 20000,
    thumbnail: 'https://falabella.scene7.com/is/image/Falabella/5934112_1?wid=800&hei=800&qlt=70',
    code: '2458',
    stock: '15'
}
const product3 = {
    title: 'Clue',
    description: 'Juego de mesa , Clue',
    price: 22000,
    thumbnail: 'https://www.paris.cl/dw/image/v2/BCHW_PRD/on/demandware.static/-/Sites-cencosud-master-catalog/default/dwcde6c150/images/imagenes-productos/649/209150-0000-001.jpg?sw=513&sh=654&sm=fit',
    code: '1827', // Codigo repetido con el product1
    stock: '15'
}
const product4 = {
    title: 'Exploding Kittens',
    description: 'Juego de cartas , Exploding Kittens',
    price: 17000,
    thumbnail: 'https://m.media-amazon.com/images/I/710D3AP+ipL.jpg',
    code: '8572',
    stock: '15'
}
const product5 = {
    title: 'UNO',
    description: 'Juego de cartas , UNO',
                    // Falta del campo , price
    thumbnail: 'https://dojiw2m9tvv09.cloudfront.net/10102/product/unoclasico-14328.jpg',
    code: '5782',
    stock: '15'
}
const product6 = {
    title: 'UNO',
    description: 'Juego de cartas , UNO',
    price:12000,
    thumbnail: 'https://dojiw2m9tvv09.cloudfront.net/10102/product/unoclasico-14328.jpg',
    code: '5782',
    stock: '15'
}

const proManager = new ProductManager("productos.json")

// Console.logs de testeo

// console.log(proManager.addProduct(product1)) // Product Added Successfully
// console.log(proManager.addProduct(product2)) // Product Added Successfully
// console.log(proManager.addProduct(product3)) // This CODE already exists
// console.log(proManager.addProduct(product4)) // Product Added Successfully
// console.log(proManager.addProduct(product5)) // Error , Fields Missing
// console.log(proManager.getProducts()) // Devuelvo un arreglo con todos los productos creados correctamente , en este caso: product, product2 y product4
// console.log(proManager.getProductByid(3)) // Devuelvo un producto, YA CREADO CORRECTAMENTE , segun ID , en este caso: product4 que se creo con id:3
// console.log(proManager.getProductByid(99)) // Product not found
// console.log(proManager.updateProduct(1,product6)) // Actualizo el producto segun su id , en este caso , el producto con id:1
// console.log(proManager.deleteProduct(3)) // Elimino el producto segun su id , en este caso el producto con id:3