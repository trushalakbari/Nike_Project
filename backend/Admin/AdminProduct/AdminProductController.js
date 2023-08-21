class AdminProductController {
    async InsertProducts(req, res) {
        try {
            const { title, Brand, FetureImages, ReleventImages, price, description, discount, countInStock, totalprice } = req.body

            if (!title) return res.status(200).send({ message: "Missing dependancy title" })
            if (!Brand) return res.status(200).send({ message: "Missing dependancy Brand" })
            if (!FetureImages) return res.status(200).send({ message: "Missing dependancy FetureImages" })
            if (!ReleventImages) return res.status(200).send({ message: "Missing dependancy ReleventImages" })
            if (!price) return res.status(200).send({ message: "Missing dependancy price" })
            if (!description) return res.status(200).send({ message: "Missing dependancy description" })
            if (!discount) return res.status(200).send({ message: "Missing dependancy discount" })
            if (!countInStock) return res.status(200).send({ message: "Missing dependancy countInStock" })
            if (!totalprice) return res.status(200).send({ message: "Missing dependancy totalprice" })



        } catch (error) {
            console.log(error)
        }
    }
}