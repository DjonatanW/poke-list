import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { listPokemons } from "../store/modules/pokemons/pokemons.Slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchAllPokemons } from "../store/modules/pokemons/pokemons.action";
import { useNavigate } from "react-router-dom";
import { IconFavorite } from "../components/IconFavorite";
import {
  setLastVisitedPage,
  setNumberPage,
} from "../store/modules/navigation/navigation.slice";

export function Home() {
  const pokemons = useAppSelector((state) => listPokemons(state.pokemons));
  const pagination = useAppSelector((state) => state.pokemons.pagination);
  const navigation = useAppSelector((state) => state.navigation);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllPokemons({ page: navigation.lastVisitedPage, limit: 20 }));
  }, [dispatch, navigation]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setLastVisitedPage((value - 1) * pagination.limit));
    dispatch(setNumberPage(value));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
            {pokemons.map((pokemon) => (
              <Card sx={{ minWidth: "80%" }}>
                <Typography
                  fontSize={"2.5rem"}
                  position={"absolute"}
                  ml={"0.2rem"}>
                  #{pokemon.id}
                </Typography>
                <CardActionArea onClick={() => navigate(`${pokemon.id}`)}>
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
            ))}
          </Grid>
        </Stack>
        <Pagination
          onChange={handleChange}
          count={pagination.totalPages}
          page={navigation.lastNumberPage}
          color="primary"
          sx={{ mt: "1.5rem" }}
        />
      </Container>
    </Box>
  );
}
