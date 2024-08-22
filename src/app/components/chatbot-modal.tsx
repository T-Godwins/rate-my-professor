import * as React from 'react';
import {Box, Button, Typography, Modal} from '@mui/material';

import Chatbot from './chatbot';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height:"80%",
  width: "50%",
  bgcolor: 'background.paper',
  borderRadius: '30px',
  boxShadow: 24,
  p: 4,
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
};

export default function ChatModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{color:"white"}}onClick={handleOpen}>Get Started</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Chatbot/>
        </Box>
      </Modal>
    </div>
  );
}
