"use client";
import { useState } from "react";
import { Box, Stack, Button, Typography, Modal, Card } from "@mui/material";

import Nav from "./components/navbar";
import ChatModal from "./components/chatbot-modal";
import Chatbot from "./components/chatbot";
// import Script from "next/script";

export default function Landing() {
  return (
    <>
    {/* <Script
      dangerouslySetInnerHTML={{
        __html: `
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:5104887,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }}
          /> */}
    <Box 
      width="100vw"
      height="100vh"
        sx={{
          backgroundImage:`url('/4853433.jpg')`,
          backgroundSize:'cover',
          backgroundPosition:'center',
          backgroundRepeat:'repeat-y'
        }}>
    <Stack
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}>
            <Nav/>
            <Box id="landing"
              width="100vw"
              height="100vh"
              sx={{
                height:{md:"40vh", xs:"20vh"},
                paddingTop:{xs:20}
              }}
              
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              // bgcolor="#F7F7F7"
              paddingBottom={10}

              >
                <Typography variant="h1" p={0} sx={{ textAlign:"center", fontSize: {xs:'2rem', md:'5rem', lg:'7rem'}}} >
                  Welcome to Prof AI
                </Typography>
                <Typography gutterBottom p={1} sx={{ textAlign:"center", fontSize: {xs:'1rem', md:'2rem', lg:'3rem'}}} >
                  Pick the best professors for you          
                </Typography>
                
                <Button
                    variant="contained"
                    sx={{
                        fontSize:'1rem',
                        borderRadius: '50px', 
                        bgcolor:"black", 
                        color:"white",
                        "&:hover": {
                            bgcolor: 'rgba(2, 2, 2, 0.7)',
                            color: 'white',}
                    }}
                    > 
                        <ChatModal/>
                </Button>
             </Box>
    </Stack>
    <Box id="pricing-options"
              width="100vw"
              display="flex"
              sx={{
                flexDirection:{md:"row", xs:"column"}
              }}
              
              justifyContent="center"
              alignItems="center"
              p={2}
              gap={5}>
            <Card variant="outlined" sx={{borderRadius:"30px"}}>
              <Stack p={3} 
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxWidth="600px"
                minHeight="200px"
                >
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom align="center">
                    Personal Course Assistant
                  </Typography>
                  {/* <Typography variant="h5" component="div" align="center">
                    AI-Generated Flashcards:
                  </Typography> */}
                  <Typography variant="h6" sx={{ mb: 1.5 }}  align="center">
                  Prof Assistant is your go-to AI for finding the perfect professor. Simply share your preferences, and it will recommend the best matches based on reviews, teaching styles, and course offerings. Get detailed insights, including course difficulty and student feedback, to make an informed decision and choose the right professor for you.
                  </Typography>
              </Stack>
            </Card>
          </Box>
    </Box>
    </>
  );
}
