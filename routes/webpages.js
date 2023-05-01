const express = require("express");
const router = express.Router();
const {createWebpage, updateWebpage,uploadImage,uploadText,deleteWebpage,getWebpages,getWebpage, getByCity, getByCityAndActivity, addReview, MerchantcreateWebpage} = require('../controllers/webpages');
const {validatorGetByCity, validatorGetByCityAndActivity, validatorId,validatorAddText,validatorAddImages, validatorCreate, validatorReview, validatorCreateUpdate} = require('../validators/webpages');
const {authMiddleware, checkRol, checkWebpageOwnership , loginRequired} = require('../middleware/auth');
const {validatorLogin} = require('../validators/users');


/**
 * @openapi
 * /webpages/:
 *  post:
 *      tags:
 *      - Webpages
 *      summary: Create a webpage
 *      description: A merchant can create a webpgae if and only if it does not own one already
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the data from the created webpage and the updated merchant with the new webpage id
 *          '205':
 *              description: Returns a message and an existing webpage id if the merchant already had a website           
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.post('/',authMiddleware, checkRol(['merchant']), validatorCreateUpdate, MerchantcreateWebpage); //para dar de alta su pagina en caso de que la hayan borrado, solo pueden tener uno

/**
 * @openapi
 * /webpages/{id}:
 *  put:
 *      tags:
 *      - Webpages
 *      summary: Update a webpage
 *      description: A merchant can update the information from its own website only
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the webpage to be updated
 *              required: true
 *              schema:
 *                  type: string     
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
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
router.put('/:id',authMiddleware, checkRol(['merchant']), validatorId , checkWebpageOwnership , validatorCreateUpdate,updateWebpage); //para modificar su pagina (accesible por merchants)

/**
 * @openapi
 * /webpages/photos/{id}:
 *  patch:
 *      tags:
 *      - Webpages
 *      summary: Upload images url
 *      description: A merchant can upload one or more images urls at the same time as a string array
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the webpage of the uploaded images
 *              required: true
 *              schema:
 *                  type: string     
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
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
router.patch('/photos/:id',authMiddleware, checkRol(['merchant']),validatorId , checkWebpageOwnership, validatorAddImages, uploadImage); //para agregar fotos a una pagina (accesible por merchants)

/**
 * @openapi
 * /webpages/texts/{id}:
 *  patch:
 *      tags:
 *      - Webpages
 *      summary: Upload texts for the webpage
 *      description: A merchant can upload one or more texts at the same time as a string array
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the webpage of the uploaded texts
 *              required: true
 *              schema:
 *                  type: string     
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
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
router.patch('/texts/:id',authMiddleware, checkRol(['merchant']),validatorId, checkWebpageOwnership,validatorAddText, uploadText); //para agregar fotos a una pagina (accesible por merchants)

/**
 * @openapi
 * /webpages/{id}:
 *  delete:
 *      tags:
 *      - Webpages
 *      summary: Delete a webpage
 *      description: A merchant can delete its own webpage, which will also update the merchants webpage_id to null
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the webpage that wants to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the information about the delete operation and the updated Merchant
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.delete('/:id',authMiddleware, checkRol(['merchant']), validatorId , checkWebpageOwnership , deleteWebpage); //para borrar su pagina (accesible por merchants)

//-----------------users (public y registers)------------------

/**
 * @openapi
 * /webpages/:
 *  get:
 *      tags:
 *      - Webpages
 *      summary: Get all the webpages
 *      description: All users con request to see all the webpages either ordered by its scoring or not
 *      parameters:
 *          -   name: scoring
 *              in: query params
 *              description: boolean value to request the webpages ordered or not
 *              required: false
 *              schema:
 *                  type: boolean
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns all the webpages
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.get('/',getWebpages); //ver todas las paginas que hay

/**
 * @openapi
 * /webpages/{id}:
 *  get:
 *      tags:
 *      - Webpages
 *      summary: Get a single webpage by id
 *      description: All users con request to see a specific webpage
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the requested webpage
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the webpage object
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.get('/:id', validatorId, getWebpage); //ver una sola pagina

/**
 * @openapi
 * /webpages/search/{city}:
 *  get:
 *      tags:
 *      - Webpage
 *      summary: Get a webpages from specific city
 *      description: All users con request to see the webpages from a city
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: city name to filter with
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the webpages in the given city
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.get('/search/:city',validatorGetByCity ,getByCity); //var las paginas de su ciudad

/**
 * @openapi
 * /webpages/search/{city}/{activity}:
 *  get:
 *      tags:
 *      - Webpage
 *      summary: Get a webpages from specific city and activity
 *      description: All users con request to see the webpages from a city and activity
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: city name to filter with
 *              required: true
 *              schema:
 *                  type: string
 *          -   name: activity
 *              in: path
 *              description: activity to filter with
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the webpages in the given city and of the given activity
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.get('/search/:city/:activity',validatorGetByCityAndActivity ,getByCityAndActivity); //var las paginas de su ciudad y de esa actividad

//----------------registered users NO REQUIERE JWT solo email y password----------------------------- 

/**
 * @openapi
 * /webpages/{id}:
 *  patch:
 *      tags:
 *      - Webpage
 *      summary: Add review
 *      description: Registered users can review webpages by logging in and providing the webpage id
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the webpage to review
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpages"
 *      responses:
 *          '200':
 *              description: Returns the updated object with the new review
 *          '401':
 *              description: Authorization errors
 *          '403':
 *              description: Mongoose errors
 *      security:
 *          - bearerAuth: []
 */
router.patch('/:id', validatorLogin, loginRequired, authMiddleware, validatorId, validatorReview, addReview); //para que los usuarios puedan reseñar una pagina

module.exports = router;