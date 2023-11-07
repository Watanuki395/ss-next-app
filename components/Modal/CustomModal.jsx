"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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

export default function CustomModal({
  modalAction,
  setOpen,
  onDelete,
  onSubmit,
}) {
  const [gameIdToSubmit, setGameIdToSubmit] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ ...modalAction, isOpen: false });
    setGameIdToSubmit("");
  };

  const handleDelete = (idToDelete) => {
    onDelete(idToDelete);

    setOpen({ ...modalAction, isOpen: false });
  };

  const handleSubmit = (idToSubmit) => {
    onSubmit(idToSubmit);

    setOpen({ ...modalAction, isOpen: false });
    setGameIdToSubmit("");
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
          {modalAction?.message ? (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalAction.message}
            </Typography>
          ) : null}
          {onSubmit ? (
            <TextField
              id="outlined-basic"
              label="Id del juego"
              variant="outlined"
              color="warning"
              onChange={(e) => {
                setGameIdToSubmit(e.target.value);
              }}
              sx={{ display: "flex", marginTop: "1.5rem" }}
              inputProps={{
                style: { textTransform: "uppercase" },
                maxLength: 10,
              }}
            />
          ) : null}

          <BtnWrapper>
            {onDelete ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleDelete(modalAction.id);
                }}
              >
                Borrar
              </Button>
            ) : null}
            {onSubmit ? (
              <Button
                variant="contained"
                color="warning"
                disabled={gameIdToSubmit.length < 8 ? true : false}
                onClick={() => {
                  handleSubmit(gameIdToSubmit);
                }}
              >
                Unirme
              </Button>
            ) : null}

            <Button variant="contained" color="primary" onClick={handleClose}>
              Cancelar
            </Button>
          </BtnWrapper>
        </Box>
      </Modal>
    </div>
  );
}
