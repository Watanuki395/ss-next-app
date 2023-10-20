import styled from "@emotion/styled";
import { motion } from "framer-motion";
import ListItem from "@mui/material/ListItem";

export const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-right: 1.5rem;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const StyledListItem = styled(ListItem)`
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  &:hover {
    /* background-color: #2b2b2b; */
  }
`;

export const StyledListSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
`;

export const StyledFabSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex: auto;
  justify-content: flex-end;
  margin-left: 1rem;

  @media screen and (max-width: 468px) {
    flex-direction: column;
  }
`;

export const StyledImage = styled("img")`
  border-radius: 50px;
  max-width: 100px;
  max-height: 100px;
  margin-right: 1rem;

  @media screen and (max-width: 768px) {
    align-self: center;
    min-width: 80px;
    max-height: 80px;
  }
  @media screen and (max-width: 468px) {
    align-self: center;
    min-width: 50px;
    max-height: 50px;
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const StyledContainer = styled(motion.div)({
  display: "flex",
  flexDirection: "column",
  marginTop: "2rem",
  width: "100%",
});

StyledContainer.defaultProps = {
  initial: "hidden",
  animate: "visible",
  variants: containerVariants,
  transition: { ease: "easeIn", duration: 0.5 },
};
