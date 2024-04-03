import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch } from "react-redux";
import { setFlimId } from "../redux/action";
import { ThemeContext } from "@emotion/react";

function FlimItem({ flim }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFlimClick = (flimId) => {
    dispatch(setFlimId(flimId));
    navigate("/detailflims");
  };

  return (
    <div ref={ref} className={`flim ${inView ? "visible" : ""}`}>
      <Card raised sx={{ maxWidth: 500, bgcolor: "#fafafa" }}>
        <CardMedia
          component="img"
          height="600px"
          image={flim.image}
          alt={flim.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {flim.title}
          </Typography>
          <Typography variant="body1" align="center">
            Year: {flim.year} &#8226; Nation: {flim.nation}
          </Typography>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {flim.genre.map((g) => (
              <Button
                size="small"
                variant="outlined"
                sx={{ borderRadius: "50px" }}
              >
                {g}
              </Button>
            ))}
          </CardActions>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size="medium"
            variant="contained"
            onClick={() => handleFlimClick(flim.id)}
            startIcon={<InfoIcon />}
            className="button-submit"
          >
            Detail
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default FlimItem;
