"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { StyledContainer, StyledLinks, StyledLink } from "./styles";
import PasswordField from "@/components/PasswordField/PasswordField";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const LoginPage = () => {
  const router = useRouter();
  const ERROR_CODE_WRONG_PASS = "auth/wrong-password";
  const ERROR_MSG_WRONG_PASS = `Usuario y/o contraseña no validos`;
  const { login, loading, setLoading } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Campo Requerido")
      .email("Correo Electrónico Inválido")
      .max(255, `Máximo 255 caracteres`),
    password: Yup.string()
      .required("Campo Requerido")
      .min(8, `Mínimo 8 caracteres`),
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const handleSubmit = async (vals) => {
    try {
      if (vals.email && vals.password) {
        setLoading(true);
        await login(vals.email, vals.password)
          .then(() => {
            setNotify({
              isOpen: true,
              type: "success",
              title: "Registro Exitoso",
              message: "¡Te has registrado con éxito!",
            });
            router.push("/dashboard");
          })
          .catch((error) => {
            console.log(error);
            if ((error.code = ERROR_CODE_WRONG_PASS)) {
              setNotify({
                isOpen: true,
                type: "error",
                title: "ohh oh, algo paso durante el inicio de sesion",
                message: ERROR_MSG_WRONG_PASS,
              });
            }
          });
      }
    } catch (err) {
      setNotify({
        isOpen: true,
        type: "error",
        title: "ohh oh, algo paso durante el inicio de sesion",
        message: err,
      });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 300ms ease-in",
      }}
    >
      <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <StyledContainer>
              <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h2" align="center" gutterBottom>
                Iniciar Sesión
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="email"
                    label="Correo Electronico"
                    type="email"
                    as={TextField}
                    error={Boolean(errors.email) && Boolean(touched.email)}
                    helperText={Boolean(touched.email) && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="password"
                    label="Contraseña"
                    as={PasswordField}
                    error={
                      Boolean(errors.password) && Boolean(touched.password)
                    }
                    helperText={Boolean(touched.password) && errors.password}
                  />
                </Grid>
              </Grid>
              <Link href={"/forgot"}>
                <StyledLink>Olvidé mi Contraseña</StyledLink>
              </Link>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>

              <StyledLinks>
                <Link href={"/register"}>
                  <StyledLink>¿No tienes una cuenta?, Regístrate</StyledLink>
                </Link>
              </StyledLinks>
            </StyledContainer>
          </Form>
        )}
      </Formik>
      <CustumAlert notify={notify} setNotify={setNotify} />
    </Container>
  );
};

export default LoginPage;
