import productmodel from "./ProductModel.js"

// my produts connect to mongodb

const products = [
    {

        name: 'Tatum 1 "St. Louis" PF',
        alias: 'Tatum 1 "St. Louis" PF',
        category: 'Basketball Shoes',
        image: '/images/shoes1.webp',
        price: 10795.00,
        colour: '1 color',
        rating: '4.5',
        numReviews: 10,
        countInStock: 10,
    },
    {

        name: 'Zion 2 PF',
        alias: 'Zion 2 PF',
        category: 'Basketball Shoes',
        image: '/images/shoes2.webp',
        price: 10794.00,
        colour: '1 color',
        rating: '3.5',
        numReviews: 10,
        countInStock: 25,
    },
    {

        name: 'Jordan One Take 4 PF',
        alias: 'Jordan One Take 4 PF',
        category: 'Mens Shoes',
        image: '/images/shoes3.webp',
        price: 8695.00,
        colour: '2 color',
        rating: '5.5',
        numReviews: 10,
        countInStock: 15,
    },
    {

        name: 'Jordan Series Mid',
        alias: 'Jordan Series Mid',
        category: 'Mens Shoes',
        image: '/images/shoes4.webp',
        price: 8595.00,
        colour: '1 color',
        rating: '2.5',
        numReviews: 10,
        countInStock: 25,
    },
    {

        name: 'Jordan Retro 6 G NRG',
        alias: 'Jordan Retro 6 G NRG',
        category: 'Mens Golf Shoes',
        image: '/images/shoes5.webp',
        price: 19695.00,
        colour: '1 color',
        rating: '4.5',
        numReviews: 5,
        countInStock: 25,
    },
]

// custome datatype class of Number string

class ProductController {

    // async insertProducts(req, res) {
    //     try {
    //         const result = await productmodel.insertMany(products)
    //         console.log(result);
    //         if (result) {
    //             return res.status(200).send({ message: "success", result: result })
    //         }
    //         return res.status(500).send({ message: "Something  went wrong" })
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send({ message: "Ineternal server error" })
    //     }
    // }


    async getProduct(req, res) {
        try {
            const result = await productmodel.find({})
            if (result) {
                return res.status(200).send({ message: "success", products: result })
            }
            return res.status(500).send({ message: "something went wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Ineternal server error" })
        }
    }

    async getProductbyId(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).send({ message: "Bad Request" })
            }
            const result = await productmodel.findById({ _id: id })
            if (result) {
                return res.status(200).send({ message: "success", product: result })
            }
            return res.status(500).send({ message: "something went wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Ineternal server error" })
        }
    }

    async getcart(req, res) {
        try {
            const { products } = req.body
            if (!products) {
                return res.status(400).send({ message: "Missing dependancy products" })
            }
            const result = await productmodel.find({ _id: products }).select(["name", "price", "_id", "category", "brand", "countInStock", "image"])
            if (!result) {
                return res.status(500).send({ message: "something went wrong" })
            }
            return res.status(200).send({ message: "success", products: result })
        } catch (error) {
            return res.status(500).send({ message: "Ineternal server error" })
        }
    }
}

const productcontroller = new ProductController()

export default productcontroller;
