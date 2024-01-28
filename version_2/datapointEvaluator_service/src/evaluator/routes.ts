import { FastifyInstance } from 'fastify';
import { cashflowResolver } from '../dataPointDefinitions/cashflow/cashflowResolver';

export default async function (fastify: FastifyInstance) {
   fastify.get('/modules/cashflow/netincome', cashflowResolver);
}
