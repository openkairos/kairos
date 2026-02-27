import { type HttpScope, Route } from '@koala-ts/framework';

export class HomeController {
  @Route({ method: 'GET', path: '/' })
  index(scope: HttpScope): void {
    scope.response.body = 'Kairos: The right moment for customer data.';
  }
}
