import app from './app/app';
import {config} from 'dotenv'

config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`INFO:    Server start in http://localhost:${PORT}`);
});
