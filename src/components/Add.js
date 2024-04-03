import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  AlertTitle,
  Typography,
  Card,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { genreList } from "../shared/ListOfGenre";
import { validCountries } from "../shared/ListOfNation";
import ReactPlayer from "react-player";
import "../App.css";
import { ThemeContext } from "./ThemeContext";

const Image = styled("img")({
  maxWidth: "100%",
  maxHeight: "250px",
});

const Wrap = styled("div")({
  display: "flex",
  justifyContent: "center",
});

function Add() {
  const baseURL = `https://65e0228bd3db23f762485c66.mockapi.io/players`;

  const validationSchema = Yup.object().shape({
    image: Yup.string()
      .url("Invalid image URL")
      .required("Image URL is required"),
    title: Yup.string().required("Title is required"),
    year: Yup.number()
      .typeError("Year must be a number")
      .integer("Year must be an integer")
      .min(1900, "Year must be greater than or equal to 1900")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required("Year is required"),
    nation: Yup.string()
      .required("Nation is required")
      .oneOf(validCountries, "Invalid nation"),
    genre: Yup.array()
      .of(Yup.string())
      .min(1, "At least one genre is required"),
    summary: Yup.string()
      .required("Summary is required")
      .min(7, "Summary must be at least 7 characters long"),
  });

  const initialValues = {
    image: "",
    title: "",
    year: null,
    nation: "",
    genre: [],
    summary: "",
    clip: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setOpen(true))
        .catch((error) => console.log(error.message));
    },
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.backgroundColor }} className="add">
      <Container>
        <Card
          variant="outlined"
          sx={{
            p: 5,
            my: 5,
            backgroundColor: theme.backgroundColor,
            border: "1px solid white",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography
              variant="h4"
              style={{ color: theme.color, paddingBottom: "15px" }}
            >
              Add Flim Form:
            </Typography>
            <TextField
              fullWidth
              id="image"
              name="image"
              label="Image URL"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              sx={{ pb: 2 }}
              InputLabelProps={{
                sx: { fontSize: "1rem", pb: 1, color: theme.color },
              }}
            />
            {formik.values.image && (
              <Wrap>
                <Image src={formik.values.image} alt="User's image" />
              </Wrap>
            )}
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ pb: 2 }}
              InputLabelProps={{
                sx: { fontSize: "1rem", pb: 1, color: theme.color },
              }}
            />
            <TextField
              fullWidth
              id="year"
              name="year"
              label="Year (YYYY)"
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
              sx={{ pb: 2 }}
              InputLabelProps={{
                sx: { fontSize: "1rem", pb: 1, color: theme.color },
              }}
            />

            <TextField
              fullWidth
              id="nation"
              name="nation"
              label="Nation"
              value={formik.values.nation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nation && Boolean(formik.errors.nation)}
              helperText={formik.touched.nation && formik.errors.nation}
              sx={{ pb: 2 }}
              InputLabelProps={{
                sx: { fontSize: "1rem", pb: 1, color: theme.color },
              }}
            />
            <Box>
              {genreList.map((genre) => (
                <FormControlLabel
                  key={genre}
                  control={
                    <Checkbox
                      name="genre"
                      value={genre}
                      onChange={formik.handleChange}
                      checked={formik.values.genre.includes(genre)}
                      style={{ color: theme.color }}
                    />
                  }
                  style={{ color: theme.color }}
                  label={genre}
                />
              ))}
              {formik.errors.genre && (
                <Typography color="error" variant="caption">
                  {formik.errors.genre}
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                fullWidth
                id="summary"
                name="summary"
                label="Summary"
                multiline
                rows={4}
                value={formik.values.summary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.summary && Boolean(formik.errors.summary)}
                helperText={formik.touched.summary && formik.errors.summary}
                sx={{ pb: 2 }}
                InputLabelProps={{
                  sx: { fontSize: "1rem", pb: 1, color: theme.color },
                }}
              />
            </Box>
            <TextField
              fullWidth
              id="clip"
              name="clip"
              label="Clip URL"
              value={formik.values.clip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.clip && Boolean(formik.errors.clip)}
              helperText={formik.touched.clip && formik.errors.clip}
              sx={{ pb: 2, color: theme.color }}
              InputLabelProps={{
                sx: { fontSize: "1rem", pb: 1, color: theme.color },
              }}
            />
            {formik.values.clip && (
              <Wrap>
                <ReactPlayer
                  url={formik.values.clip}
                  controls
                  width={400}
                  height={300}
                />
              </Wrap>
            )}
            <Typography align="right">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
                className="button-submit"
              >
                Submit
              </Button>
            </Typography>
          </form>
        </Card>
        <IconButton aria-label="go back">
          <Link to="/dashboard">
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              className="button-submit"
            >
              Go back
            </Button>
          </Link>
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Congraturation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Alert severity="success">
                <AlertTitle>Adding successful!</AlertTitle>
              </Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                OK
              </Link>
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default Add;
