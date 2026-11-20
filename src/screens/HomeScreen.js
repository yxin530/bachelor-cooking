import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/colors';
import { CATEGORIES, KITCHEN_TIPS, RECIPES } from '../constants/recipes';

export default function HomeScreen({ onNavigate, onOpenRecipe, onSelectCategory }) {
  const featured = RECIPES.slice(0, 3);
  const dailyTip = KITCHEN_TIPS[0];

  return (
    <View style={styles.container}>
      {/* Top Greeting Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.eyebrow}>WELCOME TO</Text>
          <Text style={styles.brandTitle}>
            Bachelor<Text style={styles.peachDot}>.</Text>
          </Text>
          <Text style={styles.brandTitle}>Cooking</Text>
          <Text style={styles.brandTitle}>Recipes</Text>
        </View>

        <View style={styles.profileBadge}>
          <Text style={styles.profileEmoji}>👨‍🍳</Text>
        </View>
      </View>

      {/* Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.kickerRow}>
          <Ionicons name="sparkles" size={14} color={COLORS.lime} />
          <Text style={styles.kicker}>YOUR NEXT MEAL</Text>
        </View>

        <Text style={styles.heroTitle}>Simple food,{'\n'}big comfort.</Text>
        <Text style={styles.heroSubtitle}>
          Effortless recipes for when you want something delicious without the drama.
        </Text>

        <TouchableOpacity
          style={styles.heroBtn}
          onPress={() => onNavigate('list')}
          activeOpacity={0.85}
        >
          <Text style={styles.heroBtnText}>View Recipes</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.ink} />
        </TouchableOpacity>

        <View style={styles.doodleWrap}>
          <Ionicons name="restaurant-outline" size={88} color="rgba(242, 177, 139, 0.18)" />
        </View>
      </View>

      {/* Categories Horizontal Quick-Bar */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
          <TouchableOpacity
            key={cat}
            style={styles.categoryChip}
            onPress={() => {
              onSelectCategory(cat);
              onNavigate('list');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.categoryChipText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Recipes Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured for you</Text>
        <TouchableOpacity
          onPress={() => onNavigate('list')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.seeAllText}>See all ({RECIPES.length})</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredRow}
      >
        {featured.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={[styles.featuredCard, { backgroundColor: recipe.color }]}
            onPress={() => onOpenRecipe(recipe)}
            activeOpacity={0.88}
          >
            <View style={styles.featuredEmojiWrap}>
              <Text style={styles.featuredEmoji}>{recipe.emoji}</Text>
            </View>
            <Text style={styles.featuredCategory}>
              {recipe.category.toUpperCase()}
            </Text>
            <Text style={styles.featuredName} numberOfLines={2}>
              {recipe.name}
            </Text>
            <View style={styles.featuredMeta}>
              <Ionicons name="time-outline" size={12} color={COLORS.inkLight} />
              <Text style={styles.featuredMetaText}>{recipe.time}</Text>
              <Text style={styles.featuredMetaDot}>·</Text>
              <Ionicons name="flame-outline" size={12} color={COLORS.inkLight} />
              <Text style={styles.featuredMetaText}>{recipe.difficulty}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Daily Kitchen Tip */}
      <View style={styles.tipCard}>
        <View style={styles.tipIconWrap}>
          <Ionicons name="bulb-outline" size={24} color={COLORS.green} />
        </View>
        <View style={styles.tipContent}>
          <Text style={styles.tipTag}>{dailyTip.tag.toUpperCase()}</Text>
          <Text style={styles.tipTitle}>{dailyTip.title}</Text>
          <Text style={styles.tipBody}>{dailyTip.content}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  eyebrow: {
    color: COLORS.muted,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 2,
  },
  brandTitle: {
    color: COLORS.green,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 34,
  },
  peachDot: {
    color: COLORS.peach,
  },
  profileBadge: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: COLORS.lime,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  profileEmoji: {
    fontSize: 24,
  },
  heroCard: {
    backgroundColor: COLORS.green,
    borderRadius: 28,
    padding: 24,
    minHeight: 260,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 28,
    ...SHADOWS.medium,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  kicker: {
    color: COLORS.lime,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
  },
  heroTitle: {
    color: COLORS.cream,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 38,
    marginTop: 6,
  },
  heroSubtitle: {
    color: '#D4E2D9',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    width: '85%',
  },
  heroBtn: {
    backgroundColor: COLORS.lime,
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  heroBtnText: {
    color: COLORS.ink,
    fontWeight: '800',
    fontSize: 14,
  },
  doodleWrap: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.ink,
  },
  seeAllText: {
    color: COLORS.green,
    fontWeight: '700',
    fontSize: 13,
  },
  categoryRow: {
    gap: 10,
    paddingBottom: 24,
  },
  categoryChip: {
    backgroundColor: COLORS.sand,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  categoryChipText: {
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  featuredRow: {
    gap: 14,
    paddingBottom: 24,
  },
  featuredCard: {
    width: 200,
    borderRadius: 24,
    padding: 16,
    justifyContent: 'space-between',
    minHeight: 210,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    ...SHADOWS.soft,
  },
  featuredEmojiWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featuredEmoji: {
    fontSize: 30,
  },
  featuredCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.inkLight,
    letterSpacing: 1,
  },
  featuredName: {
    color: COLORS.ink,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
    marginTop: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
  },
  featuredMetaText: {
    color: COLORS.inkLight,
    fontSize: 12,
    fontWeight: '600',
  },
  featuredMetaDot: {
    color: COLORS.inkLight,
    marginHorizontal: 2,
  },
  tipCard: {
    backgroundColor: COLORS.sand,
    padding: 18,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginTop: 4,
  },
  tipIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipTag: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.greenLight,
    letterSpacing: 1,
    marginBottom: 2,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 4,
  },
  tipBody: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 18,
  },
});

