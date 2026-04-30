import { Get } from '@koala-ts/framework/routing';
import { homeHandler } from '@/app/home/interface/http/home-handler';

export const homeRoute = Get('/', 'home', homeHandler);
