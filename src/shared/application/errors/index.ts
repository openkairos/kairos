import createHttpError from 'http-errors';

export type HttpErrorFactory = typeof createHttpError;
export { createHttpError };
