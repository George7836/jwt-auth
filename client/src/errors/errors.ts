import { AxiosError } from "axios";

export const getErrorMessage = (err: any): string => {
  return (
    (err as AxiosError | undefined)?.message ??
    (err as Error | undefined)?.message ??
    err ??
    "Неизвестная ошибка"
  );
};
