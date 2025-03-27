import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { TextField, Button, Box } from "@mui/material";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = "";

    if (image) {
      const imageRef = ref(storage, `recipes/${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    try {
      await addDoc(collection(db, "recipes"), { title, description, imageUrl });
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Error adding recipe:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleAddRecipe}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Add Recipe"}
      </Button>
    </Box>
  );
};

export default AddRecipe;
