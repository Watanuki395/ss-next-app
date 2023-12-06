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

StyledContainer.defaultProps = {
  initial: "hidden",
  animate: "visible",
  variants: containerVariants,
  transition: { ease: "easeIn", duration: 0.5 },
};

export const StyledGridContainer = styled(motion.div)({
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
  justifyContent: "center",
  columnGap: "2rem",

  "@media screen and (max-width: 768px)": {
    flexDirection: "column",
    rowGap: "1rem",
  },
});
