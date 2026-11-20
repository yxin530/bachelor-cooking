import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { CATEGORIES } from '../constants/recipes';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function RecipeListScreen({
  recipes,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  savedIds,
  onToggleSave,
  onOpenRecipe,
  onNavigate,
}) {
  return (
    <View style={styles.container}>
      <Header
        title="All Recipes"
        onBack={() => onNavigate('home')}
        onOpenSaved={() => onNavigate('saved')}
        savedCount={savedIds.length}
      />

      {/* Modern Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={COLORS.muted} />
        <TextInput
          placeholder="Search recipes, ingredients..."
          placeholderTextColor={COLORS.mutedLight}
          value={searchQuery}
          onChangeText={onSearchChange}
          style={styles.searchInput}
          autoCorrect={false}
          clearButtonMode="never"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => onSearchChange('')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={18} color={COLORS.muted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onSelectCategory(cat)}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.75}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Result Count */}
      <View style={styles.resultRow}>
        <Text style={styles.resultText}>
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
        </Text>
        {(searchQuery.length > 0 || selectedCategory !== 'All') && (
          <TouchableOpacity
            onPress={() => {
              onSearchChange('');
              onSelectCategory('All');
            }}
          >
            <Text style={styles.resetFilterText}>Reset filters</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Recipes List */}
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isSaved={savedIds.includes(recipe.id)}
            onToggleSave={onToggleSave}
            onOpen={onOpenRecipe}
          />
        ))
      ) : (
        /* Empty State */
        <View style={styles.emptyState}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="restaurant-outline" size={36} color={COLORS.muted} />
          </View>
          <Text style={styles.emptyTitle}>No matching recipes</Text>
          <Text style={styles.emptySubtitle}>
            Try searching for something else or clearing your category filter.
          </Text>
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              onSearchChange('');
              onSelectCategory('All');
            }}
          >
            <Text style={styles.clearBtnText}>Show All Recipes</Text>
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
  searchBar: {
    backgroundColor: COLORS.sand,
    borderRadius: 18,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '600',
  },
  chipsContainer: {
    gap: 8,
    paddingBottom: 18,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: COLORS.sand,
  },
  chipActive: {
    backgroundColor: COLORS.green,
  },
  chipText: {
    color: COLORS.muted,
    fontWeight: '700',
    fontSize: 13,
  },
  chipTextActive: {
    color: COLORS.cream,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  resultText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  resetFilterText: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: COLORS.sand,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  clearBtn: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  clearBtnText: {
    color: COLORS.cream,
    fontSize: 14,
    fontWeight: '800',
  },
});

