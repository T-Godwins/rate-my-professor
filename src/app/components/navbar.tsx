"use client";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import * as React from "react";
import { AppBar, Box, Stack, Button, Typography } from "@mui/material";
import { useState } from "react";
export default function Nav() {
  return (
    <Box width="100vw">
      <SignedOut>
        <Stack
          position="sticky"
          sx={{ boxShadow: "none" }}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          p={3}
          gap={2}
          // bgcolor="#F5F5F5"
        >
          <Typography variant="h3">Prof AI</Typography>
          <SignInButton>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "15px", lg: "1.rem" },
                borderRadius: "50px",
                bgcolor: "black",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(2, 2, 2, 0.7)",
                  color: "white",
                },
              }}
            >
              Sign in
            </Button>
          </SignInButton>
        </Stack>
      </SignedOut>

      <SignedIn>
        <Stack
          position="sticky"
          sx={{ boxShadow: "none" }}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          p={3}
          gap={2}
          bgcolor="#F5F5F5"
        >
          <Typography variant="h3">Prof AI</Typography>
          <UserButton />
        </Stack>
      </SignedIn>
    </Box>
  );
}
