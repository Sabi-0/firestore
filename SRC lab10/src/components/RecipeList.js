import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "recipes"), (snapshot) => {
      setRecipes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleEdit = (recipe) => {
    setEditingRecipeId(recipe.id);
    setEditTitle(recipe.title);
    setEditDescription(recipe.description);
  };

  const handleSave = async (recipeId) => {
    try {
      await updateDoc(doc(db, "recipes", recipeId), {
        title: editTitle,
        description: editDescription,
      });
      setEditingRecipeId(null);
    } catch (err) {
      console.error("Error updating recipe:", err);
    }
  };

  const handleDelete = async (recipeId) => {
    try {
      await deleteDoc(doc(db, "recipes", recipeId));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  return (
    <List>
      {recipes.map((recipe) => (
        <ListItem key={recipe.id}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
            }}
          >
            {editingRecipeId === recipe.id ? (
              <>
                <TextField
                  label="Recipe Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <TextField
                  label="Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <Button onClick={() => handleSave(recipe.id)}>Save</Button>
                <Button onClick={() => setEditingRecipeId(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <ListItemText
                  primary={recipe.title}
                  secondary={recipe.description}
                />
                {recipe.imageUrl && (
                  <img
                    src={recipe.imageUrl}
                    alt="Recipe"
                    style={{ width: "100px", borderRadius: "5px" }}
                  />
                )}
                <IconButton onClick={() => handleEdit(recipe)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(recipe.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default RecipesList;
