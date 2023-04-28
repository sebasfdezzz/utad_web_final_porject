const express = require("express");
const router = express.Router();
const {createUser, updateUser, deleteUser, getFromCity} = require('../controllers/users');
const { validatorCreateUpdate, validatorLogin, validatorGetUserByCity } = require('../validators/users');
const {authMiddleware, checkRol, loginRequired} = require('../middleware/auth');

/**
 * @openapi
 * /users/:
 *  post:
 *      tags:
 *      - Users
 *      summary: Create a user
 *      description: For the public users to register
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/users"
 *      responses:
 *          '200':
 *              description: Returns the info of the object created and the users JWT token
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 */
router.post('/', validatorCreateUpdate, createUser); //para que los public users se registren

/**
 * @openapi
 * /users/:
 *  put:
 *      tags:
 *      - Users
 *      summary: Update a users information
 *      description: The registered users can update their information, it requires for the user to login with a valid email and password
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/users"
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
router.put('/', validatorLogin, loginRequired, authMiddleware, validatorCreateUpdate, updateUser); //para modificar sus datos (accesible por registered users only)

/**
 * @openapi
 * /users/:
 *  delete:
 *      tags:
 *      - Users
 *      summary: Delete a user
 *      description: Registered users can delete their account by logging in with their email and password and choosing to do so
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/users"
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
router.delete('/', validatorLogin, loginRequired, authMiddleware, deleteUser); //para que el usuario se de de baja (accesible por registered users)
//quite el :id de PUT y DELETE para que solo sea necesaria la info de login

/**
 * @openapi
 * /users/{city}:
 *  get:
 *      tags:
 *      - Users
 *      summary: Get users emails from a city
 *      description: Merchants can request the emails of all the registered users in a specific city
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: name of the city to filter with
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/users"
 *      responses:
 *          '200':
 *              description: Returns the list of emails
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.get('/:city', authMiddleware, checkRol(['merchant']),validatorGetUserByCity, getFromCity); //para que los merchants puedan ver los usuarios de alguna ciudad

module.exports = router;

