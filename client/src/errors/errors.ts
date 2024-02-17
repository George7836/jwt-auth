import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  errors: unknown[];
}

export const getErrorMessage = (err: any): string => {
  return (
    (err as AxiosError<ErrorResponse>).response?.data.message ??
    (err as AxiosError | undefined)?.message ??
    (err as Error | undefined)?.message ??
    err ??
    "Неизвестная ошибка"
  );
};
