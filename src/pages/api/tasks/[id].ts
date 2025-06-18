import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    if (req.method === 'DELETE') {
        try {
            await prisma.task.delete({ where: { id } });
            return res.status(200).json({ message: 'Task deleted' });
        } catch (error) {
            console.log("Error while deleting task: ", error);
            return res.status(500).json({ error: 'Task not found' });
        }
    }

    if (req.method === 'PUT') {
        const { title, status } = req.body;
        try {
            const updateData: { title?: string; status?: "PENDING" | "DONE" } = {};
            if (title !== undefined) updateData.title = title;
            if (status !== undefined) updateData.status = status;
            const updatedTask = await prisma.task.update({
                where: { id },
                data: updateData,
            });
            return res.status(200).json({ updatedTask, message: "Task updated" });
        } catch (error) {
            console.log("Error while updating task: ", error);
            return res.status(500).json({ error: 'Task not found' });
        }
    }

    if (req.method === 'GET') {
        try {
            const task = await prisma.task.findUnique({ where: { id } });
            return res.status(200).json(task);

        } catch (error) {
            return res.status(404).json({ error: `Task not found ${error}` });
        }
    }
}