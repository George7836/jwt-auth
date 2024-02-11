import { Box, SxProps, Theme } from "@mui/material";
import { DOMAttributes, FC } from "react";

type FormContainerProps = {
  sx?: SxProps<Theme>;
  className?: string;
} & DOMAttributes<HTMLFormElement>;

const FormContainer: FC<FormContainerProps> = ({
  sx,
  className,
  children,
  ...formAttributes
}) => {
  return (
    <Box
      component="form"
      noValidate
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      marginTop={1}
      className={className}
      sx={sx}
      {...formAttributes}
    >
      {children}
    </Box>
  );
};

export default FormContainer;
