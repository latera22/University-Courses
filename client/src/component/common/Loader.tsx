import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>Loading Application...</Typography>
    </Box>
  );
};

export default Loader;
