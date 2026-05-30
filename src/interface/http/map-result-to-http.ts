import { normalize } from '@/framework/http/normalizer';
import { createResultToHttpMapper } from '@/interface/http/result-to-http';

export const mapResultToHttp = createResultToHttpMapper({ normalize: normalize });
