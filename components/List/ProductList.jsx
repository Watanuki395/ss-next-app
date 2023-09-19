"use client";
import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Typography from "@mui/material/Typography";

import { CardContentWrapper } from "./styles.js";

const pedidosArray = [
  {
    idProd: 123456,
    ProdName: "un producto",
    gameName: "amigo secreto familiar",
    recivedOn: "27-12-2023",
  },
  {
    idProd: 222222,
    ProdName: "otro producto",
    gameName: "amigo secreto familiar",
    recivedOn: "27-12-2023",
  },
  {
    idProd: 333333,
    ProdName: "producto x ",
    gameName: "amigo secreto familiar",
    recivedOn: "27-12-2023",
  },
  {
    idProd: 4444444,
    ProdName: "variacion de producto",
    gameName: "amigo secreto familiar",
    recivedOn: "27-12-2023",
  },
  {
    idProd: 55555555,
    ProdName: "no sabemos que es pero es un producto",
    gameName: "amigo secreto familiar",
    recivedOn: "27-12-2023",
  },
];

function ProductsList({ showImgs }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List>
        {pedidosArray.map((item) => (
          <ListItem key={item.idProd} sx={{ width: "100%" }}>
            <CardContentWrapper>
              <ListItemButton sx={{ width: "100%" }}>
                <Typography align="left">
                  {item.ProdName.toUpperCase()}
                </Typography>
                <Typography variant="body2">{item.gameName}</Typography>
              </ListItemButton>
              <Divider variant="fullWidth" />
            </CardContentWrapper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ProductsList;
