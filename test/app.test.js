const request = require('supertest');
const app = require('../app')
const path = require('path');

let admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQyYTUyYzcwZjVmYjEyOWExY2ZiNDkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODIwODkyNjB9.nuPfxNhBMUFV3xuq2k7n63fiOY6kKixlJ62qayGjQLM"
let merchant_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ5NGMzZjRjM2VmMDlhYzc0MDU0OTQiLCJyb2xlIjoibWVyY2hhbnQiLCJpYXQiOjE2ODI1MjUyNDd9.oZ6DK86oYM8kEw885aEUHmtQboHqABMk_zXgY4V9wSg"
describe('merchants', () => {

    var token_burger = ""
    var webid_burger = ""
    var id_burger = ""

    it('should register a merchant', async () => {
        const response = await request(app)
            .post('/api/merchants/')
            .auth(admin_token, { type: 'bearer' })
            .send({
                "name": "BurgerKing",
                "CIF": "buger123456",
                "address": "Gran via 57",
                "email": "burger_granvia@comida.com",
                "phone_num": "+34 975 456789"
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.merchant.name).toEqual('BurgerKing')
        expect(response.body.merchant.email).toEqual('burger_granvia@comida.com')

        token_burger = response.body.merchantJWT
        webid_burger = response.body.webpage_id
        id_burger = response.body.merchant._id
    })

    it('should get an unauthorized error', async () => {
        const response = await request(app)
            .post('/api/merchants/')
            .auth(token_burger, { type: 'bearer' })
            .send({
                "name": "BurgerKing",
                "CIF": "buger123456",
                "address": "Gran via 57",
                "email": "burger_granvia@comida.com",
                "phone_num": "+34 975 456789"
            })
            .set('Accept', 'application/json')
            .expect(401)
    });

    it('should update a merchant', async () => {
        const response = await request(app)
            .put('/api/merchants/'+id_burger)
            .auth(admin_token, { type: 'bearer' })
            .send({
                "name": "BurgerKingUpdateado",
                "CIF": "buger123456",
                "address": "Gran via 57",
                "email": "burger_granvia@comida.com",
                "phone_num": "+34 975 456789"
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.name).toEqual('BurgerKingUpdateado')
        expect(response.body.email).toEqual('burger_granvia@comida.com')
    });

    it('should return validator error', async () => {
        const response = await request(app)
            .put('/api/merchants/'+id_burger)
            .auth(admin_token, { type: 'bearer' })
            .send({
                "name": "BurgerKingUpdateado",
                "CIF": "buger123456",
                "address": "Gran via 57",
                "email": "burger_granvia@comida.com",
                "phone_num": "+34 975 456789",
                "webpage_id": "121932293",
                "user_id": "484832934"
            })
            .set('Accept', 'application/json')
            .expect(403)
    });

    it('should get all the merchants', async () => {
        const response = await request(app)
            .get('/api/merchants/')
            .auth(admin_token, { type: 'bearer' })
            .expect(200) 
        expect(response.body.pop().name).toEqual('BurgerKingUpdateado')     
    })

    it('should get a the merchant (BurgerKing)', async () => {
        const response = await request(app)
            .get('/api/merchants/'+id_burger)
            .auth(admin_token, { type: 'bearer' })
            .expect(200) 
        expect(response.body.name).toEqual('BurgerKingUpdateado')     
    })

    it('should delete a merchant', async () => {
        const response = await request(app)
            .delete('/api/merchants/'+id_burger)
            .auth(admin_token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.merchantDelete.acknowledged).toEqual(true)
        expect(response.body.userDelete.acknowledged).toEqual(true)
        expect(response.body.webpageDelete.acknowledged).toEqual(true)
    })

})

describe('storage', () => {

    var image_id = ""

    it('should upload an image', async () => {
        const filepath = `${__dirname}/greenpr.jpg`; 
        const response = await request(app)
            .post('/api/storage')
            .attach('image', filepath)
            .expect(200);
        expect(response.body.filename.split('-')[0]).toEqual('greenpr')

        image_id = response.body._id
    })

    it('should delete an image', async () => {
        const response = await request(app)
            .delete('/api/storage/'+image_id)
            .auth(admin_token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.deleted).toEqual(true)
    })

})

describe('users', () => {

    var user_id = ""
    var token_user = ""

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                "name": "usuario test",
                "email": "test@test.com",
                "password": "testuser123",
                "age": 22,
                "city": "ciudadtest",
                "interests": ["interes1", "interes2"],
                "acceptRecievingOffers": false
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.name).toEqual('usuario test')
        expect(response.body.user.acceptRecievingOffers).toEqual(false)

        user_id = response.body.user._id
        token_user = response.body.token
    })

    it('should get a validator error', async () => {
        const response = await request(app)
            .post('/api/users/')
            .send({
                "name": "usuario test2",
                "email": "test2@test.com",
                "password": "testuser123",
                "age": 1,
                "city": "ciudadtest",
                "interests": ["interes1", "interes2"],
                "acceptRecievingOffers": true,
                "role": "admin"
            })
            .set('Accept', 'application/json')
            .expect(403)
    });

    it('should update a user', async () => {
        const response = await request(app)
            .put('/api/users/')
            .send({
                "name": "usuario test updateado",
                "email": "test@test.com",
                "password": "testuser123",
                "age": 1,
                "city": "ciudadtest",
                "interests": ["interes1", "interes2"],
                "acceptRecievingOffers": true
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.name).toEqual('usuario test updateado')
        expect(response.body.acceptRecievingOffers).toEqual(true)
    });

    it('should get all the users from a city', async () => {
        const response = await request(app)
            .get('/api/users/ciudadTest')
            .auth(merchant_token, { type: 'bearer' })
            .expect(200) 
        expect(response.body.pop()).toEqual('test@test.com')     
    })

    it('should get login error', async () => {
        const response = await request(app)
            .delete('/api/users/')
            .send({
                "email": "test@test.com",
                "password": "test1234",
            })
            .set('Accept', 'application/json')
            .expect(401)
    })

    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/users/')
            .send({
                "email": "test@test.com",
                "password": "testuser123",
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.acknowledged).toEqual(true)
    })

})

