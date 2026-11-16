import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { RECIPES } from '../constants/recipes';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function SavedScreen({
  savedIds,
  onToggleSave,
  onOpenRecipe,
  onNavigate,
}) {
  const savedRecipes = RECIPES.filter((r) => savedIds.includes(r.id));

  return (
    <View style={styles.container}>
      <Header
        title="Saved Recipes"
        onBack={() => onNavigate('home')}
        onOpenSaved={() => {}}
        savedCount={savedIds.length}
      />

      <View style={styles.introBox}>
        <Text style={styles.introTitle}>Your Kitchen Favorites</Text>
        <Text style={styles.introSubtitle}>
          Quick access to the meals you love cooking again and again.
        </Text>
      </View>

      {savedRecipes.length > 0 ? (
        savedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isSaved={true}
            onToggleSave={onToggleSave}
            onOpen={onOpenRecipe}
          />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="heart-outline" size={42} color={COLORS.peach} />
          </View>
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart icon on any recipe card to keep it handy for dinner tonight.
          </Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => onNavigate('list')}
            activeOpacity={0.8}
          >
            <Text style={styles.browseBtnText}>Explore Recipes</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.cream} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  introBox: {
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 4,
  },
  introSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: COLORS.sand,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  browseBtn: {
    backgroundColor: COLORS.green,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  browseBtnText: {
    color: COLORS.cream,
    fontSize: 14,
    fontWeight: '800',
  },
});

