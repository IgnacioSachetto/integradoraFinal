import chai from 'chai';
import supertest from 'supertest';
const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Cart Controller', () => {
  let createdCartId = null;

  describe('GET /api/carts', () => {
    it('debería obtener todos los carritos', async () => {
      const response = await requester.get('/api/carts');
      expect(response.status).to.be.eql(200);
      expect(response.body).to.have.property('status', 'sucess');
      expect(response.body).to.have.property('msg', 'Found all carts');
    });

    it('debería obtener carritos con límite', async () => {
      const limit = 5;
      const response = await requester.get(`/api/carts?limit=${limit}`);
      expect(response.status).to.be.eql(200);
      expect(response.body).to.have.property('status', 'sucess');
      expect(response.body).to.have.property('msg', `Found ${limit} carts`);
    });
  });




  describe('POST /api/carts', () => {
    it('debería crear un nuevo carrito y almacenar su ID', async function () {

    });
  });




  describe('GET /api/carts/:id', () => {
    it('debería obtener un carrito por su ID', async () => {
      const testCartIdGET = '64a09c248d9e59ed2adf14dd';
      const response = await requester.get(`/api/carts/${testCartIdGET}`);
      expect(response.status).to.be.eql(200);
      expect(response.body).to.have.property('status', 'sucess');
      expect(response.body).to.have.property('msg', 'Cart found');
    });
  });

  describe('PUT /api/carts/:cid/products/:pid', () => {
    it('debería actualizar la cantidad de un producto en un carrito', async () => {
      const testCartIdGET = "64a09c248d9e59ed2adf14dd";
      const updatedProductData = {
        products: [
          {
            id: "1",
            quantity: 5,
          }
        ]
      };

      const response = await requester
        .put(`/api/carts/${testCartIdGET}`)
        .send(updatedProductData);

      expect(response.status).to.be.eql(200);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('msg', 'product in cart updated');
    });
  });


  describe('DELETE /api/carts/:id', () => {
    it('debería eliminar el carrito creado en POST', async () => {
      if (createdCartId) {
        const response = await requester.delete(`/api/carts/${createdCartId}`);
        expect(response.status).to.be.eql(200);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('msg', 'cart deleted');
      } else {
        console.warn('');
      }
    });
  });
});
