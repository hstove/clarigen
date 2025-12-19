import { formOptions } from '@tanstack/react-form';
import { type } from 'arktype';

export const depositFormOptions = formOptions({
  defaultValues: {
    amount: '',
    stacksAddress: '',
  },
  validators: {
    onChange: type({
      amount: 'string.numeric.parse',
      stacksAddress: 'string',
    }),
  },
});
