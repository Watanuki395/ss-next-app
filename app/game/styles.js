import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const DashboardHeader = styled.div({
  display: "flex",
  flexDirection: "row",
  marginBottom: "4rem",
  marginTop: "1rem",
  justifyContent: "space-between",
});

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const StyledContainer = styled(motion.div)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  maxWidth: "840px",
});

StyledContainer.defaultProps = {
  initial: "hidden",
  animate: "visible",
  variants: containerVariants,
  transition: { ease: "easeIn", duration: 1.5 },
};