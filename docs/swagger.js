const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Express API with Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "This is a CRUD API that allows admins to create merchants, for merchants create webpages and upload their info there and for users to access this webpages to see the scoring and info and aslo leave a review if desired and registered",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "u-tad",
          url: "https://u-tad.com",
          email: "sebastian.fernandez@live.u-tad.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            users: {
                type: "object",
                required: ["name", "email", "password", "age", "city", "interests", "acceptRecievingOffers"],
                properties: {
                    name: {
                        type: "string",
                        example: "Menganito"
                    },
                    email: {
                        type: "string",
                        example: "miemail@google.com"
                    },
                    password: {
                        type: "string"
                    },
                    age: {
                      type: "integer",
                      example: 20
                    },
                    city:{
                      type: "string",
                      example: "Madrid"
                    },
                    interests:{
                      type: "[string]",
                      example: "['ocio', 'comida', 'deportes']"
                    },
                    acceptRecievingOffers:{
                      type: "boolean",
                      example: true
                    },
                    role:{
                      type: "string",
                      enum: "['user','admin','merchant']",
                      example: "merchant"
                    }
                },
            },
            storage: {
              type: "object",
              properties: {
                  url: {
                      type: "string",
                      example: "http://localhost:3000/imageOne-121222434.jpg"
                  },
                  filename: {
                      type: "string",
                      example: "imageOne.jpg"
                  }
              },
            },
            merchants: {
              type: "object",
              required: ["name", "CIF", "address", "email", "phone_num", "webpage_id", "user_id"],
              properties: {
                  name: {
                      type: "string",
                      example: "Menganito"
                  },
                  CIF: {
                      type: "string",
                      example: "G847360039"
                  },
                  address: {
                    type: "string",
                    example: "Calle Miguel Aleman 34"
                  },
                  email: {
                    type: "string",
                    example: "miemail@google.com"
                  },
                  phone_num:{
                    type: "string",
                    example: "+34 839 284094"
                  },
                  webpage_id:{
                    type: "ObjectId"
                  },
                  user_id:{
                    type: "ObjectId"
                  }
              },
            },
            webpages: {
              type: "object",
              required: ["merchant_id", "city", "activity", "title", "summary", "texts", "images", "scoring", "number_of_reviews", "reviews"],
              properties: {
                  merchant_id: {
                      type: "ObjectId"
                  },
                  city: {
                      type: "string",
                      example: "Madrid"
                  },
                  activity: {
                    type: "string",
                    example: "comida"
                  },
                  title: {
                    type: "string",
                    example: "McDonalds"
                  },
                  summary:{
                    type: "string",
                    example: "Resaturante de comida rapida"
                  },
                  texts:{
                    type: "[string]"
                  },
                  images:{
                    type: "[string]"
                  },
                  scoring:{
                    type: "decimal"
                  },
                  number_of_reviews:{
                    type: "integer"
                  },
                  reviews:{
                    score:{
                      type: "[Number]",
                      min: 0,
                      max: 5
                    },
                    opinions:{
                      type: "[string]"
                    }
                  }
              },
            }
        },
      },
    },
    apis: ["./routes/*.js"],
  };
  
module.exports = swaggerJsdoc(options)