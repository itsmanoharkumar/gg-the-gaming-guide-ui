import { useLead } from "@/hooks/useLead";
import GetInTouchImage from "@/images/get-in-touch.svg";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Connect() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { saveLead } = useLead();
  async function handleSend() {
    console.log({ name, email, message });
    await saveLead({ name, email, message });
  }

  return (
    <>
      <Head>
        <title>Connect | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Container maxWidth={"xl"}>
        <Grid container my={10} justifyContent={"center"} spacing={2}>
          <Grid xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ mb: 4 }} variant="h4" component="div">
              Connect With Us
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                type={"email"}
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleSend}>
                Send
              </Button>
            </Stack>
          </Grid>
          <Grid
            sx={{
              display: { xs: "none", sm: "flex", md: "flex" },
            }}
            sm={6}
            p={2}
            justifyContent={"center"}
            display={"flex"}
          >
            <Image src={GetInTouchImage} alt="SignIn" className={"w-full"} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
