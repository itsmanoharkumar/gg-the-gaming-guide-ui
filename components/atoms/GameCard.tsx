import {extractImageData} from "@/helpers/helper";
import {IMAGE_SIZE} from "@/types/enums";
import {StrapiImageData} from "@/types/types";
import {useRouter} from "next/router";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

interface Props {
    gameName: string;
    banner: StrapiImageData;
}

export default function GameCard({gameName, banner}: Props) {
    const navigate = useRouter();

    function handleOnClick() {
        navigate.push("/mk11Ultimate");
    }

    const {width, height, src} = extractImageData(banner, IMAGE_SIZE.SMALL);
    return (

        <Card className={`cursor-pointer`}
              onClick={handleOnClick}
        >
            <CardMedia
                sx={{
                    maxWidth: width,
                    width: "100%",
                    height: height
                }}
                image={src}
                title={gameName}
                className={'object-cover'}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {gameName}
                </Typography>
            </CardContent>
        </Card>
    );
}
