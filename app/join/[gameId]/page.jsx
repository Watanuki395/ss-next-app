"use client";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import { useAuth } from "../../context/AuthContext";

const today = dayjs();

export default function JoinGame({ params }) {
  const collectionName = "games";
  const {gameId} = params

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  useEffect(() => {}, [gameId]);

  const handleSubmit = async (vals) => {};

  return (
    <>
      <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
      {user ? (
        <div> te uniras al juego: {gameId}</div>
      ) : (
        <div>Tienes que registrarte para unirte al super juego</div>
      )}
    </>
  );
}
;
