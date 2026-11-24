import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/colors';
import Header from '../components/Header';
import RecipeImage from '../components/RecipeImage';

export default function RecipeDetailScreen({
  recipe,
  isSaved,
  checkedIngredients = [],
  onToggleIngredient,
  checkedSteps = [],
  onToggleStep,
  onToggleSave,
  onBack,
  onOpenSaved,
  savedCount = 0,
}) {
  if (!recipe) return null;

  return (
    <View style={styles.container}>
      <Header
        title="Recipe Details"
        onBack={onBack}
        onOpenSaved={onOpenSaved}
        savedCount={savedCount}
      />

      {/* Visual Art Hero Box */}
      <View style={[styles.heroArt, { backgroundColor: recipe.color }]}>
        <RecipeImage recipe={recipe} imageStyle={styles.heroImage} emojiStyle={styles.heroEmoji} />
      </View>

      {/* Title & Metadata */}
      <View style={styles.headerInfo}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>
            {recipe.category.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.recipeTitle}>{recipe.name}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
      </View>

      {/* Quick Stats Grid */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Ionicons name="time-outline" size={20} color={COLORS.green} />
          <Text style={styles.statValue}>{recipe.time}</Text>
          <Text style={styles.statLabel}>Prep time</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statBox}>
          <Ionicons name="people-outline" size={20} color={COLORS.green} />
          <Text style={styles.statValue}>{recipe.servings} servings</Text>
          <Text style={styles.statLabel}>Portions</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statBox}>
          <Ionicons name="flame-outline" size={20} color={COLORS.green} />
          <Text style={styles.statValue}>{recipe.difficulty}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
      </View>

      {/* Ingredients Section (Interactive Checklist) */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.sectionSub}>Tap to check off as you prep</Text>
        </View>

        <View style={styles.ingredientsCard}>
          {recipe.ingredients.map((ing, idx) => {
            const isChecked = checkedIngredients.includes(idx);
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.ingredientItem,
                  idx < recipe.ingredients.length - 1 && styles.borderBottom,
                ]}
                onPress={() => onToggleIngredient(idx)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={isChecked ? 'checkbox' : 'square-outline'}
                  size={21}
                  color={isChecked ? COLORS.green : COLORS.mutedLight}
                />
                <Text
                  style={[
                    styles.ingredientText,
                    isChecked && styles.ingredientChecked,
                  ]}
                >
                  {ing}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Instructions Section (Interactive Step-by-Step) */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.sectionSub}>Tap step when completed</Text>
        </View>

        <View style={styles.stepsContainer}>
          {recipe.steps.map((step, idx) => {
            const isDone = checkedSteps.includes(idx);
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.stepItem, isDone && styles.stepItemDone]}
                onPress={() => onToggleStep(idx)}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.stepBadge,
                    isDone && styles.stepBadgeDone,
                  ]}
                >
                  {isDone ? (
                    <Ionicons name="checkmark" size={16} color={COLORS.white} />
                  ) : (
                    <Text style={styles.stepBadgeText}>
                      {String(idx + 1).padStart(2, '0')}
                    </Text>
                  )}
                </View>

                <Text
                  style={[styles.stepText, isDone && styles.stepTextDone]}
                >
                  {step}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Save to Favorites Button */}
      <TouchableOpacity
        style={[styles.saveActionBtn, isSaved && styles.savedActiveBtn]}
        onPress={() => onToggleSave(recipe.id)}
        activeOpacity={0.85}
      >
        <Ionicons
          name={isSaved ? 'heart' : 'heart-outline'}
          size={20}
          color={isSaved ? COLORS.white : COLORS.cream}
        />
        <Text style={styles.saveActionText}>
          {isSaved ? 'Saved to Favorites' : 'Save to Favorites'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  heroArt: {
    height: 200,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.soft,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroEmoji: {
    fontSize: 90,
  },
  headerInfo: {
    marginBottom: 18,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.sand,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.greenLight,
    letterSpacing: 1,
  },
  recipeTitle: {
    color: COLORS.ink,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 33,
    marginBottom: 10,
  },
  description: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  statsRow: {
    backgroundColor: COLORS.sand,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  statValue: {
    color: COLORS.ink,
    fontWeight: '800',
    fontSize: 14,
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
  },
  section: {
    marginBottom: 26,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.ink,
  },
  sectionSub: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '600',
  },
  ingredientsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 6,
    ...SHADOWS.soft,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sand,
  },
  ingredientText: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
  },
  ingredientChecked: {
    color: COLORS.mutedLight,
    textDecorationLine: 'line-through',
  },
  stepsContainer: {
    gap: 12,
  },
  stepItem: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  stepItemDone: {
    backgroundColor: COLORS.sand,
    borderColor: 'transparent',
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: COLORS.peach,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeDone: {
    backgroundColor: COLORS.green,
  },
  stepBadgeText: {
    color: COLORS.ink,
    fontWeight: '900',
    fontSize: 13,
  },
  stepText: {
    color: COLORS.ink,
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
  stepTextDone: {
    color: COLORS.muted,
    textDecorationLine: 'line-through',
  },
  saveActionBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    ...SHADOWS.soft,
  },
  savedActiveBtn: {
    backgroundColor: COLORS.danger,
  },
  saveActionText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 15,
  },
});

