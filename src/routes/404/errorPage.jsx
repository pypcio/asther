import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div
      className="flex justify-center align-center w-100 h-auto"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f7f7f7",
          padding: "2rem",
        }}
      >
        <Container maxWidth="md">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: "1", paddingRight: "1rem" }}>
              <Typography variant="h1" style={{ color: "#1976d2" }}>
                404
              </Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <div className="flex justify-start mv3">
                <Button variant="contained">
                  <Link to="/user">Home</Link>
                </Button>
              </div>
            </div>
            <div style={{ flex: "1", paddingLeft: "1rem" }}>
              <img
                src="https://i.imgur.com/qIufhof.png"
                alt=""
                width={500}
                height={250}
              />
            </div>
          </div>
        </Container>
      </Box>
    </div>
  );
}
