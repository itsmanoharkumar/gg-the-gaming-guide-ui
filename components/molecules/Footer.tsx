import JoinNewsletter from "@/components/organism/JoinNewsletter";
import { CopyrightOutlined, WindowRounded } from "@mui/icons-material";
import AndroidSharpIcon from "@mui/icons-material/AndroidSharp";
import AppleIcon from "@mui/icons-material/Apple";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Unstable_Grid2";

interface Props {}

const platformList = [
  {
    name: "Windows",
    icon: <WindowRounded />,
  },
  {
    name: "Mac",
    icon: <AppleIcon />,
  },
  {
    name: "iOS",
    icon: <AppleIcon />,
  },
  {
    name: "Android",
    icon: <AndroidSharpIcon />,
  },
];

export default function Footer({}: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth={"xl"}>
        <Stack>
          <JoinNewsletter />
          <Box>
            <Divider />
          </Box>
          <Box
            sx={{
              mt: 4,
              mb: 2,
            }}
          >
            <Grid container justifyContent={"space-between"} spacing={2}>
              <Grid container alignItems={"center"}>
                <CopyrightOutlined spacing={2} />
                <Typography sx={{ ml: 1 }} variant="body2">
                  2023 GG The Gaming Guide Inc.
                </Typography>
              </Grid>
              <Grid container alignSelf={"end"} spacing={2}>
                <Grid>
                  <Tooltip title={"Coming soon"}>
                    <Button size="small" variant="text">
                      Terms of Service
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid>
                  <Tooltip title={"Coming soon"}>
                    <Button size="small" variant="text">
                      Privacy Policy
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid>
                  <Tooltip title={"Coming soon"}>
                    <Button size="small" variant="text">
                      Cookies
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              mb: 4,
            }}
          >
            <Grid container justifyContent={"space-between"} spacing={2}>
              <Grid container alignItems={"center"}>
                <CheckCircleIcon spacing={2} />
                <Typography sx={{ ml: 1 }} variant="body2">
                  Available on all platforms
                </Typography>
              </Grid>
              <Grid container alignSelf={"end"} spacing={2}>
                {platformList.map((platform) => {
                  return (
                    <Grid key={platform.name}>
                      <Tooltip title={"Coming soon"}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={platform.icon}
                        >
                          {platform.name}
                        </Button>
                      </Tooltip>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
      <Box
        sx={{
          height: "8px",
          backgroundColor: "primary.main",
        }}
      ></Box>
    </Box>
  );
}
