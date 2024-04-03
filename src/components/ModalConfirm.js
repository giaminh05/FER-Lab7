import { Box, Button, Modal, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function DeleteModal({
  open,
  handleClose,
  setOpen,
  fetchItems,
}) {
  const baseURL = `https://65e0228bd3db23f762485c66.mockapi.io/players`;
  const deleteFlimId = localStorage.getItem("editFlimId");

  const handleDelete = () => {
    fetch(`${baseURL}/${deleteFlimId}`, {
      method: "DELETE",
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
      .then(() => {
        setOpen(false);
        toast.success("Delete Successfully!");
        fetchItems();
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <Toaster></Toaster>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this movie ?
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
