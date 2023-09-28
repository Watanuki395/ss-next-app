import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const DashboardHeader = styled.div({
  display: "flex",
  flexDirection: "row",
  //alignItems: "flex-start",
  marginBottom: "4rem",
  marginTop: "1rem",
  justifyContent: "space-between",
});

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 9fr 4fr;
  column-gap: 2rem;

  @media screen and (max-width: 1120px) {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;
`;

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const StyledContainer = styled(motion.div)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "1rem",
});

StyledContainer.defaultProps = {
  initial: "hidden",
  animate: "visible",
  variants: containerVariants,
  transition: { duration: 0.8 },
};
