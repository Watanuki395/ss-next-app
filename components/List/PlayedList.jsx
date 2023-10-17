"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomModal from "../Modal/CustomModal";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";

import {
  getAllDocsWhereUserId,
  deleteDocFromCollectionById,
} from "../../app/firebase/api";

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
  const [modalAction, setOpenDeleteModal] = useState({
    id: "",
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchGamesList();
  }, []);

  const fetchGamesList = async () => {
    if (!secretList) {
      await getAllDocsWhereUserId("games", user.uid).then((response) => {
        setSecretList(response.data);
        console.log(response.data);
      });
    }
  };

  const handleGameMenuClick = () => {
    setOpenDeleteModal({
      isOpen: true,
      type: "success",
      title: "Registro Exitoso",
      message: "¡Te has registrado con éxito!",
    });
  };

  const handleDeleteBtnClick = (id) => {
    setOpenDeleteModal({
      id: id,
      isOpen: true,
      title: "Cuidado!!!",
      message: "¿Quieres borrar el juego?, esto sera permanente",
    });
  };

  const handleDeleteInModal = async (idToDelete) => {
    try {
      await deleteDocFromCollectionById("games", idToDelete);
      console.log("id borrado: " + idToDelete);
      const updatedList = secretList.filter((item) => item.id !== idToDelete);
      setSecretList(updatedList);
      setNotify({
        isOpen: true,
        type: "success",
        title: "El juego elimino exito!!",
        message: "El juego fue eliminado de la lista",
      });
    } catch (error) {
      console.error("Error al borrar el elemento: ", error);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {secretList && secretList.length ? (
        <List>
          {secretList.map((item, i) => (
            <Paper elevation={1} key={i}>
              <StyledListItem key={i}>
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
                      item.data.gameActive === true ? "Activo" : "Finalizado"
                    }
                    color={
                      item.data.gameActive === true ? "success" : "default"
                    }
                    variant="filled"
                    sx={{ width: "max-content" }}
                  />
                </StyledListSection>

                <StyledFabSection>
                  <Fab
                    id="gameDeleteBtn"
                    key={item.id}
                    color="error"
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      handleDeleteBtnClick(item.id);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </Fab>
                  <Fab
                    id="gameOptionsBtn"
                    color="primary"
                    aria-label="edit"
                    size="small"
                    onClick={handleGameMenuClick}
                  >
                    <EditIcon />
                  </Fab>
                </StyledFabSection>
              </StyledListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography variant="body1">
          "Todavía no existen juegos en los que estés participando. \(^o^)/ "
        </Typography>
      )}
      <CustomModal
        modalAction={modalAction}
        setOpen={setOpenDeleteModal}
        onDelete={handleDeleteInModal}
      />
      <CustumAlert notify={notify} setNotify={setNotify} />
    </Box>
  );
}

export default PlayedList;
