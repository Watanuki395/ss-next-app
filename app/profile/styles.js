import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const ProfileHeader = styled.div({
  display: "flex",
  marginTop: "5rem",
});

export const StyledContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  padding: 2rem;
  max-width: 840px;
  gap: 1rem;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 20px;
`;

export const DashboardHeader = styled.div({
  display: "flex",
  flexDirection: "row",
  marginBottom: "4rem",
  marginTop: "1rem",
  justifyContent: "space-between",
});
