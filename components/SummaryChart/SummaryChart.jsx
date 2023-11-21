import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import {
  CardContentWrapper,
  IconContainer,
  StyledCardGiftcardOutlinedIcon,
} from "./styles.js";

const SummaryChart = ({ title, totalGames, description }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const countSpeed = 150;
    const interval = setInterval(() => {
      if (count < totalGames) {
        setCount((prevCount) => prevCount + 1);
      } else if (count > totalGames) {
        setCount((prevCount) => prevCount - 1);
      }
    }, countSpeed);

    return () => clearInterval(interval);
  }, [count, totalGames]);

  return (
    <Card sx={{ maxHeight: "10rem", minHeight: "9rem" }}>
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
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
            <strong>{count ? count : 0}</strong>
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
