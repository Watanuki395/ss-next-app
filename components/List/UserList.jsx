import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function UserList({ userlist }) {
  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return (
    <>
      {userlist
        ? userlist.map((item) => {
            return (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                }}
                key={item.id}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={item.userName} src="./rule1.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.userName}
                    secondary={
                      <>
                        {/* <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography> */}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            );
          })
        : null}
    </>
  );
}
