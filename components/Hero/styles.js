"use client";

import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";

export const StyledBox = styled(Box)({
  background: `linear-gradient(
    90deg,
    rgba(2, 0, 36, 0.9612219887955182) 29%,
    rgba(2, 2, 28, 0.6727065826330532) 71%,
    rgba(26, 10, 54, 1) 100%
  )`,
  minHeight: "93vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textAlign: "center",
  zIndex: 1,
});

export const BackgroundImage = styled.div({
  background: `url('/hero2.jpg') center/cover no-repeat `,
  position: "relative",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0.9,
  transition: "opacity 300ms ease-in",
});

export const StyledContainer = styled(motion.div)({ display: "flex" });

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

StyledContainer.defaultProps = {
  initial: "hidden",
  animate: "visible",
  variants: containerVariants,
  transition: { duration: 0.5 },
};
