import './config/boot';
import { create } from '@koala-ts/framework';
import { appConfig, server } from './config';
import { logger } from '@/shared/application/logging';

const app = create(appConfig);

app.listen(server.port);

logger.info(`Server is running on http://localhost:${server.port}`);
