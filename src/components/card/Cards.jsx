import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
const Cards = ({
  children,
  heightImg,
  img = "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}) => {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia component={"img"} image={img}></CardMedia>
      <CardActionArea>
        <CardContent>{children}</CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Cards;
