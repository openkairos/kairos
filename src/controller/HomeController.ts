import { type HttpScope, Route } from '@koala-ts/framework';

export class HomeController {
  @Route({ method: 'GET', path: '/' })
  index(scope: HttpScope): void {
    scope.response.body = 'KoalaTS: Effortlessly elegant, relentlessly efficient. 🎩🐨';
  }
}
