import { createMapSuccessToHttp } from '@/app/shared/adapter/http/map-success-to-http';
import { normalize } from '@/composition/http/normalization';

export const mapSuccessToHttp = createMapSuccessToHttp({ normalize });
