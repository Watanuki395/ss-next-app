"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomModal from "../Modal/CustomModal";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";

import { deleteGameWithUserUpdates } from "../../app/supabase/api";

import { useAuth } from "../../app/context/AuthContextSupabase";

import {
  StyledListItem,
  StyledListSection,
  StyledImage,
  StyledFabSection,
  StyledContainer,
} from "./styles";

function PlayedList({ gameList, totalGameNum }) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [secretList, setSecretList] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      setSecretList(gameList);
      totalGameNum(gameList?.length ? gameList.length : 0);
    }

    return () => {
      isCancelled = true;
    };
  }, [gameList]);

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

  const handleGameMenuClick = (id) => {
    router.push(`/game/${id}`);
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
      setLoading(true);
      await deleteGameWithUserUpdates(user.uid, idToDelete).then((response) => {
        if (response.success) {
          setLoading(false);
          setNotify({
            isOpen: true,
            type: "success",
            title: "El juego elimino exito!!",
            message: "El juego fue eliminado de la lista",
          });
          //console.log("id borrado: " + idToDelete);
          const updatedList = secretList.filter(
            (item) => item.id !== idToDelete
          );
          setSecretList(updatedList);
          totalGameNum(updatedList.length);
        }
      });
    } catch (error) {
      console.error("Error al borrar el elemento: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      {secretList && secretList.length ? (
        <StyledContainer>
          <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
          <Typography variant={"h6"}>
            Juegos en los que estoy participando
          </Typography>
          <List>
            {secretList.map((item, i) => (
              <Paper elevation={1} key={i}>
                <StyledListItem key={i}>
                  <StyledImage src="./rule4.png" alt="Imagen del juego" />
                  <StyledListSection>
                    <Typography variant="h6">{item?.gameName}</Typography>
                    <Typography variant="body1">ID: {item?.gameId}</Typography>
                    <Typography variant="body1">
                      Juego:
                      {item?.createdBy === user.uid ? "Propio" : "Participante"}
                    </Typography>
                    <Typography variant="body2">
                      {item?.gameDescription}
                    </Typography>
                    <Chip
                      size="small"
                      label={
                        item?.gameActive === true
                          ? "Activo"
                          : item?.gameActive === false
                          ? "Inactivo"
                          : "No inciado"
                      }
                      color={
                        item?.gameActive === true
                          ? "success"
                          : item?.gameActive === false
                          ? "default"
                          : "warning"
                      }
                      variant="filled"
                      sx={{ width: "max-content", marginTop: "0.6rem" }}
                      aria-label="estado del juego"
                    />
                  </StyledListSection>

                  <StyledFabSection>
                    {item?.createdBy === user.uid ? (
                      <Fab
                        id="gameDeleteBtn"
                        key={item?.id}
                        color="error"
                        aria-label="delete"
                        size="small"
                        disabled={loading ? true : false}
                        onClick={() => {
                          handleDeleteBtnClick(item.id);
                        }}
                      >
                        <DeleteOutlineIcon />
                      </Fab>
                    ) : null}

                    <Fab
                      id="gameOptionsBtn"
                      color="primary"
                      aria-label="edit"
                      disabled={loading ? true : false}
                      size="small"
                      onClick={() => {
                        handleGameMenuClick(item.id);
                      }}
                    >
                      {item?.createdBy === user.uid ? (
                        <EditIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Fab>
                  </StyledFabSection>
                </StyledListItem>
              </Paper>
            ))}
          </List>

          <CustomModal
            modalAction={modalAction}
            setOpen={setOpenDeleteModal}
            onDelete={handleDeleteInModal}
          />
        </StyledContainer>
      ) : null}
      <CustumAlert notify={notify} setNotify={setNotify} />
    </>
  );
}

export default PlayedList;
