import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

import { IconFavorite } from "../components/IconFavorite";
import { useAppSelector } from "../store/hooks";
import { listPokedex } from "../store/modules/pokedex/pokedex.slice";
import { useNavigate } from "react-router-dom";

export function Pokedex() {
  const pokedex = useAppSelector((state) => listPokedex(state.pokedex));
  const navigate = useNavigate();

  return (
    <Box component={"main"}>
      <Container
        sx={{
          width: "100%",
          maxWidth: "100%",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <Stack
          direction={"row"}
          sx={{ minWidth: "100%" }}
          justifyContent={"center"}
          mt={9}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ width: "100%" }}
            justifyContent={"center"}>
            {pokedex.length > 0 ? (
              pokedex.map((pokemon) => (
                <Card sx={{ minWidth: "80%" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      sx={{ width: "auto", margin: "0 auto", mt: "1rem" }}
                      image={pokemon.image}
                      alt={pokemon.name}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        textAlign={"center"}
                        fontWeight={"bolder"}>
                        {pokemon.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {pokemon.size} Hectograms
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <IconFavorite pokemon={pokemon} />
                </Card>
              ))
            ) : (
              <Typography fontSize={"1.5rem"} textAlign={"center"}>
                Você ainda não tem nenhum Pokemon favorito,<br></br> mas{" "}
                <Link
                  onClick={() => navigate("/pokemon")}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#806000",
                    "&:hover": {
                      color: "#ad8e33",
                    },
                  }}>
                  clique aqui
                </Link>{" "}
                para ir até a página e adicionar.
              </Typography>
            )}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
