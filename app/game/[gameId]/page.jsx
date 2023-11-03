"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";

import dayjs from "dayjs";
import "dayjs/locale/es";
import { esES } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import { useAuth } from "../../context/AuthContext";
import { Timestamp } from "firebase/firestore";

import { CustumAlert } from "@/components/CustumAlert/CustumAlert";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { DashboardHeader, StyledContainer } from "../styles";

import { getDocWhereGameId, updateGameById } from "../../firebase/api";

const today = dayjs();

function page({ params }) {
  const collectionName = "games";

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [gameInfo, setGameInfo] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  const [selected, setSelected] = React.useState(false);

  useEffect(() => {
    let isCancelled = false;

    getDocWhereGameId("games", params.gameId).then((response) => {
      if (!isCancelled) {
        setGameInfo(response.data);
        setSelected(response.data.gameActive);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const validationSchema = Yup.object().shape({
    gameName: Yup.string()
      .required(
        "Es necesario poner un nombre al juego para que lo puedas identificar"
      )
      .max(255, `Máximo 255 caracteres`)
      .min(5, `Mínimo 5 caracteres`),
    gameDescription: Yup.string().max(255, `Máximo 255 caracteres`),
    dateOfGame: Yup.date().required(
      "Es necesario establecer una fecha para el intercambio"
    ),
    gameAmount: Yup.number()
      .positive()
      .integer()
      .required("El monton es requerido")
      .min(1, "debe tener un valor moyor a 0")
      .max(1000000, "Es mucho dinero para un regalo"),
  });

  const initialValues = {
    gameName: gameInfo?.gameName,
    gameDescription: gameInfo?.gameDescription,
    dateOfGame: dayjs(gameInfo?.dateOfGame?.toDate()),
    gameAmount: gameInfo?.gameAmount,
    gameActive: gameInfo?.gameActive,
  };

  const handleSubmit = async (vals) => {
    try {
      const dayOfGifs = Timestamp.fromDate(vals.dateOfGame.toDate());
      const data = {
        gameName: vals.gameName,
        gameDescription: vals.gameDescription,
        dateOfGame: dayOfGifs,
        gameAmount: vals.gameAmount,
        gameActive: selected,
      };
      if (data && user.uid && collectionName) {
        setLoading(true);
        await updateGameById(collectionName, params.gameId, data)
          .then((result) => {
            if (result.success) {
              console.log(result);
              setNotify({
                isOpen: true,
                type: "success",
                title: "El juego se actualizó con exito!!",
                message: "El juego esta listo para comenzar",
              });
              setLoading(false);
            } else {
              setNotify({
                isOpen: true,
                type: "error",
                title: "Error",
                message: "No se pudo actualizar el juego, intentalo mas tarde",
              });
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setNotify({
              isOpen: true,
              type: "error",
              title: "Error",
              message: "No se pudo actualizar el juego, intentalo mas tarde",
            });
            setLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProtectedRoute>
      <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
      {gameInfo ? (
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
                <Typography variant="h4" align={"center"} marginBottom={4}>
                  Edicion de juego
                </Typography>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);
                    //resetForm();
                  }}
                >
                  {({
                    errors,
                    touched,
                    isSubmitting,
                    values,
                    setFieldValue,
                  }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <ToggleButton
                            value="check"
                            name="gameActive"
                            fullWidth
                            selected={selected}
                            color={"success"}
                            onChange={() => {
                              setSelected(!selected);
                            }}
                          >
                            {selected === true
                              ? "El juego está activo"
                              : selected === false
                              ? "El juego está finalizado"
                              : "El juego no ha iniciado"}
                          </ToggleButton>
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            name="gameName"
                            fullWidth
                            label="Nombre del juego"
                            as={TextField}
                            error={
                              Boolean(errors.gameName) &&
                              Boolean(touched.gameName)
                            }
                            helperText={
                              Boolean(touched.gameName) && errors.gameName
                            }
                            disabled={isSubmitting}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            name="gameDescription"
                            fullWidth
                            label="Descripcion del juego (opcional)"
                            as={TextField}
                            error={
                              Boolean(errors.gameDescription) &&
                              Boolean(touched.gameDescription)
                            }
                            helperText={
                              Boolean(touched.gameDescription) &&
                              errors.gameDescription
                            }
                            disabled={isSubmitting}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="es"
                            localeText={
                              esES.components.MuiLocalizationProvider
                                .defaultProps.localeText
                            }
                          >
                            <DateTimePicker
                              label="Fecha del gran dia"
                              ampm={true}
                              disablePast
                              viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                              }}
                              value={
                                values.dateOfGame ? values.dateOfGame : today
                              }
                              onChange={(value) =>
                                setFieldValue("dateOfGame", value, true)
                              }
                              slotProps={{
                                textField: {
                                  name: "dateOfGame",
                                  fullWidth: true,
                                  error:
                                    Boolean(errors.dateOfGame) &&
                                    Boolean(touched.dateOfGame),
                                  helperText:
                                    Boolean(touched.dateOfGame) &&
                                    errors.dateOfGame,
                                },
                                actionBar: {
                                  actions: ["today", "cancel", "accept"],
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            name="gameAmount"
                            fullWidth
                            type="number"
                            label="Costo aproximado del regalo"
                            as={TextField}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            error={
                              Boolean(errors.gameAmount) &&
                              Boolean(touched.gameAmount)
                            }
                            helperText={
                              Boolean(touched.gameAmount) && errors.gameAmount
                            }
                            disabled={isSubmitting}
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
                        Actualizar
                      </Button>
                    </Form>
                  )}
                </Formik>
              </StyledContainer>
            </Box>
          </Grid>
          <CustumAlert notify={notify} setNotify={setNotify} />
        </Container>
      ) : null}
    </ProtectedRoute>
  );
}

export default page;