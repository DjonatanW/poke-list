import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllPokemons } from "../store/modules/pokemons/pokemons.action";
import {
  setLastVisitedPage,
  setNumberPage,
} from "../store/modules/navigation/navigation.slice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const lastVisitedPage = useAppSelector(
    (state) => state.navigation.lastVisitedPage
  );

  const handlePokemonClick = () => {
    dispatch(setLastVisitedPage(0));
    dispatch(setNumberPage(1));
    dispatch(fetchAllPokemons({ page: 0, limit: 20 }));
    navigate("/");
  };

  const handleVoltarClick = () => {
    dispatch(fetchAllPokemons({ page: lastVisitedPage || 0, limit: 20 }));
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 3 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            onClick={handlePokemonClick}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}>
            POKÉMON
          </Typography>
          {location.pathname !== "/" && (
            <Button
              onClick={handleVoltarClick}
              color="inherit"
              sx={{ mr: "1rem" }}>
              Voltar
            </Button>
          )}
          <Button onClick={() => navigate("/pokedex")} color="inherit">
            Pokedex
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
