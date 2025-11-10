import { Box } from "@mui/material";
function Chatbot() {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 5,
        gap: 3,
      }}
    >
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" } }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,26,39)",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
export default Chatbot;
