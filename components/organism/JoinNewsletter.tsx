import { useJoinEmailList } from "@/hooks/useJoinEmailList";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ChangeEvent, useState } from "react";

interface Props {}

export default function JoinNewsletter(props: Props) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { joinEmailList } = useJoinEmailList();
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValidEmail(true);
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setIsValidEmail(false);
      return;
    }
    const payload = await joinEmailList(email);
    if (payload) {
      setEmail("");
      setIsValidEmail(true);
    }
  };

  return (
    <Grid
      container
      justifyContent={{
        xs: "center",
        md: "space-between",
      }}
      sx={{
        my: 4,
      }}
      spacing={2}
    >
      <Grid sm={6}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            textAlign: {
              xs: "center",
              md: "left",
            },
          }}
        >
          Join our newsletter to keep up to date with us!
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12} sm="auto">
          <TextField
            error={!isValidEmail}
            sx={{
              width: {
                xs: "100%",
                md: "auto",
              },
            }}
            type={"email"}
            value={email}
            size="small"
            label={"Enter your email"}
            onChange={handleEmailChange}
            helperText={!isValidEmail && "Please enter a valid email"}
          />
        </Grid>
        <Grid xs={12} sm="auto">
          <Button
            sx={{
              width: {
                xs: "100%",
                md: "auto",
              },
            }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Subscribe
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
