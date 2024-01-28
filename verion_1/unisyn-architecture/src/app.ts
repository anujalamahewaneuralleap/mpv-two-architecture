import Fastify from 'fastify';
import * as dotenv from 'dotenv';
import userRoutes from './SrcRoutes';


const app = Fastify();
dotenv.config();

// Register routes
app.register(userRoutes);

app.get('/', async (request, reply) => {
    return { hello: 'Hello world! from app.js' };
});
  

export default app;
