import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import ModalCase from "./ModalCase";
import {
  Container,
  Grid,
  IconButton,
  Box,
  Typography,
  Card,
  Button,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "./Loading";
import { ThemeContext } from "./ThemeContext";

function DetailFlims() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  const flimId = localStorage.getItem("flimId");

  const [flim, setFlim] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const baseURL = `https://65e0228bd3db23f762485c66.mockapi.io/players`;
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        const data = await response.json();
        const findFlimId = data.find((obj) => obj.id === flimId);
        setFlim(findFlimId);
        setIsLoaded(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [baseURL, flimId]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={{ backgroundColor: theme.backgroundColor }} className="detail">
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          isLoaded && (
            <div ref={ref} className={`flim ${inView ? "visible" : ""}`}>
              <Card
                raised
                sx={{ p: 4 }}
                style={{
                  backgroundColor: theme.backgroundColor,
                  border: "1px solid white",
                }}
              >
                <Grid container spacing={12}>
                  <Grid item xs={12} md={6}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <img
                        src={flim.image}
                        alt={flim.title}
                        style={{ width: "80%", height: "auto" }}
                      />
                      <Box
                        sx={{
                          textAlign: "center",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: "1",
                        }}
                      >
                        <Button onClick={handleOpen}>
                          <IconButton>
                            <PlayCircleIcon
                              color="primary"
                              sx={{ fontSize: "100px" }}
                            />
                          </IconButton>
                        </Button>
                        <ModalCase
                          open={open}
                          handleClose={handleClose}
                          flim={flim}
                        />
                      </Box>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2 }}>
                      <Typography
                        variant="h3"
                        gutterBottom
                        component="div"
                        align="center"
                        style={{ color: theme.color }}
                      >
                        {flim.title}
                      </Typography>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            my: 3,
                          }}
                        >
                          {flim.genre.map((g) => (
                            <Button
                              variant="outlined"
                              sx={{ borderRadius: "50px", mx: 1 }}
                              key={g}
                            >
                              {g}
                            </Button>
                          ))}
                        </Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          component="div"
                          align="justify"
                          style={{ color: theme.color }}
                        >
                          {flim.summary}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
              <IconButton aria-label="go back">
                <Link to="/">
                  <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    className="button-submit"
                  >
                    Go back
                  </Button>
                </Link>
              </IconButton>
            </div>
          )
        )}
      </Container>
    </div>
  );
}

export default DetailFlims;
