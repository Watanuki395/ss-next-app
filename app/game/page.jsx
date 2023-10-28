"use client";
import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import QRCode from "react-qr-code";
import Link from "next/link";

import dayjs from "dayjs";
import "dayjs/locale/es";
import { esES } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import { useAuth } from "../context/AuthContext";
import { saveData } from "../firebase/api";
import { Timestamp } from "firebase/firestore";

import { CustumAlert } from "@/components/CustumAlert/CustumAlert";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { DashboardHeader, StyledContainer } from "./styles";

const today = dayjs();

function GamePage() {
  const collectionName = "games";

  const { user, setLoading, loading } = useAuth();

  const [notify, setNotify] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  const QRpath = process.env.QR_ROUTE;
  const [QRvalue, setQRvalue] = useState(QRpath);
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const btnId = copied ? "simple-popover" : undefined;

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
    gameName: "",
    gameDescription: "",
    dateOfGame: today,
    gameAmount: 0,
  };

  function generateUniqueGameID(uid) {
    // Genera un número de 6 dígitos basado en la fecha actual
    const currentDate = new Date();
    const randomDigits = currentDate.getMilliseconds().toString();

    // creamos el uid
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );

    // Combina los dígitos y las letras
    const randomCode = uuid.substring(0, 6).toUpperCase() + "-" + randomDigits;

    return randomCode;
  }

  const handleSubmit = async (vals) => {
    try {
      const dayOfGifs = Timestamp.fromDate(vals.dateOfGame.toDate());
      const gameID = generateUniqueGameID(user.uid);
      const data = {
        gameName: vals.gameName,
        gameDescription: vals.gameDescription,
        dateOfGame: dayOfGifs,
        gameAmount: vals.gameAmount,
        gameActive: null,
        gameId: gameID,
      };
      if (data && user.uid && collectionName) {
        setLoading(true);
        await saveData(collectionName, null, data, user.uid)
          .then((result) => {
            if (result.success) {
              console.log(result);
              setQRvalue(QRpath + result.gameId);
              console.log(QRpath + result.gameId);
              setNotify({
                isOpen: true,
                type: "success",
                title: "El juego se inicio con exito!!",
                message: "El juego esta listo para comenzar",
              });
            } else {
              setNotify({
                isOpen: true,
                type: "error",
                title: "Error",
                message: "No se pudo crear el juego, intentalo mas tarde",
              });
            }
            setLoading(false);
            setCreated(true);
          })
          .catch((error) => {
            console.log(error);
            setNotify({
              isOpen: true,
              type: "error",
              title: "Error",
              message: "No se pudo crear el juego, intentalo mas tarde",
            });
            setLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
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
        {!created && !loading ? (
          <Grid>
            <Box
              display={!created && !loading ? "block" : "none"}
              align={"center"}
            >
              <StyledContainer>
                <Typography variant="h4" align={"center"} marginBottom={4}>
                  Creacion de juego nuevo
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
                              defaultValue={today}
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
                        Crear
                      </Button>
                    </Form>
                  )}
                </Formik>
              </StyledContainer>
            </Box>
          </Grid>
        ) : (
          <Grid paddingBottom={"2rem"}>
            <Box
              display={created && !loading ? "block" : "none"}
              align={"center"}
            >
              <StyledContainer>
                <Typography variant="h2" align={"center"} m={2}>
                  Tu juego se a creado
                </Typography>
                <Typography variant="body1" align={"center"} paddingBottom={6}>
                  Tus amigos pueden escanear el codigo QR para participar del
                  juego
                </Typography>

                <QRCode
                  size={256}
                  style={{
                    height: "auto",
                    maxWidth: "250px",
                    width: "250px",
                  }}
                  value={QRvalue}
                  bgColor={"rgb(20,20,20)"}
                  fgColor={"#3f51b5"}
                  viewBox={`0 0 256 256`}
                />

                <Typography
                  variant="body1"
                  align={"center"}
                  marginBottom={4}
                  marginTop={4}
                >
                  O puedes compartir el siguiente link...
                </Typography>
                <Button
                  aria-describedby={btnId}
                  components={"button"}
                  variant="outlined"
                  endIcon={copied ? <DoneAllIcon /> : <ContentCopyIcon />}
                  color={copied ? "success" : "secondary"}
                  onClick={(e) => {
                    setCopied(true);
                    setAnchorEl(e.currentTarget);
                  }}
                >
                  {QRvalue}
                </Button>
                <Popover
                  id={btnId}
                  open={copied}
                  anchorEl={anchorEl}
                  onClose={() => {
                    setCopied(false);
                    setAnchorEl(null);
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>Copiado!.</Typography>
                </Popover>
              </StyledContainer>
            </Box>
          </Grid>
        )}

        <CustumAlert notify={notify} setNotify={setNotify} />
      </Container>
    </ProtectedRoute>
  );
}

export default GamePage;
