"use client";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import SummaryChart from "@/components/SummaryChart/SummaryChart";
import ActivityList from "@/components/List/ActivityList";
import ProductsList from "@/components/List/ProductList";
import { useAuth } from "../context/AuthContext";

import {
  DashboardHeader,
  DashboardGrid,
  ChartGrid,
  ContentGrid,
  // StyledTrendingUpOutlinedIcon,
  // IconContainer,
  // CardContentWrapper,
  // DataTableWrapper
} from "./styles";

function Dashboard({ metrics }) {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <Container>
        <DashboardHeader>
          <Typography variant={"h6"}>
            Hola, <strong>{user?.email}</strong>
          </Typography>
          <Typography variant={"body2"}>
            Aquí hay información que recopilamos para ti
          </Typography>
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
              <Typography variant={"h6"}>Ultimos Juegos</Typography>
              <ProductsList />
            </Box>
          </ContentGrid>

          <div>
            <Typography variant={"h6"}>Ultimas Noticias</Typography>
            <ActivityList></ActivityList>
          </div>
        </DashboardGrid>
      </Container>
    </ProtectedRoute>
  );
}

export default Dashboard;
