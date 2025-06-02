import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { getPokemonsById } from "../store/modules/pokemons/pokemons.Slice";

import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Slider } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

import { IconFavorite } from "../components/IconFavorite";

export function Pokemon() {
  const params = useParams();
  const pokemon = useAppSelector((state) =>
    getPokemonsById(state.pokemons, Number(params.pokemonId))
  );

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
          {pokemon ? (
            <Card
              sx={{
                minWidth: "60%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.65)",
                "&:hover": {
                  transform: "none",
                },
              }}>
              <CardActionArea>
                <Typography fontSize={"2rem"} position={"absolute"} m={"1rem"}>
                  #{pokemon.id}
                </Typography>
                <CardMedia
                  component="img"
                  height="210"
                  sx={{ width: "auto", margin: "0 auto", mt: "1rem" }}
                  image={pokemon.image}
                  alt={pokemon.name}
                />
                <CardContent>
                  <Typography
                    variant="h2"
                    textAlign={"center"}
                    fontWeight={"bolder"}>
                    {pokemon.name}
                  </Typography>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 4, sm: 5, md: 6 }}
                    justifyContent={"center"}>
                    <Typography textAlign={"center"} fontSize={"1.7rem"}>
                      {pokemon.size} Hectograms <br></br>{" "}
                      <span style={{ fontSize: "1.2rem", color: "#C4820C" }}>
                        Weight
                      </span>
                    </Typography>
                    <Typography textAlign={"center"} fontSize={"1.7rem"}>
                      {pokemon.height} Decimetres <br></br>{" "}
                      <span style={{ fontSize: "1.2rem", color: "#C4820C" }}>
                        Height
                      </span>
                    </Typography>
                  </Grid>
                  <Typography variant="h4" textAlign={"center"} sx={{ mt: 3 }}>
                    Habilities
                  </Typography>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 4, sm: 5, md: 6 }}
                    justifyContent={"center"}>
                    {pokemon.habilitis.map(
                      (hability: { habilitiName: string }) => (
                        <Typography textAlign={"center"} fontSize={"1.7rem"}>
                          {hability.habilitiName}
                        </Typography>
                      )
                    )}
                  </Grid>

                  <Typography variant="h4" textAlign={"center"} sx={{ mt: 3 }}>
                    Base Stats
                  </Typography>
                  <Stack
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100%"}
                    mt={2}>
                    {pokemon.stats.map(
                      (stat: { statName: string; strength: number }) => (
                        <Box key={stat.statName} sx={{ mb: 2 }} width={"70%"}>
                          <Typography
                            variant="body1"
                            textAlign={"center"}
                            fontWeight={"bold"}>
                            {stat.statName}: {stat.strength}
                          </Typography>
                          <Slider
                            value={stat.strength}
                            min={0}
                            max={270}
                            sx={{
                              pointerEvents: "none",
                              "& .MuiSlider-thumb": {
                                width: "0px",
                                height: "0px",
                              },
                              "& .MuiSlider-track": {
                                height: "10px",
                                backgroundColor: "#f8240dc3",
                              },
                              "& .MuiSlider-rail": {
                                height: "10px",
                                backgroundColor: "white",
                              },
                            }}
                          />
                        </Box>
                      )
                    )}
                  </Stack>
                </CardContent>
              </CardActionArea>
              <IconFavorite pokemon={pokemon} />
            </Card>
          ) : (
            <Typography>Pokemon não encontrado</Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
