"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";

import PasswordField from "@/components/PasswordField/PasswordField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { StyledContainer, StyledLinks, StyledLink } from "./styles";

import { useAuth } from "../context/AuthContext";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  password2: "",
};

const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .min(5, `Mínimo 5 caracteres`)
    .max(25, `Máximo 25 caracteres`)
    .required("Campo Requerido"),
  lname: Yup.string()
    .min(5, `Mínimo 5 caracteres`)
    .max(25, `Máximo 25 caracteres`)
    .required("Campo Requerido"),
  email: Yup.string()
    .required("Campo Requerido")
    .email("Correo Electrónico Inválido")
    .max(255, `Máximo 255 caracteres`),
  password: Yup.string()
    .required("Campo Requerido")
    .min(8, `Mínimo 8 caracteres`),
  password2: Yup.string()
    .required("Campo Requerido")
    .min(8, `Mínimo  8 caracteres`)
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales"),
});

const RegisterPage = () => {
  const router = useRouter();
  const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
  const ERROR_MSG_ACCOUNT_EXISTS = `
    Una cuenta con este correo electronico ya existe.
  `;
  const { signup, loading, setLoading } = useAuth();

  const [notify, setNotify] = useState({
    isOpen: false, // Indica si la alerta está abierta o cerrada
    type: "success", // Tipo de alerta: "success", "error", "info", etc.
    title: "", // Título de la alerta
    message: "", // Mensaje de la alerta
  });

  const handleSubmit = async (vals) => {
    const data = {
      fname: vals.fname,
      lname: vals.lname,
      email: vals.email,
      games:[]
    };
    try {
      if (vals.email && vals.password) {
        setLoading(true);
        await signup(vals.email, vals.password, data)
          .then(() => {
            router.push("/dashboard");
            setNotify({
              isOpen: true,
              type: "success",
              title: "Registro Exitoso",
              message: "¡Te has registrado con éxito!",
            });
          })
          .catch((error) => {
            if ((error.code = ERROR_CODE_ACCOUNT_EXISTS)) {
              setNotify({
                isOpen: true,
                type: "error",
                title: "ohh oh, algo paso durante el registro",
                message: ERROR_MSG_ACCOUNT_EXISTS,
              });
            }
          });
      }
    } catch (error) {
      setNotify({
        isOpen: true,
        type: "error",
        title: "ohh oh, algo paso durante el registro",
        message: "ERROR: error inesperado durante el registro.",
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
                Registro
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="fname"
                    fullWidth
                    label="Nombre"
                    as={TextField}
                    error={Boolean(errors.fname) && Boolean(touched.fname)}
                    helperText={Boolean(touched.fname) && errors.fname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="lname"
                    fullWidth
                    label="Apellidos"
                    as={TextField}
                    error={Boolean(errors.lname) && Boolean(touched.lname)}
                    helperText={Boolean(touched.lname) && errors.lname}
                  />
                </Grid>
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
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="password2"
                    label="Confirme la Contraseña"
                    as={PasswordField}
                    error={
                      Boolean(errors.password2) && Boolean(touched.password2)
                    }
                    helperText={Boolean(touched.password2) && errors.password2}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                disabled={isSubmitting ? true : false}
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>

              <StyledLinks>
                <Link href={"/login"}>
                  <StyledLink>
                    ¿Ya tienes una cuenta?, Iniciar Sesión
                  </StyledLink>
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

export default RegisterPage;
