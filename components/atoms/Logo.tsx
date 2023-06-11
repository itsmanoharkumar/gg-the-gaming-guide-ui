import Link from "@/components/atoms/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

interface Props {}

export default function Logo({}: Props) {
  return (
    <Grid container alignItems={"center"} flexWrap={"nowrap"}>
      <SportsEsportsIcon color="primary" sx={{ mr: 1 }} />
      <Link
        href={"/"}
        sx={{
          textDecoration: "none",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontFamily: "monospace",
            fontWeight: 900,
            color: "primary.main",
            textDecoration: "none",
          }}
        >
          GG-TheGamingGuide
        </Typography>
      </Link>
    </Grid>
  );
}
