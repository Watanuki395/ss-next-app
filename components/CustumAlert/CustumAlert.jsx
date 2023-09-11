"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";

export function CustumAlert({ notify, setNotify }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({ ...notify, isOpen: false });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Snackbar
        open={notify.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Collapse in={notify.isOpen}>
          <Alert
            severity={notify.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setNotify({ ...notify, isOpen: false });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>{notify.title}</AlertTitle>
            {notify.message}
          </Alert>
        </Collapse>
      </Snackbar>
    </Box>
  );
}
