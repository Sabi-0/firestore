import React from "react";
import ProductsList from "./components/RecipeList";
import AddProduct from "./components/AddRecipe";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Resetas
      </Typography>
      <AddProduct />
      <ProductsList />
    </Container>
  );
}

export default App;
