import { ValidationError } from 'class-validator';

import { ExceptionMessage } from './types';

export const normalizeValidationErrors = (
  errors: ValidationError[],
): ExceptionMessage[] => {
  return errors.map((error) => ({
    fields: [error.property],
    payload: error.target,
    details: error.constraints,
  }));
};
