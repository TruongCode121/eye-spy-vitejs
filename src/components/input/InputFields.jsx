import * as React from "react";

import { TextField, Stack } from "@mui/material";

export default function InputFields({
  color,
  Label = "Email",
  error = false,
  register,
  name,
}) {
  return (
    <Stack>
      <TextField
        label={Label}
        error={error}
        id="outlined-error-helper-text"
        variant="standard"
        color={color}
        {...register(name)}
        sx={{ width: "100%", mb: 2 }}
      />
    </Stack>
  );
}
