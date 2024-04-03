import { Modal, Typography, Box, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalCase({ open, handleClose, flim }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {flim.title}
        </Typography>
        <p>
          <iframe
            width="100%"
            height="400px"
            src={flim.clip}
            title={flim.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </p>
        <Typography align="right">
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalCase;
