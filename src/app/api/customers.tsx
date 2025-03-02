// pages/api/customers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const customers = await prisma.customer.findMany({
      include: { measurements: true },
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}