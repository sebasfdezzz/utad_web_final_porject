const express = require("express");
const router = express.Router();
const {createMerchant, updateMerchant, getMerchant,getMerchants, deleteMerchant} = require('../controllers/merchants');
const {authMiddleware, checkRol} = require('../middleware/auth');
const {validatorCreateUpdate, validatorId} = require('../validators/merchants');

/**
 * @openapi
 * /merchants/
 *  post:
 *      tags:
 *      - Merchant
 *      summary: Create a merchant
 *      description: The admin can make this request whcih will create a merchant, its webpage and its user with the "merchant" role
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchants"
 *      responses:
 *          '200':
 *              description: Returns an object containing: merchantJWT (the JWT token for the merchant created), webpage_id (for the merchant to use), and dataMerchant (the inserted object to the merchant collection)
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.post('/', authMiddleware, checkRol(['admin']),validatorCreateUpdate, createMerchant); //para dar de alta un negocio, regresa merchantJWT, webpage_id y merchantData

/**
 * @openapi
 * /merchants/{id}
 *  put:
 *      tags:
 *      - Merchant
 *      summary: Update a merchant
 *      description: The admin can update the merchant which will also update the name and email of its user
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string     
 * requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchants"
 *      responses:
 *          '200':
 *              description: Returns the updated object
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.put('/:id', authMiddleware, checkRol(['admin']),validatorId ,validatorCreateUpdate, updateMerchant); //para modificar un negocio

/**
 * @openapi
 * /merchants/
 *  get:
 *      tags:
 *      - Merchant
 *      summary: Get all merchants
 *      description: The admin can see all the registered merchants
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchants"
 *      responses:
 *          '200':
 *              description: Returns an array of the merchant objects
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.get('/', authMiddleware, checkRol(['admin']), getMerchants); //ver todos los negocios

/**
 * @openapi
 * /merchants/{id}
 *  get:
 *      tags:
 *      - Merchant
 *      summary: Get a single merchant
 *      description: The admin can see the information of a merchant by passing an its id
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the required merchant
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchants"
 *      responses:
 *          '200':
 *              description: Returns the merchant object
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.get('/:id', authMiddleware, checkRol(['admin']),validatorId, getMerchant); //consultar un negocio

/**
 * @openapi
 * /merchants/{id}
 *  delete:
 *      tags:
 *      - Merchant
 *      summary: Delete a merchant
 *      description: The admin can delete a merchant by passing an its id
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the merchant that wants to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchants"
 *      responses:
 *          '200':
 *              description: Returns the  information about the delete operation
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.delete('/:id', authMiddleware, checkRol(['admin']),validatorId, deleteMerchant); //borrar un negocio

module.exports = router;