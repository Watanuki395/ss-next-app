"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomModal from "../Modal/CustomModal";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { getAllDocsWhereUserId } from "../../app/firebase/api";
import { useAuth } from "../../app/context/AuthContext";

import {
  StyledListItem,
  StyledListSection,
  StyledImage,
  StyledFabSection,
} from "./styles";

function PlayedList() {
  const { user, loading, userInfo } = useAuth();
  const [secretList, setSecretList] = useState();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [notify, setOpenDeleteModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });
  const open = Boolean(anchorElUser);

  const settings = [
    {
      label: "Ver más",
      icon: <AccountCircleRoundedIcon />,
      action: () => handleProfile(),
    },
    {
      label: "Configuración",
      icon: <Settings />,
      action: () => handleAccount(),
    },
    {
      label: "Eliminar partida",
      icon: <Logout />,
      action: () => handleLogout(),
    },
  ];

  useEffect(() => {
    const fetchGamesList = async () => {
      if (!secretList) {
        await getAllDocsWhereUserId("games", user.uid).then((response) => {
          setSecretList(response.data);
          console.log(response.data);
        });
      }
    };

    fetchGamesList();
  }, []);

  const handleGameMenuClick = (event) => {
    setOpenDeleteModal({
      isOpen: true,
      type: "success",
      title: "Registro Exitoso",
      message: "¡Te has registrado con éxito!",
    });
  };

  const handleDeleteBtnClick = (event) => {
    setOpenDeleteModal({
      isOpen: true,
      title: "Cuidado!!!",
      message: "¿Quieres borrar el juego?, esto sera permanente",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List>
        {secretList
          ? secretList.map((item, i) => (
              <Paper elevation={1} key={i}>
                <StyledListItem key={i}>
                  <Grid container>
                    <StyledImage src="./rule4.png" alt="Imagen del juego" />
                    <StyledListSection>
                      <Typography variant="h6">{item.data.gameName}</Typography>
                      <Typography variant="body1">
                        Estimado: $ {item.data.gameAmount}
                      </Typography>
                      <Typography variant="body2">
                        {item.data.gameDescription}
                      </Typography>
                      <Chip
                        size="small"
                        label={
                          item.data.gameActive === true
                            ? "Activo"
                            : "Finalizado"
                        }
                        color={
                          item.data.gameActive === true ? "success" : "default"
                        }
                        variant="filled"
                        sx={{ width: "max-content" }}
                      />
                    </StyledListSection>
                  </Grid>
                  <StyledFabSection>
                    <Fab
                      id="gameOptionsBtn"
                      color="primary"
                      aria-label="edit"
                      size="small"
                      aria-controls={open ? "game-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleGameMenuClick}
                    >
                      <AddIcon />
                    </Fab>
                    <Fab
                      id="gameDeleteBtn"
                      color="secondary"
                      aria-label="delete"
                      size="small"
                      onClick={handleDeleteBtnClick}
                    >
                      <DeleteOutlineIcon />
                    </Fab>
                  </StyledFabSection>
                </StyledListItem>
              </Paper>
            ))
          : null}
      </List>
      <CustomModal notify={notify} setOpen={setOpenDeleteModal} />
    </Box>
  );
}

export default PlayedList;
