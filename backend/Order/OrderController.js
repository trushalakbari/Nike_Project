import Razorpay from "razorpay";
import DeliverDay from "../Constant.js";
import orderModel from "./OrderModel.js";


function CreateRozorPayORder(options) {
    // console.log(options)
    return new Promise((resolve, reject) => {

        var instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        });
        console.log(process.env.API_KEY, process.env.KEY_SECRATE);
        instance.orders.create(options, (err, order) => {
            console.log(options, err, order)
            if (err) return reject(err)
            resolve(order)
        })
    })
}

class OrderController {

    // async CreateOrder(req, res){
    //     try {

    //         const { products , userInfo, ShippingAddress, paymentMethod, totalPrice } = req.body

    //         if(!products || products.length <= 0){
    //             return res.status(400).send({ messaage: "Missing Dipandency Products"})
    //         }

    //         if(!userInfo){
    //             return res.status(400).send({ messaage: "Missing Dipandency userInfo"})
    //         }

    //         if(!ShippingAddress){
    //             return res.status(400).send({ messaage: "Missing Dipandency ShippingAddress"})
    //         }

    //         if(!paymentMethod){
    //             return res.status(400).send({ messaage: "Missing Dipandency PaymentMethod"})
    //         }

    //         let deliverIn = new Date()
    //         deliverIn.setDate(deliverIn.getDate() + DeliverDay)

    //         let OrderDetails = {
    //             products: products,
    //             user: userInfo, 
    //             paymentMethod: paymentMethod.toLowerCase(),
    //             totalPrice: totalPrice,
    //             ShippingAddress: ShippingAddress,
    //             deliverIn: deliverIn
    //         }

    //         let order = await orderModel.create(OrderDetails)
    //         order = { ...order._doc, RazorpayDetails: null}

    //         if(paymentMethod === "cod"){
    //             if(!order) return res.status(500).send({messaage: "Something went wrong"})

    //             return res.status(200).send({messaage: "Success", order})

    //         }else{
    //             const Options = {
    //                 amount : totalPrice * 100,
    //                 currency : "INR",
    //                 receipt: "rcpt_id" + order._id
    //             }
    //             const RazorpayResult =  await CreaterRozorPayOrder(Options)
    //             console.log(RazorpayResult);

    //             if(!RazorpayResult) return res.status(500).send({messaage: "Somthing Went Wrong"})
    //             order = {
    //                 ...order,
    //                 RazorpayDetails : {...RazorpayResult, apikey: process.env.API_KEY}
    //             }
    //             return res.status(200).send({messaage: "Success", order})
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send({messaage: "Internal Server Error"})
    //     }
    // }

    async CreateOrder(req, res) {
        try {
            const { products, paymentMethod, shippingAddress, userInfo, totalPrice } = req.body
            if (!products) {
                return res.status(400).send({ message: "Somthing went wrong" })
            }
            if (!paymentMethod) return res.status(500).send({ message: "Somthing went wrong" })
            if (!shippingAddress) return res.status(500).send({ message: "Somthing went wrong" })
            if (!userInfo) return res.status(500).send({ message: "Somthing went wrong" })
            const deliveryDate = new Date()
            deliveryDate.setDate(deliveryDate.getDate() + DeliverDay)
            const orderDetails = {
                products,
                paymentMethod,
                shippingAddress,
                user: userInfo,
                deliverdIn: deliveryDate,
                totalPrice: totalPrice
            }
            console.log(orderDetails)
            let order = await orderModel.create(orderDetails)
            console.log(order)

            order = { ...order._doc, RazorpayDetails: null }
            if (paymentMethod === "cod") {
                if (!order) return res.status(500).send({ message: "Somthing went wrong", })
                return res.status(200).send({ message: "Success", order })
            } else {

                const options = {
                    amount: totalPrice * 100,
                    currency: "INR",
                    receipt: "rcpt_id_" + order._id
                }
                // console.log(object)
                const RozorpayResult = await CreateRozorPayORder(options)
                console.log(RozorpayResult)
                if (!RozorpayResult) return res.status(500).send({ message: "Somthing went wrong" })
                // order = {
                //     ...order,
                //     RazorpayDetails: { ...RozorpayResult, apikey: process.env.API_KEY }
                // }

                order = {
                    ...order,
                    RazorpayDetails: { ...RozorpayResult, apikey: process.env.API_KEY }
                }
                console.log(order)
                return res.status(200).send({ message: "Success", order })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async GetOrder(req, res) {
        try {
            const result = await orderModel.find({ "user_id": req.body.userInfo._id })

            if (result) return res.status(200).send({ message: "Success", order: result })

            return res.status(500).send({ message: "Something Went Wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" })

        }
    }

    async getOrderByID(req, res) {
        try {
            const { id } = req.params

            console.log(id);
            if (!id) {
                return res.status(400).send({ message: 'Bad Request' })
            }

            const result = await orderModel.findById({ _id: id })

            if (result) {
                return res.status(200).send({ message: "success", order: result })

            }
            return res.status(500).send({ message: 'something went wrong' })

        } catch (error) {
            // console.log(error);
            return res.status(500).send({ message: 'internal server error' })

        }

    }
}

const orderController = new OrderController()
export default orderController