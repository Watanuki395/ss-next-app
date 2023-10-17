"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #565353b0",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

import { BtnWrapper } from "./style";

export default function CustomModal({ modalAction, setOpen, onDelete }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ ...modalAction, isOpen: false });
  };

  const handleDelete = (idToDelete) => {
    onDelete(idToDelete);

    setOpen({ ...modalAction, isOpen: false });
  };

  return (
    <div>
      <Modal
        open={modalAction.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalAction.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalAction.message}
          </Typography>
          <BtnWrapper>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDelete(modalAction.id);
              }}
            >
              Borrar
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
          </BtnWrapper>
        </Box>
      </Modal>
    </div>
  );
}
