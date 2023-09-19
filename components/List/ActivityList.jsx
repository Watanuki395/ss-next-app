"use client";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

import { CardContentWrapper } from "./styles.js";

const pedidosArray = [
  {
    idPed: 123456,
    numDays: 2,
  },
  {
    idPed: 222222,
    numDays: 3,
  },
  {
    idPed: 333333,
    numDays: 1,
  },
  {
    idPed: 4444444,
    numDays: 0,
  },
  {
    idPed: 55555555,
    numDays: 10,
  },
];

function ActivityList({ showImgs }) {
  return (
    <List>
      {pedidosArray.map(({ idPed, numDays }) => (
        <ListItem key={idPed}>
          <CardContentWrapper>
            <ListItemButton>
              <Typography align="left">
                El pedido #{idPed}
                <span> fue enviado con exito</span>
              </Typography>
              <Typography size="small" color="grey">
                {`${
                  numDays === 0
                    ? "Justo hoy"
                    : numDays === 1
                    ? "Un dia atras"
                    : numDays + " dias atras"
                }`}
              </Typography>
            </ListItemButton>
          </CardContentWrapper>
        </ListItem>
      ))}
    </List>
  );
}

export default ActivityList;
