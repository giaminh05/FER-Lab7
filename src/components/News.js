import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { data2 } from "../shared/ListOfFilms";
import { ThemeContext } from "./ThemeContext";
import "../App.css";

const Root = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
}));

const Media = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: "56.25%",
}));
function News() {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ backgroundColor: theme.backgroundColor }} className="news">
      <Container>
        <Grid container spacing={2}>
          {data2.map((film) => (
            <Grid
              item
              sm={6}
              md={4}
              key={film.id}
              style={{ backgroundColor: theme.backgroundColor }}
            >
              <Root style={{ backgroundColor: theme.backgroundColor }}>
                <CardHeader
                  title={`${film.title} (${film.year})`}
                  style={{ color: theme.color, border: "1px solid white" }}
                />
                <Media
                  image={film.image}
                  title={film.title}
                  style={{ border: "1px solid white" }}
                />
                <CardContent style={{ border: "1px solid white" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ color: theme.color }}
                  >
                    {film.summary}
                  </Typography>
                </CardContent>
              </Root>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default News;
