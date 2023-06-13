import { StrapiImageData } from "@/types/types";
import { extractImageData } from "@/helpers/helper";
import { IMAGE_SIZE } from "@/types/enums";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useRouter} from "next/router";

interface Props {
  name: string;
  id: number;
  onClick: (id: number) => void;
  image: StrapiImageData;
}

export default function CharacterCard({
  id,
  name,
  onClick,
  image,
}: Props) {
  function handleOnClick() {
      onClick(id);
  }

  const {width, height, src} = extractImageData(image, IMAGE_SIZE.MEDIUM);
  return (
      <Card className={`cursor-pointer`}
            onClick={handleOnClick}
      >
        <CardMedia
            sx={{
              maxWidth: width,
              width: "100%",
              height: '200px'
            }}
            image={src}
            title={name}
            className={'bg-top'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </Card>
  );
}
