import React, { useState } from 'react';
import { Image, Text } from 'react-native';

// Shows the recipe photo, or falls back to the emoji if there is no photo
// or the photo fails to load (e.g. no internet connection).
export default function RecipeImage({ recipe, imageStyle, emojiStyle }) {
  const [failed, setFailed] = useState(false);

  if (!recipe.image || failed) {
    return <Text style={emojiStyle}>{recipe.emoji}</Text>;
  }

  return (
    <Image
      source={{ uri: recipe.image }}
      style={imageStyle}
      resizeMode="cover"
      onError={() => setFailed(true)}
    />
  );
}
