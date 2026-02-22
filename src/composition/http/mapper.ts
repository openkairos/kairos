import { createLoginHttpMapper } from '@/app/authentication/adapter/login-http-mapper';
import { createMapSuccessToHttp } from '@/app/shared/adapter/http/map-success-to-http';
import { normalize } from '@/composition/http/normalization';

export const mapSuccessToHttp = createMapSuccessToHttp({ normalize });

export const loginHttpMapper = createLoginHttpMapper({ mapSuccessToHttp });
