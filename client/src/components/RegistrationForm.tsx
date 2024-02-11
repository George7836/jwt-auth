import { useCallback, useContext, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { Avatar, Box, Button, Typography, styled } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { InferType, object, ref, string } from "yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordTextField from "./PasswordTextField";
import { getErrorMessage } from "../errors/errors";
import { Link, useNavigate } from "react-router-dom";
import EmailTextField from "./EmailTextField";
import FormContainer from "./FormContainer";

const RegistrationFormSchema = object({
  email: string().required("email is required").email().max(250).default(""),
  password: string().required("password is required"),
  confirmPassword: string()
    .oneOf([ref("password"), ""], "password must match")
    .required(),
});

type RegistrationFormValues = InferType<typeof RegistrationFormSchema>;

function RegistrationForm() {
  const [systemErrorMessage, setSystemErrorMessage] = useState<string>();
  const navigate = useNavigate();

  const { store } = useContext(Context);

  const validation = useForm<RegistrationFormValues>({
    mode: "onBlur",
    resolver: yupResolver(RegistrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = validation;

  const onSubmit: SubmitHandler<RegistrationFormValues> = useCallback(
    async (formValues) => {
      try {
        await store.registration(formValues.email, formValues.password);
        navigate("/");
      } catch (e) {
        setSystemErrorMessage(getErrorMessage(e));
      }
    },
    []
  );

  const onReset = useCallback(() => {
    reset();
  }, [reset]);

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
          <PasswordTextField name="confirmPassword" label="Confirm Password" />
          <ButtonsContainer>
            <Button
              variant="contained"
              disabled={!isValid}
              type="submit"
              fullWidth
            >
              Sign up
            </Button>
            <Button variant="outlined" onClick={onReset} fullWidth>
              Reset
            </Button>
            <StyledLink to="/login">
              <Typography color="primary" marginTop={1}>
                I already have an account
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

export default observer(RegistrationForm);

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
