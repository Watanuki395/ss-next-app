import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const ProfileHeader = styled.div({
  display: "flex",
  marginTop: "5rem",
});

export const StyledContainer = styled(motion.div)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  maxWidth: "840px",
});

export const DashboardHeader = styled.div({
  display: "flex",
  flexDirection: "row",
  marginBottom: "4rem",
  marginTop: "1rem",
  justifyContent: "space-between",
});
