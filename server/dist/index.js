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
const ENTRYPOINT = 'mongodb+srv://andy95:14karate@main-server.stch8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/producst', productsRouter);
app.use('/user', usersRouter);
mongoose.connect(ENTRYPOINT, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`listening at ${PORT}`)))
    .catch(() => console.log(`data not sent from the cloud`));
mongoose.set('useFindAndModify', false);
//# sourceMappingURL=index.js.map