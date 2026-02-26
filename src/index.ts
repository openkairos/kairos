import '@/bootstrap';
import { create } from '@koala-ts/framework';
import { appConfig, server } from './config';
import { appLogger } from '@/composition/shared/observability/logger';

const app = create(appConfig);

app.listen(server.port);

appLogger.info(`Server is running on http://localhost:${server.port}`);
