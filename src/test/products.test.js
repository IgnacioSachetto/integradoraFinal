import chai from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('testing de integracion', () => {
  describe('Testing Usuarios', () => {
    it('debería obtener todos los productos', async () => {
      const response = await requester.get('/api/products');
      expect(response.status).to.be.eql(200);
      expect(response.body).to.have.property('status', 'sucess');
      expect(response.body).to.have.property('msg', 'Found productos');
    });

    it('debería obtener productos por medio de mocking', async () => {
      const response = await requester.get('/api/products/mockingproducts');
      expect(response.status).to.be.eql(200);
      expect(response.body).to.have.property('status', 'success');
      expect(response.body).to.have.property('msg', 'found all products');
      expect(response.body).to.have.property('data');
    });

    it('En endpoint POST /api/sessions/login debe devolver una cookie de logueado', async function () {
      this.timeout(50000);
      const result = await requester.post('/api/sessions/login').send({
        email: 'prueba1@prueba1.com',
        password: 'prueba1',
      });
      const cookie = result.headers['set-cookie'][0];
      expect(cookie).to.be.ok;

      cookieName = cookie.split('=')[0];
      cookieValue = cookie.split('=')[1];
      expect(cookieName).to.be.ok.and.eql('connect.sid');
      expect(cookieValue).to.be.ok;
    });

    let cookieName;
    let cookieValue;

    describe('Testing Products', () => {
      let idproducto;

      const mockProduct = {
        title: 'producto test',
        description: 'descripcion test',
        code: '99999',
        price: 10,
        status: true,
        stock: 10,
        category: 'almacen',
        thumbnails: ['1', '2', '3'],
      };

      const mockProductUpdated = {
        title: 'producto updated',
        description: 'descripcion updated',
        code: '99999',
        price: 100,
        status: true,
        stock: 100,
        category: 'prueba',
        thumbnails: ['1', '2', '3'],
      };

      it('En endpoint GET /api/products debe traer productos registrados', async function () {
        this.timeout(50000);
        const response = await requester.get('/api/products');
        const { status, ok, body } = response;
        expect(status).to.equal(200);
        expect(ok).to.equal(true);
        expect(Array.isArray(body.payload)).to.equal(true);
        expect(body.payload.length).to.be.greaterThan(1);
      });

      it('En endpoint POST /api/products debe crear un producto ', async function () {
        this.timeout(50000);
        const response = await requester.post('/api/products').send(mockProduct).set('Cookie', [`${cookieName}=${cookieValue}`]);
        const { status, ok, body } = response;
        expect(status).to.equal(201);
        expect(ok).to.equal(true);
        expect(body.data).to.have.property('_id');
        idproducto = body.data._id;
      });

      it('En endpoint PUT /api/products/:id debe actualizar un producto', async function () {
        this.timeout(50000);

        if (!mongoose.Types.ObjectId.isValid(idproducto)) {
          throw new Error('idproducto no es un ObjectId válido.');
        }

        const response = await requester
          .put(`/api/products/${idproducto}`)
          .send(mockProductUpdated)
          .set('Cookie', [`${cookieName}=${cookieValue}`]);

        const { status, ok, body } = response;
        expect(status).to.equal(201);
        expect(ok).to.equal(true);

        expect(body).to.have.property('data');
      });

      it('En endpoint DELETE /api/products/:id debe eliminar un producto', async function () {
        this.timeout(50000);
        const response = await requester.delete(`/api/products/${idproducto}`).set('Cookie', [`${cookieName}=${cookieValue}`]);
        const { status, ok, body } = response;
        expect(status).to.equal(200);
        expect(ok).to.equal(true);

        expect(body).to.have.property('msg', 'product deleted');
      });
    });
  });
});
