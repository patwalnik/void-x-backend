const env = "dev";
let config;

if (env === "dev") {
  config = {
    baseUrl: "http://localhost:3002",
    mongodb: {
      url:
        "mongodb+srv://patwalnik:voidx1234@cluster0.tifxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      // url: 'mongodb://localhost:27017/sdm'
    },
    jsonSecret: "styledotme",
    SFSecret: "$::12stackFin54:",
    httpPort: 3002,
    httpsPort: 3003,
    env: env,
    elasticUrl: "",
    aws_access_key: "",
    aws_secret_access_key: "",
    aws_default_region: "",
    s3bucketname: "",
    slackToken:
      "xoxp-30920186198-672710775700-675033924311-2fc2523e99dcca2c811ef1f9f8d58c77",
    slackUser: "saurabh",
    razorKeyId: "",
    razorKeySecret: "",
    razorTestKeyId: "",
    razorTestKeySecret: ""
  };
}

const configHolder = config;
export default configHolder;
