import { builtInConstraints, createValidator } from '@koala-ts/framework/validator';

export const validate = createValidator({ constraints: builtInConstraints });
