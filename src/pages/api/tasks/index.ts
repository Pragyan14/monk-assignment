import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json(tasks);
  }

  if (req.method === 'POST') {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required' });
    }

    await prisma.task.create({
      data: { title, status: 'PENDING' },
    });

    return res.status(201).json("Task added successfully");
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
