import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/colors';

export default function RecipeCard({ recipe, isSaved, onToggleSave, onOpen }) {
  if (!recipe) return null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onOpen(recipe)}
      activeOpacity={0.88}
    >
      {/* Visual Art / Emoji Banner */}
      <View style={[styles.artBanner, { backgroundColor: recipe.color }]}>
        <Text style={styles.artEmoji}>{recipe.emoji}</Text>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={(e) => {
            e.stopPropagation();
            onToggleSave(recipe.id);
          }}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isSaved ? 'heart' : 'heart-outline'}
            size={18}
            color={isSaved ? COLORS.danger : COLORS.ink}
          />
        </TouchableOpacity>
      </View>

      {/* Information Area */}
      <View style={styles.content}>
        <View style={styles.badgeRow}>
          <Text style={styles.categoryBadge}>
            {recipe.category.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Ionicons name="time-outline" size={13} color={COLORS.muted} />
            <Text style={styles.metaText}>{recipe.time}</Text>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.metaPill}>
            <Ionicons name="flame-outline" size={13} color={COLORS.muted} />
            <Text style={styles.metaText}>{recipe.difficulty}</Text>
          </View>

          {recipe.calories && (
            <>
              <View style={styles.metaDivider} />
              <View style={styles.metaPill}>
                <Ionicons name="flash-outline" size={12} color={COLORS.muted} />
                <Text style={styles.metaText}>{recipe.calories}</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    minHeight: 126,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  artBanner: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  artEmoji: {
    fontSize: 46,
  },
  saveBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 14,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  content: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  badgeRow: {
    marginBottom: 4,
  },
  categoryBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.greenLight,
    letterSpacing: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
    lineHeight: 21,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
  },
  metaDivider: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.mutedLight,
  },
});

