import { createLoginHttpMapper } from '@/app/authentication/adapter/login-http-mapper';
import { mapSuccessToHttp } from '@/composition/http/mapper';

export const loginHttpMapper = createLoginHttpMapper({ mapSuccessToHttp });
