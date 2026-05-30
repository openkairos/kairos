import { type HttpScope } from '@koala-ts/framework';

export async function homeHandler(scope: HttpScope): Promise<void> {
  scope.response.body = 'Kairos: The right moment for customer data.';
}
