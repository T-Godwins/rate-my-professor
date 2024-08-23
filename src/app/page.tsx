"use client";
import { useState } from "react";
import { Box, Stack, Button, Typography, Modal } from "@mui/material";

import Nav from "./components/navbar";
import ChatModal from "./components/chatbot-modal";
import Chatbot from "./components/chatbot";
export default function Landing() {
  return (
    <Stack
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Nav />
      <Box
        id="landing"
        width="100vw"
        sx={{
          height: { md: "40vh", xs: "20vh" },
          paddingTop: { xs: 20 },
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        // bgcolor="#F7F7F7"
        paddingBottom={10}
      >
        <Typography
          variant="h1"
          p={0}
          sx={{
            textAlign: "center",
            fontSize: { xs: "2rem", md: "5rem", lg: "7rem" },
          }}
        >
          Welcome to Prof AI
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          p={1}
          sx={{
            textAlign: "center",
            fontSize: { xs: "1rem", md: "2rem", lg: "3rem" },
          }}
        >
          Pick the best professors for you
        </Typography>

        <ChatModal />
      </Box>
    </Stack>
  );
}
