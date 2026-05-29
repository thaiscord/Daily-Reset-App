import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { mindsetCards, mindsetCategories } from '../../data/mindsetContent';
import { useProgress } from '../../hooks/useProgress';
import { Colors, Typography, Spacing, Radii } from '../../theme';

const categoryColors: Record<string, string> = {
  focus: '#4A90D9',
  discipline: '#C9A84C',
  confidence: '#7B68EE',
  productivity: '#4CAF50',
  emotional: '#F44336',
  detox: '#00BCD4',
};

export default function MindsetScreen() {
  const router = useRouter();
  const { progress } = useProgress();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<typeof mindsetCards[0] | null>(null);

  const filtered = activeCategory
    ? mindsetCards.filter(c => c.category === activeCategory)
    : mindsetCards;

  const handleCardPress = (card: typeof mindsetCards[0]) => {
    if (card.isPremium && !progress.isPremium) {
      router.push('/paywall');
      return;
    }
    setSelectedCard(card);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#152038', Colors.background]} style={styles.header}>
          <Text style={styles.headerTitle}>Mindset</Text>
          <Text style={styles.headerSub}>Insights to rebuild your thinking</Text>
        </LinearGradient>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
          style={styles.categoryScroll}
        >
          <TouchableOpacity
            style={[styles.catChip, !activeCategory && styles.catChipActive]}
            onPress={() => setActiveCategory(null)}
          >
            <Text style={[styles.catLabel, !activeCategory && styles.catLabelActive]}>All</Text>
          </TouchableOpacity>
          {mindsetCategories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, activeCategory === cat.id && styles.catChipActive, activeCategory === cat.id && { borderColor: categoryColors[cat.id] }]}
              onPress={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            >
              <Ionicons name={cat.icon as any} size={14} color={activeCategory === cat.id ? categoryColors[cat.id] : Colors.textMuted} />
              <Text style={[styles.catLabel, activeCategory === cat.id && { color: categoryColors[cat.id] }]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.cards}>
          {filtered.map(card => (
            <TouchableOpacity
              key={card.id}
              style={styles.mindsetCard}
              onPress={() => handleCardPress(card)}
              activeOpacity={0.85}
            >
              <View style={styles.cardTop}>
                <View style={[styles.cardCategoryDot, { backgroundColor: categoryColors[card.category] }]} />
                <Text style={styles.cardCategory}>{card.category}</Text>
                <Text style={styles.cardReadTime}>{card.readTime} min read</Text>
                {card.isPremium && (
                  <View style={styles.premiumBadge}>
                    <Ionicons name="lock-closed" size={10} color={Colors.accent} />
                    <Text style={styles.premiumText}>PRO</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardPreview} numberOfLines={2}>
                {card.content}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal visible={!!selectedCard} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setSelectedCard(null)}>
        {selectedCard && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={[styles.cardCategoryDot, { backgroundColor: categoryColors[selectedCard.category] }]} />
              <Text style={styles.modalCategory}>{selectedCard.category}</Text>
              <TouchableOpacity onPress={() => setSelectedCard(null)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedCard.title}</Text>
              <Text style={styles.modalReadTime}>{selectedCard.readTime} min read</Text>
              <Text style={styles.modalBody}>{selectedCard.content}</Text>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.xxl },
  header: { paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.xl },
  headerTitle: { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.heavy, color: Colors.textPrimary, marginBottom: 4 },
  headerSub: { fontSize: Typography.sizes.md, color: Colors.textSecondary },
  categoryScroll: { marginBottom: Spacing.base },
  categories: { paddingHorizontal: Spacing.xl, gap: Spacing.sm, paddingVertical: Spacing.sm },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  catChipActive: { borderColor: Colors.accent, backgroundColor: Colors.accentDim },
  catLabel: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.medium, color: Colors.textMuted },
  catLabelActive: { color: Colors.accent },
  cards: { paddingHorizontal: Spacing.xl, gap: Spacing.md },
  mindsetCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  cardCategoryDot: { width: 8, height: 8, borderRadius: 4 },
  cardCategory: { fontSize: Typography.sizes.xs, color: Colors.textMuted, textTransform: 'capitalize', flex: 1 },
  cardReadTime: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.accentDim,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radii.full,
  },
  premiumText: { fontSize: 9, fontWeight: Typography.weights.bold, color: Colors.accent },
  cardTitle: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  cardPreview: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, lineHeight: 20 },
  modalContainer: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  modalCategory: { fontSize: Typography.sizes.sm, color: Colors.textMuted, textTransform: 'capitalize', flex: 1 },
  closeButton: { padding: Spacing.sm },
  modalContent: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: 60 },
  modalTitle: { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.heavy, color: Colors.textPrimary, lineHeight: 36, marginBottom: Spacing.sm },
  modalReadTime: { fontSize: Typography.sizes.sm, color: Colors.textMuted, marginBottom: Spacing.xl },
  modalBody: { fontSize: Typography.sizes.base, color: Colors.textSecondary, lineHeight: 28 },
});
