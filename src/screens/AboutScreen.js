import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/colors';
import Header from '../components/Header';

export default function AboutScreen({ onNavigate, savedCount = 0 }) {
  const pillars = [
    {
      icon: 'flash-outline',
      title: 'Fast & Realistic',
      desc: 'Most recipes take under 25 minutes from chopping board to your dinner plate.',
    },
    {
      icon: 'basket-outline',
      title: 'Everyday Groceries',
      desc: 'No rare ingredients you will only use once. Everything is available at any local mart.',
    },
    {
      icon: 'sparkles-outline',
      title: 'Minimal Dishes',
      desc: 'One-pan, one-pot, and single-bowl meals engineered to keep dishwashing painless.',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="About Bachelor Cooking"
        onBack={() => onNavigate('home')}
        onOpenSaved={() => onNavigate('saved')}
        savedCount={savedCount}
      />

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.chefBadge}>
          <Text style={styles.chefEmoji}>🍳</Text>
        </View>
        <Text style={styles.heroHeading}>Good food.{'\n'}Zero drama.</Text>
        <Text style={styles.heroText}>
          Bachelor Cooking was created for anyone who wants healthy, flavorful home-cooked meals without complicated techniques or culinary snobbery.
        </Text>
      </View>

      {/* Core Pillars */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Our Philosophy</Text>

        <View style={styles.pillarsContainer}>
          {pillars.map((pillar, idx) => (
            <View key={idx} style={styles.pillarCard}>
              <View style={styles.pillarIconCircle}>
                <Ionicons name={pillar.icon} size={22} color={COLORS.green} />
              </View>
              <View style={styles.pillarTextWrap}>
                <Text style={styles.pillarTitle}>{pillar.title}</Text>
                <Text style={styles.pillarDesc}>{pillar.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Kitchen Rules Box */}
      <View style={styles.rulesCard}>
        <View style={styles.rulesHeader}>
          <Ionicons name="bulb-outline" size={20} color={COLORS.green} />
          <Text style={styles.rulesTitle}>3 Golden Bachelor Rules</Text>
        </View>

        <View style={styles.ruleItem}>
          <Text style={styles.ruleNum}>01</Text>
          <Text style={styles.ruleText}>
            Keep garlic, eggs, and good olive oil stocked at all times.
          </Text>
        </View>

        <View style={styles.ruleItem}>
          <Text style={styles.ruleNum}>02</Text>
          <Text style={styles.ruleText}>
            Clean cutting boards while onions sauté so dinner ends cleanly.
          </Text>
        </View>

        <View style={styles.ruleItem}>
          <Text style={styles.ruleNum}>03</Text>
          <Text style={styles.ruleText}>
            Season boldly: taste sauces before serving and adjust salt and lemon.
          </Text>
        </View>
      </View>

      <Text style={styles.footerNote}>
        Crafted with React Native & Expo • Version 1.0.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  heroBanner: {
    backgroundColor: COLORS.green,
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  chefBadge: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.lime,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  chefEmoji: {
    fontSize: 28,
  },
  heroHeading: {
    color: COLORS.cream,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
    marginBottom: 12,
  },
  heroText: {
    color: '#D4E2D9',
    fontSize: 14,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 14,
  },
  pillarsContainer: {
    gap: 12,
  },
  pillarCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  pillarIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.sand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarTextWrap: {
    flex: 1,
  },
  pillarTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 3,
  },
  pillarDesc: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 18,
  },
  rulesCard: {
    backgroundColor: COLORS.sand,
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
  },
  rulesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  ruleNum: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.peach,
  },
  ruleText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.ink,
    lineHeight: 19,
    fontWeight: '500',
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.mutedLight,
    marginTop: 8,
  },
});

