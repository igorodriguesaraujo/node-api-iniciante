import 'dotenv/config';
import { app } from './app';

app.listen({
  port: Number(process.env.PORT) || 3333
}).then(() => console.log('Server running http:localhost:' + process.env.PORT + '/api/v1'))