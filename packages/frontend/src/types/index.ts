export type ErrorState =
  | {
    isError: false;
    errorMessage: null
  }
  | {
    isError: true;
    errorMessage: string
  };