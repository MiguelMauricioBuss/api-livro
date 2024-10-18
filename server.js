
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/livros', async (request, reply) => {
    const body = request.body;
    await databasePostgres.createLivro(body);
    return reply.status(201).send();
})

// READE
server.get('/livros', async () => {
    const livros = await databasePostgres.listLivros();
    return livros;
});

// UPDATE
server.put('/livros/:id', async (request, reply) => {
    const livroID = request.params.id;
    const body = request.body;
    await databasePostgres.updateLivro(livroID, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/livros/:id', async (request, reply) => {
    const livroID = request.params.id;
    await databasePostgres.deleteLivro(livroID);

    return reply.status(204).send();
})


server.listen({
    port: 3333
}, console.log("servidor rodando"));
