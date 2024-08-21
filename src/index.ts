import app from './app/app';

const PORT: number = 3000;

app.listen(3000, () => {
    console.log(`INFO:    Server start in http://localhost:${PORT}`);
});
