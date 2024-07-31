import * as bcrypt from 'bcrypt';

export const hashData = (input: string): Promise<string> =>
  bcrypt.hash(input, 10);

export const getRandomString = (): string =>
  Math.random().toString(36).substring(2, 7);
