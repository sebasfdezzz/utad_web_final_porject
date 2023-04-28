const express = require("express")
const router = express.Router();
const {authMiddleware, checkRol} = require('../middleware/auth');
const uploadMiddleware = require("../utils/handleStorage")
const { getItem, getItems, createItem, deleteItem } = require("../controllers/storage")
const { validatorGetItem } = require('../validators/storage')

/**
 * @openapi
 * /storage/:
 *  get:
 *      tags:
 *      - Storage
 *      summary: Get a all image's info
 *      description:
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/storage"
 *      responses:
 *          '200':
 *              description: Returns the images objects
 *          '403':
 *              description: Mongoose errors
 */
router.get("/", getItems)

/**
 * @openapi
 * /storage/{id}:
 *  get:
 *      tags:
 *      - Storage
 *      summary: Get a single image's info
 *      description:
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the required image
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/storage"
 *      responses:
 *          '200':
 *              description: Returns the image object
 *          '403':
 *              description: Mongoose errors
 */
router.get("/:id", validatorGetItem, getItem)

/**
 * @openapi
 * /storage/:
 *  post:
 *      tags:
 *      - Storage
 *      summary: Upload an image
 *      description: A merchant can upload an image to the storage foldeer in the local device and the public url to access
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/storage"
 *      responses:
 *          '200':
 *              description: Returns the url and filename
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authMiddleware, checkRol(['merchant']), uploadMiddleware.single("image"), createItem)

/**
 * @openapi
 * /storage/{id}:
 *  delete:
 *      tags:
 *      - Storage
 *      summary: Delete an image
 *      description: The admin can delete an imagen given its id, it deletes it from the mongo collection and the storage folder
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the image that wants to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/storage"
 *      responses:
 *          '200':
 *              description: Returns the information about the delete operation
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkRol(['admin']),validatorGetItem, deleteItem);

module.exports = router;