import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
// import prisma from '@/lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newTask = await prisma.task.create({
      data: {
        title: 'My Test Task',
        status: 'PENDING',
      },
    });

    res.status(200).json({ message: 'Inserted successfully', task: newTask });
  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ error: 'Failed to insert task' });
  }
}
