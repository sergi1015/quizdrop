import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import StudyMaterial from 'models/studymaterial';

type ErrorType = {
    message: string
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Array<Object> | ErrorType>
) => {
    try {
        const materials = await StudyMaterial.find().sort({ added_date: 'desc'});
        res.json(materials);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default connectDB(handler);