import * as bcrypt from 'bcrypt';

export const hashData = (input: string): Promise<string> =>
  bcrypt.hash(input, 10);
