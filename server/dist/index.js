import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/poroducts-routes.js';
import usersRouter from './routes/users-routes.js';
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const password = '14karate';
const ENTRYPOINT = `mongodb+srv://andy95:${password}@main-server.stch8.mongodb.net/develop?retryWrites=true&w=majority`;
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/products', productsRouter);
app.use('/user', usersRouter);
mongoose.connect(ENTRYPOINT, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log(`Connection established! We are online!`))
    .catch(() => console.log(`Database connection failed`));
mongoose.set('useFindAndModify', false);
app.listen(PORT, () => console.log(`listening at ${PORT}`));
//# sourceMappingURL=index.js.map