import * as React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import linearProgressClasses from "@mui/material/LinearProgress";
export default function LinearColor({ coLor = "secondary" }) {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={4}>
      <LinearProgress color={`${coLor}`} />
    </Stack>
  );
}
