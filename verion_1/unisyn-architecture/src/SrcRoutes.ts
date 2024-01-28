import { FastifyInstance } from 'fastify';
import { netIncomeResolver } from './modules/cashflow/netIncome/netIncomeResolver';

export default async function (fastify: FastifyInstance) {
    fastify.get('/modules/cashflow/netincome', netIncomeResolver);
}
