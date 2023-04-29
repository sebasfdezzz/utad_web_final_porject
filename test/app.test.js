const request = require('supertest');
const app = require('../app')

let admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQyYTUyYzcwZjVmYjEyOWExY2ZiNDkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODIwODkyNjB9.nuPfxNhBMUFV3xuq2k7n63fiOY6kKixlJ62qayGjQLM"

describe('merchants', () => {

    var token_burger = ""
    var webid_burger = ""
    var id_burger = ""

    it('should register a merchant', async () => {
        const response = await request(app)
            .post('/merchants/')
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
            .post('/merchants/')
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
            .put('/merchants/'+id_burger)
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
            .put('/merchants/'+id_burger)
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
            .get('/merchants/')
            .auth(admin_token, { type: 'bearer' })
            .expect(200) 
        expect(response.body.pop().name).toEqual('BurgerKingUpdateado')     
    })

    it('should get a the merchant (BurgerKing)', async () => {
        const response = await request(app)
            .get('/merchants/'+id_burger)
            .auth(admin_token, { type: 'bearer' })
            .expect(200) 
        expect(response.body.name).toEqual('BurgerKingUpdateado')     
    })

    it('should delete a merchant', async () => {
        const response = await request(app)
            .delete('/merchants/'+id_burger)
            .auth(admin_token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.merchantDelete.acknowledged).toEqual(true)
        expect(response.body.userDelete.acknowledged).toEqual(true)
        expect(response.body.webpageDelete.acknowledged).toEqual(true)
    })

})