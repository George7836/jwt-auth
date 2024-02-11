import { observer } from "mobx-react-lite";
import { useCallback, useContext, useState } from "react";
import { InferType, object, string } from "yup";
import { Context } from "..";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, Typography, styled } from "@mui/material";
import PasswordTextField from "./PasswordTextField";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../errors/errors";
import EmailTextField from "./EmailTextField";
import FormContainer from "./FormContainer";

const LoginFormSchema = object({
  email: string().required("email is required").email().max(250).default(""),
  password: string().required("password is required"),
});

type LoginFormValues = InferType<typeof LoginFormSchema>;

function LoginForm() {
  const [systemErrorMessage, setSystemErrorMessage] = useState<string>();
  const navigate = useNavigate();

  const { store } = useContext(Context);

  const validation = useForm<LoginFormValues>({
    mode: "onBlur",
    resolver: yupResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = validation;

  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(
    async (formData) => {
      try {
        await store.login(formData.email, formData.password);
        navigate("/");
      } catch (e) {
        setSystemErrorMessage(getErrorMessage(e));
      }
    },
    []
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      marginTop={4}
      alignItems="center"
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
        <HowToRegIcon />
      </Avatar>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...validation}>
          <EmailTextField name="email" />
          <PasswordTextField name="password" label="Password" />
          <ButtonsContainer>
            <Button
              variant="contained"
              disabled={!isValid}
              type="submit"
              fullWidth
            >
              Sign in
            </Button>
            <StyledLink to="/registration">
              <Typography color="primary" marginTop={1}>
                I don't have an account
              </Typography>
            </StyledLink>
            {systemErrorMessage && (
              <Typography variant="caption" color="error">
                {systemErrorMessage}
              </Typography>
            )}
          </ButtonsContainer>
        </FormProvider>
      </FormContainer>
    </Box>
  );
}

export default observer(LoginForm);

const ButtonsContainer = styled(Box)`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
