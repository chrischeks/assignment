import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '/@universal/configs');

import 'dotenv/config';
import App from '@/app';
import TransferRoute from './transfer/transfer.route';

const app = new App([new TransferRoute()]);

app.listen();
