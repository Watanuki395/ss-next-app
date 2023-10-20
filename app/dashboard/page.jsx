"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SummaryChart from "@/components/SummaryChart/SummaryChart";
import ActivityList from "@/components/List/ActivityList";
import PlayedList from "@/components/List/PlayedList";
import { useAuth } from "../context/AuthContext";

import {
  StyledContainer,
  DashboardHeader,
  DashboardGrid,
  ChartGrid,
  ContentGrid,
} from "./styles";

function Dashboard({ metrics }) {
  const router = useRouter();
  const { user, userInfo } = useAuth();

  const handleCrearClick = () => {
    router.push("/game");
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
            <div>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  padding: "1rem",
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
            </div>
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
      </StyledContainer>
    </ProtectedRoute>
  );
}

export default Dashboard;
