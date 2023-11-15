"use client";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import { useAuth } from "../../context/AuthContext";

const today = dayjs();

function JoinGame({ params }) {
  const collectionName = "games";

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  useEffect(() => {}, []);

  const handleSubmit = async (vals) => {};

  return (
    <>
      <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
      {user ? (
        <div> te uniras al juego: {params.gameId}</div>
      ) : (
        <div>Tienes que registrarte para unirte al super juego</div>
      )}
    </>
  );
}

export default JoinGame;
