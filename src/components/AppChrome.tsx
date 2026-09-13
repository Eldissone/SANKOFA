import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

export type ScreenName = 'login' | 'home' | 'focus' | 'learn' | 'create' | 'reflect' | 'stats';

const items: Array<{ key: ScreenName; icon: keyof typeof Feather.glyphMap; label: string }> = [
  { key: 'focus', icon: 'clock', label: 'Foco' },
  { key: 'learn', icon: 'book-open', label: 'Aprender' },
  { key: 'create', icon: 'edit-3', label: 'Criar' },
  { key: 'reflect', icon: 'bar-chart-2', label: 'Refletir' },
];

export function BrandHeader({ title, back, onBack, onProfile }: { title: string; back?: boolean; onBack?: () => void; onProfile?: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {back && (
          <Pressable accessibilityRole="button" onPress={onBack} hitSlop={12} style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}>
            <Feather name="chevron-left" size={28} color={colors.primary} />
          </Pressable>
        )}
        <View style={styles.logo}>
          <Feather name="compass" size={20} color={colors.amber} />
        </View>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
      </View>
      <Pressable onPress={onProfile} hitSlop={12} style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}>
        <Feather name="user" size={18} color={colors.primaryContainer} />
      </Pressable>
    </View>
  );
}

export function BottomNav({ active, onChange }: { active: ScreenName; onChange: (screen: ScreenName) => void }) {
  return (
    <View style={styles.nav}>
      {items.map((item) => {
        const selected = active === item.key;
        return (
          <Pressable key={item.key} accessibilityRole="tab" accessibilityState={{ selected }} style={styles.navItem} onPress={() => onChange(item.key)}>
            <View style={[styles.navIconContainer, selected && styles.navIconContainerSelected]}>
              <Feather name={item.icon} size={22} color={selected ? colors.primaryContainer : colors.muted} />
            </View>
            <Text style={[styles.navLabel, selected && styles.navLabelSelected]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 72, backgroundColor: colors.surfaceSoft, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.line },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  logo: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.primaryContainer, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, lineHeight: 25, fontWeight: '800', color: colors.primary, flexShrink: 1 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mintStrong, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  backBtn: { marginRight: 4 },
  pressed: { opacity: 0.7 },
  nav: { height: 80, paddingHorizontal: spacing.sm, paddingBottom: 12, paddingTop: 8, backgroundColor: colors.surfaceSoft, borderTopWidth: 1, borderRadius: radius.card, borderColor: colors.line, flexDirection: 'row', justifyContent: 'space-around' },
  navItem: { minWidth: 64, justifyContent: 'center', alignItems: 'center', gap: 4 },
  navIconContainer: { width: 44, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  navIconContainerSelected: { backgroundColor: colors.mintStrong },
  navLabel: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  navLabelSelected: { color: colors.primaryContainer },
});
