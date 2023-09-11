"use client";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

export const StyledLinks = styled(motion.div)({
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-end",
  marginTop: "1rem",
});

export const StyledLink = styled(Button)({
  component: "button",
  variant: "body2",
});

export const StyledContainer = styled(motion.div)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
});

export const StyledForm = styled.form({
  width: "100%",
  marginTop: "1rem",
});

export const StyledButton = styled.div({
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
});

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
