import CharacterCard from "@/components/atoms/CharacterCard";
import {useRouter} from "next/router";
import {MKCharacter} from "@/types/mkCharacter";
import Grid from "@mui/material/Unstable_Grid2";

interface Props {
    data: MKCharacter[];
}

export default function CharacterList({data}: Props) {
    const navigate = useRouter();

    function handleCharacterClick(id: number) {
        navigate.push("/mkCharacter/" + id);
    }

    return (
        <>
            <Grid container spacing={2}>
                {data?.map((item: MKCharacter) => {
                    const id = item?.id;
                    const {
                        name,
                        image: {data},
                    } = item?.attributes;
                    return (
                        <Grid
                            key={id}
                            xs={6} sm={4} md={3} lg={2}>
                            <CharacterCard
                                name={name}
                                id={id}
                                image={data}
                                onClick={handleCharacterClick}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}
