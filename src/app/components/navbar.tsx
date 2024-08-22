"use client";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
  
import * as React from 'react'
import {AppBar, Box, Stack,Button} from "@mui/material"
import { useState } from "react";
export default function Nav() {
  return (
    <Box width="100vw">
    <SignedOut>
    <Stack
        position="sticky" 
        sx={{boxShadow:"none"}}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        gap={2}
        bgcolor="#F5F5F5"
    >
        <Box>
        RMP Logo
        </Box>
        <Button 
              variant="contained"
              sx={{
                  fontSize:{xs:"15px", lg:'1.2rem'},
                  borderRadius: '50px', 
                  bgcolor:"black", 
                  color:"white",
                  "&:hover": {
                      bgcolor: 'rgba(2, 2, 2, 0.7)',
                      color: 'white',}
                  }}
                  ><SignInButton />
            </Button>
    </Stack>  
      </SignedOut>

      <SignedIn>
      <Stack
        position="sticky" 
        sx={{boxShadow:"none"}}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        gap={2}
        bgcolor="#F5F5F5"
    >
        
        <Box>
        RMP Logo
        </Box>
        <UserButton />
    </Stack>
        </SignedIn>
    </Box>
  );
}
