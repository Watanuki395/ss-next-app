"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import { useAuth } from "../context/AuthContext";
import { updateInfo } from "../firebase/api";

import { CustumAlert } from "@/components/CustumAlert/CustumAlert";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { DashboardHeader, StyledContainer } from "./styles";

function ProfilePage() {
  const collectionName = "users";

  // const stringToColor = (string) => {
  //   let hash = 0;
  //   let i;

  //   /* eslint-disable no-bitwise */
  //   for (i = 0; i < string.length; i += 1) {
  //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
  //   }

  //   let color = "#";

  //   for (i = 0; i < 3; i += 1) {
  //     const value = (hash >> (i * 8)) & 0xff;
  //     color += `00${value.toString(16)}`.slice(-2);
  //   }
  //   /* eslint-enable no-bitwise */

  //   return color;
  // };

  // const stringAvatar = (name) => {
  //   return {
  //     sx: {
  //       bgcolor: stringToColor(name),
  //     },
  //     children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  //   };
  // };

  const { user, userInfo } = useAuth();

  const [loading, setLoading] = useState();

  const [notify, setNotify] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  const validationSchema = Yup.object().shape({
    fname: Yup.string()
      .required("Campo Requerido")
      .max(255, `Máximo 255 caracteres`)
      .min(2, `Mínimo 2 caracteres`),
    lname: Yup.string()
      .required("Campo Requerido")
      .max(255, `Máximo 255 caracteres`)
      .min(2, `Mínimo 2 caracteres`),
    email: Yup.string()
      .email("Correo Electrónico Inválido")
      .required("Campo Requerido")
      .max(255, `Máximo 255 caracteres`)
      .min(5, `Mínimo 2 caracteres`),
  });

  const initialValues = {
    fname: userInfo?.fname,
    lname: userInfo?.lname,
    email: user?.email,
  };

  const handleSubmit = async (vals) => {
    if (vals && user.uid) {
      setLoading(true);
      await updateInfo(user.uid, collectionName, vals).then(() => {
        setNotify({
          isOpen: true,
          type: "success",
          title: "Actualización con Exito",
          message: "Los datos se actualizaron correctamente",
        });
      });
      setLoading(false);
    } else {
      setNotify({
        isOpen: true,
        type: "error",
        title: "Actualización con Fallida",
        message: "Los NO  datos se actualizaron correctamente",
      });
    }
  };

  return (
    <ProtectedRoute>
      <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
      <Container>
        <DashboardHeader>
          <div>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                padding: "1rem",
              }}
            >
              <Link href={"/dashboard"}>
                <Fab color="primary">
                  <ArrowBackIcon />
                </Fab>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link href={"/dashboard"}>
                <Fab variant="extended" color="primary" aria-label="crear">
                  <ArrowBackIcon sx={{ mr: 1 }} />
                  Regresar
                </Fab>
              </Link>
            </Box>
          </div>
          <div></div>
        </DashboardHeader>
        <Grid>
          <Box display={"block"} align={"center"}>
            <StyledContainer>
              <Typography variant={"h4"} align={"center"} marginTop={3}>
                Perfil de usuario
              </Typography>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  await handleSubmit(values);
                  //resetForm();
                }}
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form>
                    <StyledContainer>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            name="fname"
                            value={values.fname ? values.fname : ""}
                            fullWidth
                            label="Nombre"
                            as={TextField}
                            error={
                              Boolean(errors.fname) && Boolean(touched.fname)
                            }
                            helperText={Boolean(touched.fname) && errors.fname}
                            disabled={isSubmitting}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            name="lname"
                            value={values.lname ? values.lname : ""}
                            fullWidth
                            label="Apellidos"
                            as={TextField}
                            error={
                              Boolean(errors.lname) && Boolean(touched.lname)
                            }
                            helperText={Boolean(touched.lname) && errors.lname}
                            disabled={isSubmitting}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            name="email"
                            value={values.email ? values.email : ""}
                            disabled
                            label="Correo Electronico"
                            type="email"
                            as={TextField}
                            error={
                              Boolean(errors.email) && Boolean(touched.email)
                            }
                            helperText={Boolean(touched.email) && errors.email}
                          />
                        </Grid>
                        <Grid item xs={12}></Grid>
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
                        Actualizar
                      </Button>
                    </StyledContainer>
                  </Form>
                )}
              </Formik>
            </StyledContainer>
          </Box>
        </Grid>
        <CustumAlert notify={notify} setNotify={setNotify} />
      </Container>
    </ProtectedRoute>
  );
}

export default ProfilePage;
