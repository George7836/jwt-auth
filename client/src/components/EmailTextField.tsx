import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type EmailTextFieldProps = {
  name: string;
};

export default function EmailTextField({ name }: EmailTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={error?.message}
          required
          label="Email"
          type="email"
          size="small"
        />
      )}
    />
  );
}
