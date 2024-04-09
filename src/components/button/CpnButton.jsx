import * as React from "react";
import { Stack, Button } from "@mui/material";
export default function CpnButton({
  type = "submit",
  color = "success",
  children,
}) {
  return (
    <Stack sx={{ mt: 2, width: "0" }}>
      <Button type={type} variant="contained" size="small" color={color}>
        {children}
      </Button>
    </Stack>
  );
}
