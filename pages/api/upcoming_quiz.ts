import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

type ErrorType = {
    message: string
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Object | ErrorType>
) => {
    try {
        const tomorrow = dayjs().add(1, 'day');
        const tomorrowDawn = dayjs(`${tomorrow.format('YYYY-MM-DD')} 00:00:00`, 'YYYY-MM-DD HH:mm:ss');
        const now = dayjs();

        const dif = tomorrowDawn.diff(now, 'hour', true);
        const hours = Math.floor(dif);
        const minutesDif = (dif - hours) * 60;
        const minutes = Math.floor(minutesDif);
        const secondsDif = (minutesDif - minutes) * 60;
        const seconds = Math.floor(secondsDif);

        const hoursText = (hours > 0) ? (hours > 1 ? `${hours} hours ` : `${hours} hour `) : '';
        const minutesText = (minutes > 0) ? (minutes > 1 ? `${minutes} minutes ` : `${minutes} minute `) : '';
        const secondsText = (seconds > 0) ? (seconds > 1 ? `${seconds} seconds` : `${seconds} second`) : '';

        res.json({ time: `${hoursText}${minutesText}${secondsText}` });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default connectDB(handler);