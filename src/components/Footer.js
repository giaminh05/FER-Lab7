import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import "../App.css";

function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <Box
      className="footer"
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginTop: "50px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid style={{ color: theme.color }}>
            <Typography variant="h5">Movie World</Typography>
          </Grid>
          <Grid style={{ color: theme.color }}>
            <Typography variant="subtitle1">
              {`${new Date().getFullYear()}   @GiaMinh`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
