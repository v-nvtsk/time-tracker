import {
  Box, Button, Modal, Typography
} from "@mui/material";

export const ApproveDialog = ({
  open, handleClose, handleApprove, title, description
}: {
  open: boolean,
  handleClose: () => void,
  handleApprove: () => void,
  title: string,
  description: string
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
          {description}
        </Typography>
        <Button onClick={handleApprove}>Подтвердить</Button>
        <Button onClick={handleClose}>Закрыть</Button>
      </Box>
    </Modal>
  );
};
