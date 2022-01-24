import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.PANDASCORE_ACCESS_TOKEN}`;

export default axios.create({
    baseURL: 'https://api.pandascore.co',
    config: {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    },
});
