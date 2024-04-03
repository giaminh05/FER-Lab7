import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editFlimId } from "../redux/action";
import Loading from "./Loading";
import styled from "@emotion/styled";
import { useDebounce } from "../hooks/useDebound";
import SearchIcon from "@mui/icons-material/Search";
import DeleteModal from "./ModalConfirm";
import { ThemeContext } from "./ThemeContext";

const TableContainerStyled = styled(TableContainer)`
  & .MuiTableCell-head {
    background-color: #f5f5f5;
    color: #333;
  }

  & .MuiTableCell-body {
    background-color: #fff;
    color: #333;
  }
`;

function Dashboard() {
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const ITEMS_PER_PAGE = 6;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [flim, setFlim] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [sortByTitle, setSortByTitle] = useState(false);
  const [sortByNation, setSortByNation] = useState(false);
  const [sortByYear, setSortByYear] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { theme } = useContext(ThemeContext);

  const fetchItems = () => {
    const baseURL = "https://65e0228bd3db23f762485c66.mockapi.io/players";
    fetch(baseURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP Status: ${response.status}");
        }
        return response.json();
      })
      .then((data) => {
        setFlim(data);
        setIsLoaded(true);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const baseURL = new URL(
      "https://65e0228bd3db23f762485c66.mockapi.io/players"
    );

    baseURL.searchParams.append("title", debouncedSearchValue);

    if (sortByTitle) {
      baseURL.searchParams.append("sortBy", "title");
    }
    if (sortByNation) {
      baseURL.searchParams.append("sortBy", "nation");
    }
    if (sortByYear) {
      baseURL.searchParams.append("sortBy", "year");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        const data = await response.json();

        setFlim(data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [debouncedSearchValue, sortByTitle, sortByNation, sortByYear]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(flim.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedFlims = flim.slice(startIndex, endIndex);

  const [openModal, setOpenModal] = useState(false);

  const handleAddFlim = () => {
    naviagte("/add");
  };

  const handleEditFlim = (flimId) => {
    dispatch(editFlimId(flimId));
    naviagte("/edit");
  };

  const handleDeleteFlim = (flimId) => {
    dispatch(editFlimId(flimId));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div
      style={{ backgroundColor: theme.backgroundColor }}
      className="dashboard"
    >
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          isLoaded && (
            <>
              <TableContainerStyled component={Paper}>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: theme.backgroundColor,
                    border: "1px solid #ccc",
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "200px",
                      height: "50px",
                      border: "1px solid #ccc",
                      backgroundColor: "white",
                      borderRadius: "50px",
                      backgroundColor: theme.backgroundColor,
                    }}
                  >
                    <SearchIcon style={{ color: theme.color }} />
                    <input
                      type="text"
                      placeholder="Search by Title"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddFlim}
                    className="button-submit"
                  >
                    Add Flim
                  </Button>
                </Box>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          backgroundColor: theme.backgroundColor,
                          color: theme.color,
                          border: "1px solid #ccc",
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          backgroundColor: theme.backgroundColor,
                          color: theme.color,
                          border: "1px solid #ccc",
                        }}
                      >
                        Image
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          backgroundColor: theme.backgroundColor,
                          color: theme.color,
                          border: "1px solid #ccc",
                        }}
                      >
                        Tiltle
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          backgroundColor: theme.backgroundColor,
                          color: theme.color,
                          border: "1px solid #ccc",
                        }}
                      >
                        Nation
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          backgroundColor: theme.backgroundColor,
                          color: theme.color,
                          border: "1px solid #ccc",
                        }}
                      >
                        Year
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          backgroundColor: theme.backgroundColor,
                          color: theme.color,
                          border: "1px solid #ccc",
                        }}
                      >
                        Genre
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          backgroundColor: theme.backgroundColor,
                          color: theme.color,
                          border: "1px solid #ccc",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedFlims.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            backgroundColor: theme.backgroundColor,
                            color: theme.color,
                            border: "1px solid #ccc",
                          }}
                        >
                          {row.id}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            backgroundColor: theme.backgroundColor,
                            color: theme.color,
                            border: "1px solid #ccc",
                          }}
                        >
                          <Avatar alt={row.title} src={row.image} />
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            backgroundColor: theme.backgroundColor,
                            color: theme.color,
                            border: "1px solid #ccc",
                          }}
                        >
                          {row.title}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            backgroundColor: theme.backgroundColor,
                            color: theme.color,
                            border: "1px solid #ccc",
                          }}
                        >
                          {row.nation}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            backgroundColor: theme.backgroundColor,
                            color: theme.color,
                            border: "1px solid #ccc",
                          }}
                        >
                          {row.year}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            backgroundColor: theme.backgroundColor,
                            color: theme.color,
                            border: "1px solid #ccc",
                          }}
                        >
                          {row.genre.join(", ")}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            backgroundColor: theme.backgroundColor,
                            color: theme.color,
                            border: "1px solid #ccc",
                          }}
                        >
                          <IconButton onClick={() => handleEditFlim(row.id)}>
                            <EditIcon color="warning" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteFlim(row.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {displayedFlims.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          Search not Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainerStyled>
            </>
          )
        )}

        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            endIcon={<KeyboardArrowLeftIcon />}
            className="previous-button border"
            color="primary"
            size="large"
          />

          <ButtonGroup>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`page-button ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </Button>
              )
            )}
          </ButtonGroup>
          <Button
            className="next-button border"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            startIcon={<KeyboardArrowRightIcon />}
            color="primary"
            size="large"
          />
        </Box>
        <DeleteModal
          open={openModal}
          handleClose={handleCloseModal}
          setOpen={setOpenModal}
          fetchItems={fetchItems}
        />
      </Container>
    </div>
  );
}

export default Dashboard;
