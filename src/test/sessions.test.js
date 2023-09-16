import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://127.0.0.1:8080');

describe('Inicio de Sesión', () => {
  let cookieName;
  let cookieValue;
  it('Debería iniciar sesión y almacenar la cookie', async function () {
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

    it('Debería registrar usuario con éxito y redirigir a /login', async () => {
        const mockUser = {
            firstName: 'Juan',
            lastName: 'Perez',
            age: 30,
            email: 'juanperez101@hotmail.com',
            password: 'contraseña',
        };

        const response = await requester.post('/api/sessions/register').send(mockUser);

        expect(response.status).to.equal(302);
        expect(response.headers).to.have.property('location', '/login');
        expect(response.redirect).to.be.true;
    });

    it('Debería registrar usuario con éxito y verificar los detalles', async () => {

        const userEmail = 'juanperez32@hotmail.com';

        const userDetailsResponse = await requester.get(`/api/users?email=${userEmail}`);

        expect(userDetailsResponse.status).to.equal(200);
        expect(userDetailsResponse.body).to.have.property('status', 'success');
        expect(userDetailsResponse.body).to.have.property('data');

    });

});






