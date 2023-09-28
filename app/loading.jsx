import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function Loading() {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Skeleton
        animation="wave"
        sx={{ bgcolor: "grey.1000" }}
        variant="rectangular"
        width="100%"
        height="100%"
      />
    </Box>
  );
}

export default Loading;
