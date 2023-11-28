'use client'
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
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import UserList from "@/components/List/UserList";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  DashboardHeader,
  StyledContainer,
  StyledGridContainer,
} from "../styles";

import {
  getDocWhereGameId,
  updateGameById,
  removeParticipantFromGame,
} from "../../firebase/api";

const today = dayjs();

export default function GameEdit({ params }) {
  const router = useRouter();
  const collectionName = "games";
  const {gameId} = params;

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [gameInfo, setGameInfo] = useState();
  const [selected, setSelected] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  useEffect(() => {
    const unsubscribe =  getDocWhereGameId(
      "games",
      gameId,
      (response) => {
          setSelected(response?.data?.gameActive);
          setGameInfo(response);
      }
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [gameId]);

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
    gameName: gameInfo?.data?.gameName,
    gameDescription: gameInfo?.data.gameDescription,
    dateOfGame: dayjs(gameInfo?.data.dateOfGame?.toDate()),
    gameAmount: gameInfo?.data.gameAmount,
    gameActive: gameInfo?.data.gameActive,
  };

  const handleSubmit = async (vals) => {
    try {
      const dayOfGifs = Timestamp.fromDate(vals.dateOfGame.toDate());
      const data = {
        gameName: vals.gameName,
        gameDescription: vals.gameDescription,
        dateOfGame: dayOfGifs,
        gameAmount: vals.gameAmount,
        gameActive: selected !== undefined ? selected : false,
      };
      if (data && user.uid && collectionName) {
        setLoading(true);
        await updateGameById(collectionName, gameId, data)
          .then((result) => {
            if (result.success) {
              //console.log(result);
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
            //console.log(error);
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
      //console.log(error);
    }
  };

  const handleRemoveUserClick = async () => {
    await removeParticipantFromGame(gameId, user.uid)
      .then((response) => {
        if (response.success) {
          //console.log(response.message);
          router.push("/dashboard");
        } else {
          /// TODO
          //console.log(response.message);
        }
      })
      .catch((error) => {
        //console.log(error);
      });
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
              >
                <Link href={"/dashboard"}>
                  <Fab variant="extended" color="primary" aria-label="crear">
                    <ArrowBackIcon sx={{ mr: 1 }} />
                    Regresar
                  </Fab>
                </Link>
              </Box>
            </div>
            <div>
              {gameInfo.data.createdBy === user.uid ? null : (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: {
                      xs: "none",
                      md: "flex",
                    },
                  }}
                >
                  <Fab
                    variant="extended"
                    color="warning"
                    aria-label="crear"
                    onClick={handleRemoveUserClick}
                  >
                    Dejar el juego
                    <PersonRemoveIcon sx={{ ml: 1 }} />
                  </Fab>
                </Box>
              )}
            </div>
          </DashboardHeader>
          <StyledGridContainer>
            <Box display={"block"} align={"center"}>
              <StyledContainer>
                <Typography variant="h4" align={"center"} marginBottom={4}>
                  {gameInfo.data.createdBy === user.uid
                    ? "Edición de juego"
                    : "Información del juego"}
                </Typography>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    await handleSubmit(values);
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
                            disabled={
                              gameInfo.data.createdBy !== user.uid
                                ? true
                                : false
                            }
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
                            disabled={
                              gameInfo.data.createdBy !== user.uid
                                ? true
                                : false
                            }
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
                              disabled={
                                gameInfo.data.createdBy !== user.uid
                                  ? true
                                  : false
                              }
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
                                  ₡
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
                            disabled={
                              gameInfo.data.createdBy !== user.uid
                                ? true
                                : false
                            }
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="h6" mb={1}>
                            Estado del juego
                          </Typography>
                          <ToggleButton
                            value="check"
                            name="gameActive"
                            fullWidth
                            selected={
                              selected !== undefined
                                ? selected
                                : gameInfo.data.gameActive
                            }
                            color={"success"}
                            disabled={
                              gameInfo.data.createdBy !== user.uid
                                ? true
                                : false
                            }
                            onChange={() => {
                              setSelected(!selected);
                            }}
                          >
                            {selected === true ? "Activo" : "Inactivo"}
                          </ToggleButton>
                        </Grid>
                      </Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        disabled={
                          gameInfo.data.createdBy !== user.uid ? true : false
                        }
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Actualizar
                      </Button>
                    </Form>
                  )}
                </Formik>
              </StyledContainer>
            </Box>
            <Box display={"block"} align={"center"}>
              <StyledContainer>
                <Typography variant="h6" align={"center"} marginBottom={4}>
                  Participantes
                </Typography>
                {gameInfo?.data.players ? (
                  <UserList userlist={gameInfo.data.players}></UserList>
                ) : null}
              </StyledContainer>
            </Box>
          </StyledGridContainer>
          <CustumAlert notify={notify} setNotify={setNotify} />
        </Container>
      ) : null}
    </ProtectedRoute>
  );
}

;
