import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../../utils/server";
import { createArea } from "../../services/area.service";

const app = createServer(); 

export const areaPayload = {
    index: 1,
    parentCode: 1,
    nameArea: 'Cocina',
    codeArea: 'Cocina-01',
    phoneArea: '+50497412003',
    employee: new mongoose.Types.ObjectId().toString(),
    details: 'Cocina',
    isActive: true 
};

export const areaUpdate = {
    index: 1,
    parentCode: 1,
    nameArea: 'Estante',
    codeArea: 'Estante-01',
    phoneArea: '+50497412003',
    employee: new mongoose.Types.ObjectId().toString(),
    details: 'Estante',
    isActive: true 
};

export const areaWithoutFields = {
    parentCode: 1,
    nameArea: 'Cocina',
    codeArea: 'Cocina-01',
    phoneArea: '+50497412003',
    employee: new mongoose.Types.ObjectId().toString(),
    details: 'Cocina',
    isActive: true 
};

describe('(/api/areas) - Areas', () => {
    beforeAll( async() => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async() => {
        await mongoose.disconnect();
        await mongoose.connection.close(); 
    });

    describe('POST (/api/areas) Create area', () => {
        it('Should be reject because not send data', async() => {
            const { statusCode } = await supertest(app).post('/api/areas');

            expect(statusCode).toBe(400);
        });

        it('Should be reject because missing fields', async() => {
            const { statusCode, body } = await supertest(app)
                .post('/api/areas')
                .send(areaWithoutFields);
            
            expect(statusCode).toBe(400); 
            expect(Array.isArray(body)).toBe(true);
            const [error] = body;
            expect(error.message).toBe('Indice de area padre es requerida'); 
        });

        it('Should be create area successfully', async() => {
            const { statusCode, body } = await supertest(app)
                .post('/api/areas')
                .send(areaPayload);
            
            expect(statusCode).toBe(201); 
            expect(typeof body).toBe('object');
            expect(body.message).toBe('Area creada exitosamente');
            expect(body.data).toEqual({
                ...areaPayload,
                _id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        });
    });

    describe('PUT (/api/areas) Update area', () => {
        it('Should be reject because not send data', async() => {
            const area = await createArea(areaPayload);

            const { statusCode } = await supertest(app).put(`/api/areas/${area._id}`);

            expect(statusCode).toBe(400);
        });

        it('Should be update area successfully', async() => {

            const area = await createArea(areaPayload);

            const { statusCode, body } = await supertest(app)
                .put(`/api/areas/${area._id}`)
                .send(areaUpdate);
            
            expect(statusCode).toBe(200);
            expect(typeof body).toBe('object');
            expect(body.message).toBe('Area actualizada exitosamente');
        });
    });

    describe('DELETE (/api/areas) Delete area', () => {
        it('Should be reject because not found', async() => {
            const area = await createArea(areaPayload);

            const { statusCode } = await supertest(app).delete(`/api/areas/12345`);

            expect(statusCode).toBe(404);
        });

        it('Should be delete area successfully', async() => {

            const area = await createArea(areaPayload);

            const { statusCode, body } = await supertest(app)
                .delete(`/api/areas/${area._id}`)
                
            expect(statusCode).toBe(200);
            expect(typeof body).toBe('object');
            expect(body.message).toBe('Area eliminada exitosamente');
        });
    });
    
    describe('GET (/api/areas) All areas', () => {
        it('Should be all areas successfully', async() => {
            const { statusCode, body } = await supertest(app).get('/api/areas');

            expect(statusCode).toBe(200); 
            expect(typeof body).toBe('object');
            expect(Array.isArray(body.data)).toBe(true); 
            expect(body.data).toContain('_id');
        });
    });
});
