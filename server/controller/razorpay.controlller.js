import rz from "razorpay";
import config from "../../config/config"
import helperFunction from '../helpers/helperFunction';
import { async } from "q";
import crypto from 'crypto'
import request  from "request";


const instance = new rz({
    key_id : config.razorTestKeyId,
    key_secret : config.razorTestKeySecret
})
const getPaymentDetails = async (req,res,next) => {
   const brandId = req.params.brandId
   const amount = req.params.amount
   const keys = {
       "razorKey" : config.razorTestKeyId,
   }
 
   var options = {
    amount: amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: `${Date.now()}`,
    payment_capture: '0'
  };

  const result = await instance.orders.create(options, (err, order) => {
        if(err){
            throw err
        }
        else{
            const data = Object.assign(keys, order)
            return res.json(helperFunction.responseHandler(true, data))
        }
  })
}


const paymentVerification = async (req,res,next) => {
    const hmac = crypto.createHmac('sha256', config.razorTestKeySecret)
    const data = req.body
    const brandId = req.params.brandId
    const generatedSignature = await hmac.digest(data.razorpay_order_id + "|" + data.razorpay_payment_id, config.razorTestKeySecret)
    if (generatedSignature == data.razorpay_signature) {
        return res.json(helperFunction.responseHandler(true, `payment successful for brandId ${brandId}`))
      }
    else{
        return res.json(helperFunction.responseHandler(false, "error occured while payment"))
    }
}

const getTransactionDetails = async (req,res,next) => {

    const transactionId = req.params.id
    const data = await helperFunction.razorpayFetchTransactionApi(transactionId)
                        .then((result) => {
                            return result
                        })
                        .catch((err) => {
                            return res.json(helperFunction.responseHandler(false, err))
                        })
    
    return res.json(helperFunction.responseHandler(true, JSON.parse(data)))
}

const razorpayHelperFunction = {
    getPaymentDetails,
    paymentVerification,
    getTransactionDetails
}

export default razorpayHelperFunction;