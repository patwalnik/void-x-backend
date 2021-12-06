import "babel-polyfill";
import request from "request";
import API_URL from "../constants/index";
import { resolve, reject } from "q";
import config from "../../config/config";
//all apis come here
// const urls = [

//     'https://mirrar.styledotme.com/api/b2c/v1/user/c20ad0e9-8905-4e3c-8c99-754e46679941/address/update?token=token',
//     'https://mirrar.styledotme.com/api/b2c/v1/user/6290d1f9-dfa7-436b-b0f3-9c0232adbb50/order?token=token'

// ]
const razorpayFetchTransactionApi = id => {
  return new Promise((resolve, reject) => {
    request(
      `https://api.razorpay.com/v1/payments/${id}`,
      (err, httpResponse, body) => {
        if (err) return reject(err);
        resolve(body);
      }
    ).auth(config.razorKeyId, config.razorKeySecret);
  });
};
const api0 = () => {
  return new Promise((resolve, reject) => {
    request(
      `https://mirrar.styledotme.com/api/b2c/v1/brand`,
      (err, httpResponse, body) => {
        if (err) return reject(err);
        const data = {
          statusCode: httpResponse.statusCode,
          request: httpResponse.request,
          method: httpResponse.method
        };
        resolve(data);
      }
    );
  });
};

const api1 = () => {
  return new Promise((resolve, reject) => {
    request.post(
      "https://mirrar.styledotme.com/api/b2c/v1/register",

      (err, httpResponse, body) => {
        if (err) return reject(err);
        const data = {
          statusCode: httpResponse.statusCode,
          request: httpResponse.request,
          method: httpResponse.method
        };
        resolve(data);
      }
    );
  });
};

const api2 = () => {
  return new Promise((resolve, reject) => {
    request.post(
      "https://mirrar.styledotme.com/api/b2c/v1/user/6290d1f9-dfa7-436b-b0f3-9c0232adbb50/order?token=token",

      {
        form: {
          design_code: "test",
          brand: "test-brand",
          sale_price: 10,
          discount_value: 10,
          address: "test address",
          order_status: true,
          transaction_response: true
        }
      },
      (err, httpResponse, body) => {
        if (err) return reject(err);
        const data = {
          statusCode: httpResponse.statusCode,
          request: httpResponse.request,
          method: httpResponse.method
        };
        resolve(data);
      }
    );
  });
};

const api3 = () => {
  return new Promise((resolve, reject) => {
    request.post(
      "https://mirrar.styledotme.com/api/b2c/v1/user/c20ad0e9-8905-4e3c-8c99-754e46679941/address/update?token=token",

      (err, httpResponse, body) => {
        if (err) return reject(err);
        const data = {
          statusCode: httpResponse.statusCode,
          request: httpResponse.request,
          method: httpResponse.method
        };
        resolve(data);
      }
    );
  });
};

const api4 = () => {
  return new Promise((resolve, reject) => {
    request.post(
      "https://mirrar.styledotme.com/api/b2c/v1/brand/ee51e48e-df06-4861-b3a1-e9ebd37693da/request",
      { form: { phone_number: "1234567897", message: "test message" } },

      (err, httpResponse, body) => {
        if (err) return reject(err);
        const data = {
          statusCode: httpResponse.statusCode,
          request: httpResponse.request,
          method: httpResponse.method
        };
        resolve(data);
      }
    );
  });
};

const responseHandler = (success, code, data) => {
  return {
    success,
    code,
    data
  };
};

const helperFunction = {
  responseHandler,
  razorpayFetchTransactionApi,
  //endpoints api
  api0,
  api1,
  api2,
  api3,
  api4
};

export default helperFunction;
