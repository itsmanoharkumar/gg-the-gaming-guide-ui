import { useGameRequest } from "@/hooks/useGameRequest";
import { selectAuthState } from "@/store/authSlice";
import { GameRequest } from "@/types/types";
import { ThumbUp } from "@mui/icons-material";
import {
  Button,
  Container,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Unstable_Grid2";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function RaiseRequest() {
  const [name, setName] = useState("");
  const [softwareRequestList, setGameRequestList] = useState<any>(null);
  const { createGameRequest, getAllGameRequest, upVoteGameRequest } =
    useGameRequest();
  const authState: boolean = useSelector(selectAuthState);
  async function handleSend() {
    await createGameRequest({ name });
    setName("");
    refreshList();
  }

  async function refreshList() {
    const response = await getAllGameRequest();
    const data = response?.data || [];
    setGameRequestList([...data]);
  }

  useEffect(() => {
    refreshList();
  }, []);

  async function onVoteHandler(id: number) {
    const response = await upVoteGameRequest(id);
  }

  return (
    <>
      <Head>
        <title>Raise Request | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Container maxWidth={"xl"}>
        <Grid container my={10} justifyContent={"center"} spacing={4}>
          <Grid xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ mb: 4 }} variant="h4" component="div">
              Raise Request
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDownCapture={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              />
              <Tooltip title={!authState && "Please login"}>
                <span className={"w-full inline-block"}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                  >
                    Send
                  </Button>
                </span>
              </Tooltip>
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ mb: 4 }} variant="h4" component="div">
              Community Requests
            </Typography>
            <List sx={{ width: "100%", maxWidth: 360 }}>
              {softwareRequestList?.map((item: GameRequest) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Tooltip
                      title={!authState ? "Please login to vote" : "Vote"}
                    >
                      <span>
                        <IconButton
                          aria-label="vote"
                          disabled={!authState}
                          onClick={() => onVoteHandler(item.id)}
                        >
                          <ThumbUp />
                        </IconButton>
                      </span>
                    </Tooltip>
                  }
                >
                  <ListItemButton>
                    <ListItemText
                      primary={item.attributes.name}
                      primaryTypographyProps={{
                        style: {
                          textTransform: "capitalize",
                        },
                        typography: "h6",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
