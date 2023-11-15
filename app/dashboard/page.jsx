"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SummaryChart from "@/components/SummaryChart/SummaryChart";
import ActivityList from "@/components/List/ActivityList";
import PlayedList from "@/components/List/PlayedList";
import CustomModal from "@/components/Modal/CustomModal";
import { useAuth } from "../context/AuthContext";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";

import {
  StyledContainer,
  DashboardHeader,
  DashboardGrid,
  ChartGrid,
  ContentGrid,
  ButtonsGrid,
} from "./styles";

import { addParticipantToGame, getAllDocsWhereUserId } from "../firebase/api";

function Dashboard() {
  const router = useRouter();
  const { user, userInfo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [secretList, setSecretList] = useState([]);

  const [notify, setNotify] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  const [modalAction, setOpenDeleteModal] = useState({
    id: "",
    isOpen: false,
    type: "input",
    title: "",
    message: "",
  });

  useEffect(() => {
    let isCancelled = false;
    if (user && user.uid) {
      getAllDocsWhereUserId(user.uid).then((response) => {
        if (!isCancelled) {
          setSecretList(response);
          console.log(response);
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [user]);

  const handleCrearClick = () => {
    router.push("/game");
  };

  const handleJoinClick = () => {
    setOpenDeleteModal({
      id: "",
      isOpen: true,
      title: "Digita el Id del juego:",
    });
  };

  const handleSubmitModal = async (gameIdToJoin) => {
    try {
      setLoading(true);
      await addParticipantToGame(
        gameIdToJoin.toUpperCase(),
        user.uid,
        userInfo.fname
      ).then((result) => {
        if (result.success) {
          setLoading(false);
          setNotify({
            isOpen: true,
            type: "success",
            title: "Se agrego correctamente al juego",
            message: result.message,
          });
        } else {
          setLoading(false);
          setNotify({
            isOpen: true,
            type: "warning",
            title: "Algo inesperado paso!",
            message: result.message,
          });
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
      <StyledContainer>
        <Container>
          <DashboardHeader>
            <div>
              <Typography variant={"h6"}>Hola, {userInfo?.fname}</Typography>
              <Typography variant={"body2"}>
                Aquí hay información que recopilamos para ti
              </Typography>
            </div>
            <ButtonsGrid>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}
              >
                <Fab color="warning" onClick={handleJoinClick}>
                  <PersonAddIcon />
                </Fab>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Fab
                  variant="extended"
                  color="warning"
                  aria-label="crear"
                  onClick={handleJoinClick}
                >
                  <PersonAddIcon sx={{ mr: 1 }} />
                  Unirme
                </Fab>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}
              >
                <Fab color="primary" onClick={handleCrearClick}>
                  <AddIcon />
                </Fab>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Fab
                  variant="extended"
                  color="primary"
                  aria-label="crear"
                  onClick={handleCrearClick}
                >
                  <AddIcon sx={{ mr: 1 }} />
                  Crear
                </Fab>
              </Box>
            </ButtonsGrid>
          </DashboardHeader>
          <DashboardGrid>
            <ContentGrid>
              <ChartGrid>
                <SummaryChart
                  title="Participaciones"
                  num={1}
                  description="Ultimo mes"
                />
                <SummaryChart
                  title="Peticiones"
                  num={1}
                  description="Ultimo mes"
                />
              </ChartGrid>
              <Box
                sx={{
                  paddingTop: "2rem",
                  minWidth: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <PlayedList gameList={secretList} />
              </Box>
            </ContentGrid>

            <div>
              <Typography variant={"h6"} paddingBottom={"2rem"}>
                Ultimas Noticias
              </Typography>
              <ActivityList></ActivityList>
            </div>
          </DashboardGrid>
        </Container>
        <CustomModal
          modalAction={modalAction}
          setOpen={setOpenDeleteModal}
          onSubmit={handleSubmitModal}
        />
        <CustumAlert notify={notify} setNotify={setNotify} />
      </StyledContainer>
    </ProtectedRoute>
  );
}

export default Dashboard;
