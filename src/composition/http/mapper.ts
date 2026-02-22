import { createMapSuccessToHttp, type NormalizeValue } from '@/app/shared/adapter/http/map-success-to-http';
import { normalize } from '@/composition/http/normalization';

const normalizeValue: NormalizeValue = (value, options) => normalize(value, options as Parameters<typeof normalize>[1]);

export const mapSuccessToHttp = createMapSuccessToHttp({ normalize: normalizeValue });
