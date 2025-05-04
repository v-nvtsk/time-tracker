import { hashSync, genSaltSync, compareSync } from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (password: string) => {
  const salt = genSaltSync(saltRounds);
  const hash = hashSync(password, salt);
  return hash;
};

export const checkPassword = (
  enteredPassword: string,
  hashedPassword: string,
) => {
  const isMatch = compareSync(enteredPassword, hashedPassword);
  return isMatch;
};
