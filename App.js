import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS } from './src/constants/colors';
import { RECIPES } from './src/constants/recipes';

// Components
import BottomNav from './src/components/BottomNav';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import RecipeListScreen from './src/screens/RecipeListScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import SavedScreen from './src/screens/SavedScreen';
import AboutScreen from './src/screens/AboutScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [savedIds, setSavedIds] = useState(['1', '4']); // Pre-saved initial favorites
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState([]);

  // Search and Category Filtering
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((r) => {
      const matchesCategory = category === 'All' || r.category === category;
      const lowerQuery = query.toLowerCase().trim();
      const matchesQuery =
        !lowerQuery ||
        r.name.toLowerCase().includes(lowerQuery) ||
        r.ingredients.some((ing) => ing.toLowerCase().includes(lowerQuery)) ||
        r.description.toLowerCase().includes(lowerQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  // Actions
  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCheckedIngredients([]);
    setCheckedSteps([]);
    setScreen('detail');
  };

  const handleToggleSave = (recipeId) => {
    setSavedIds((current) =>
      current.includes(recipeId)
        ? current.filter((id) => id !== recipeId)
        : [...current, recipeId]
    );
  };

  const handleToggleIngredient = (index) => {
    setCheckedIngredients((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    );
  };

  const handleToggleStep = (index) => {
    setCheckedSteps((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />

      <View style={styles.rootContainer}>
        <ScrollView
          key={screen === 'detail' ? `detail-${selectedRecipe?.id}` : screen}
          contentContainerStyle={[
            styles.scrollContent,
            screen === 'detail' ? styles.detailScrollContent : styles.tabScrollContent,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {screen === 'home' && (
            <HomeScreen
              onNavigate={setScreen}
              onOpenRecipe={handleOpenRecipe}
              onSelectCategory={setCategory}
            />
          )}

          {screen === 'list' && (
            <RecipeListScreen
              recipes={filteredRecipes}
              selectedCategory={category}
              onSelectCategory={setCategory}
              searchQuery={query}
              onSearchChange={setQuery}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onOpenRecipe={handleOpenRecipe}
              onNavigate={setScreen}
            />
          )}

          {screen === 'saved' && (
            <SavedScreen
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onOpenRecipe={handleOpenRecipe}
              onNavigate={setScreen}
            />
          )}

          {screen === 'about' && (
            <AboutScreen
              onNavigate={setScreen}
              savedCount={savedIds.length}
            />
          )}

          {screen === 'detail' && (
            <RecipeDetailScreen
              recipe={selectedRecipe}
              isSaved={savedIds.includes(selectedRecipe?.id)}
              checkedIngredients={checkedIngredients}
              onToggleIngredient={handleToggleIngredient}
              checkedSteps={checkedSteps}
              onToggleStep={handleToggleStep}
              onToggleSave={handleToggleSave}
              onBack={() => setScreen('list')}
              onOpenSaved={() => setScreen('saved')}
              savedCount={savedIds.length}
            />
          )}
        </ScrollView>

        {/* Floating Bottom Nav - visible on main tabs */}
        {screen !== 'detail' && (
          <BottomNav
            currentScreen={screen}
            onNavigate={setScreen}
            savedCount={savedIds.length}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  rootContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  tabScrollContent: {
    paddingBottom: 110, // Space for floating bottom nav
  },
  detailScrollContent: {
    paddingBottom: 40,
  },
});
