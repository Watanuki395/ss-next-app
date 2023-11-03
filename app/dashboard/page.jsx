"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SummaryChart from "@/components/SummaryChart/SummaryChart";
import ActivityList from "@/components/List/ActivityList";
import PlayedList from "@/components/List/PlayedList";
import CustomModal from "@/components/Modal/CustomModal";
import { useAuth } from "../context/AuthContext";

import {
  StyledContainer,
  DashboardHeader,
  DashboardGrid,
  ChartGrid,
  ContentGrid,
  ButtonsGrid,
} from "./styles";

import { addParticipantToGame } from "../firebase/api";

function Dashboard() {
  const router = useRouter();
  const { user, userInfo } = useAuth();

  const [modalAction, setOpenDeleteModal] = useState({
    id: "",
    isOpen: false,
    type: "input",
    title: "",
    message: "",
  });

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
      await addParticipantToGame(gameIdToJoin.toUpperCase(), user.uid);
      console.log("EXITO");
    } catch (error) {
      console.log(error);
    }
    console.log(gameIdToJoin.toUpperCase());
  };

  return (
    <ProtectedRoute>
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
                <PlayedList />
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
      </StyledContainer>
    </ProtectedRoute>
  );
}

export default Dashboard;
