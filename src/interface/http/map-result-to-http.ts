import { normalize } from '@/framework/normalizer/normalize';
import { createResultToHttpMapper } from '@/interface/http/result-to-http';

export const mapResultToHttp = createResultToHttpMapper({ normalize: normalize });
