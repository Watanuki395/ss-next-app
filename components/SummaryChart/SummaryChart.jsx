import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import {
  CardContentWrapper,
  IconContainer,
  StyledCardGiftcardOutlinedIcon,
} from "./styles.js";

const SummaryChart = ({ title, num, description }) => {
  return (
    <Card sx={{ maxHeight: "10rem", minHeight: "9rem" }}>
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "64px 1fr",
          gridColumnGap: "2.5rem",
          minWidth: "22rem",
        }}
      >
        <IconContainer>
          <StyledCardGiftcardOutlinedIcon />
        </IconContainer>
        <CardContentWrapper>
          <Typography variant="h6" sx={{ textAlign: "right" }}>
            {title ? title : ""}
          </Typography>
          <Typography variant="h2" sx={{ textAlign: "right" }}>
            {num ? num : 0}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "right", color: "gray" }}
          >
            {description ? description : "ultimo mes"}
          </Typography>
        </CardContentWrapper>
      </CardContent>
    </Card>
  );
};

export default SummaryChart;