describe('webpages', () => {

    var token_burger = ""
    var webid_burger = ""

    it('should register a merchant', async () => {
        const response = await request(app)
            .post('/api/merchants/')
            .auth(admin_token, { type: 'bearer' })
            .send({
                "name": "BurgerKing",
                "CIF": "buger123456",
                "address": "Gran via 57",
                "email": "burger_granvia@comida.com",
                "phone_num": "+34 975 456789"
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.merchant.name).toEqual('BurgerKing')
        expect(response.body.merchant.email).toEqual('burger_granvia@comida.com')

        token_burger = response.body.merchantJWT
        webid_burger = response.body.webpage_id
        id_burger = response.body.merchant._id
    })

    it('should return message and webid cause of existing webpage', async () => {
        const response = await request(app)
            .post('/api/webpages/')
            .auth(token_burger, { type: 'bearer' })
            .send({
                "city": "madrid",
                "activity": "comida",
                "title": "Burger",
                "summary": "Restaurante de Comida Rapida Burgerifica",
                "texts": ["Prueba la nueva burger master"]    
            
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.webpage_id).toEqual(webid_burger)
    })

    it('should update a webpage', async () => {
        const response = await request(app)
            .put('/api/webpages/'+webid_burger)
            .auth(token_burger, { type: 'bearer' })
            .send({
                "city": "ciudadtest",
                "activity": "comida",
                "title": "Burger",
                "summary": "Restaurante de Comida Rapida Burgerifica",
                "texts": ["Prueba la nueva burger master"]    
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.title).toEqual("Burger")
    });

    it('should get an not owner error', async () => {
        const response = await request(app)
            .put('/api/webpages/'+webid_burger)
            .auth(merchant_token, { type: 'bearer' })
            .send({
                "city": "ciudadtest",
                "activity": "comida",
                "title": "Burger",
                "summary": "Restaurante de Comida Rapida Burgerifica",
                "texts": ["Prueba la nueva burger master"]    
            })
            .set('Accept', 'application/json')
            .expect(401)
    });

    it('should patch images', async () => {
        const response = await request(app)
            .patch('/api/webpages/photos/'+webid_burger)
            .auth(token_burger, { type: 'bearer' })
            .send({
                "images": ["mcrunchy-1682520325471.jpg"," ", "bigmac-1682520163039.jpg"]    
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.images[0]).toEqual("mcrunchy-1682520325471.jpg")
    });


    it('should patch texts', async () => {
        const response = await request(app)
            .patch('/api/webpages/texts/'+webid_burger)
            .auth(token_burger, { type: 'bearer' })
            .send({
                "texts": ["burgers kings", "triple b burger buena barata"]    
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.texts.pop()).toEqual("triple b burger buena barata")
    });

    it('should get all the webpages not ordered', async () => {
        const response = await request(app)
            .get('/api/webpages?scoring=false')
            .expect(200) 
        expect(response.body.pop().title).toEqual('Burger')     
    })

    it('should get a the webpage (BurgerKing)', async () => {
        const response = await request(app)
            .get('/api/webpages/'+webid_burger)
            .auth(token_burger, { type: 'bearer' })
            .expect(200) 
        expect(response.body.title).toEqual('Burger')     
    })

    it('should get all the webpages of city ciudadTest', async () => {
        const response = await request(app)
            .get('/api/webpages/search/ciudadTest')
            .expect(200) 

        expect(response.body.pop().title).toEqual('Burger')     
    })

    it('should get all the webpages of city ciudadTest and activity comida', async () => {
        const response = await request(app)
            .get('/api/webpages/search/ciudadTest/comida')
            .expect(200) 

        expect(response.body.pop().title).toEqual('Burger')     
    })

    it('should add review', async () => {
        const response = await request(app)
            .patch('/api/webpages/'+webid_burger)
            .send({
                "email": "sebastian@test.com",
                "password": "sebastian123",
                "score": 5,
                "opinion": "La mejor hamburguesa de burger king de la vida"
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.reviews.scores[0]).toEqual(5)
    });

    it('should delete a webpage', async () => {
        const response = await request(app)
            .delete('/api/webpages/'+webid_burger)
            .auth(token_burger, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.deleteWebpage.acknowledged).toEqual(true)
        expect(response.body.updatedMerchant.webpage_id).toEqual(null)
    })

    it('should create a new webpage', async () => {
        const response = await request(app)
            .post('/api/webpages/')
            .auth(token_burger, { type: 'bearer' })
            .send({
                "city": "madrid",
                "activity": "comida",
                "title": "Burger",
                "summary": "Restaurante de Comida Rapida Burgerifica",
                "texts": ["Prueba la nueva burger master"]    
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.createdWebPage.title).toEqual("Burger")
        expect(response.body.updatedMerchant.webpage_id).toEqual(response.body.createdWebPage._id)
        webid_burger = response.body.createdWebPage._id
    })

    it('should delete a merchant', async () => {
        const response = await request(app)
            .delete('/api/merchants/'+id_burger)
            .auth(admin_token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.merchantDelete.acknowledged).toEqual(true)
        expect(response.body.userDelete.acknowledged).toEqual(true)
        expect(response.body.webpageDelete.acknowledged).toEqual(true)
    })

})