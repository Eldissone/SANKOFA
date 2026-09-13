import type { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

export function Pill({ children, icon, tone = 'mint', style }: { children: ReactNode; icon?: keyof typeof Feather.glyphMap; tone?: 'mint' | 'amber' | 'dark'; style?: StyleProp<ViewStyle> }) {
  const tones = { mint: styles.pillMint, amber: styles.pillAmber, dark: styles.pillDark };
  const textTones = { mint: styles.pillText, amber: styles.pillAmberText, dark: styles.pillDarkText };
  return (
    <View style={[styles.pill, tones[tone], style]}>
      {icon && <Feather name={icon} size={12} style={[styles.pillIcon, textTones[tone]]} />}
      <Text style={[styles.pillTextBase, textTones[tone]]}>{children}</Text>
    </View>
  );
}

export function PrimaryButton({ children, icon, onPress, tone = 'dark', style }: { children: ReactNode; icon?: keyof typeof Feather.glyphMap; onPress: () => void; tone?: 'dark' | 'amber' | 'soft'; style?: StyleProp<ViewStyle> }) {
  const tones = { dark: styles.buttonDark, amber: styles.buttonAmber, soft: styles.buttonSoft };
  const textTones = { dark: styles.buttonDarkText, amber: styles.buttonAmberText, soft: styles.buttonSoftText };
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, tones[tone], style, pressed && styles.pressed]}>
      {icon && <Feather name={icon} size={18} style={[styles.buttonIcon, textTones[tone]]} />}
      <Text style={[styles.buttonText, textTones[tone]]}>{children}</Text>
    </Pressable>
  );
}

export function SectionCard({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Eyebrow({ children, icon, color = colors.primaryContainer }: { children: ReactNode; icon?: keyof typeof Feather.glyphMap; color?: string }) {
  return (
    <View style={styles.eyebrowRow}>
      {icon && <Feather name={icon} size={14} color={color} />}
      <Text style={[styles.eyebrow, { color }]}>{children}</Text>
    </View>
  );
}

export const text = StyleSheet.create({
  h1: { color: colors.primary, fontSize: 32, lineHeight: 38, letterSpacing: -1, fontWeight: '800' },
  h2: { color: colors.primary, fontSize: 22, lineHeight: 28, letterSpacing: -0.6, fontWeight: '800' },
  h3: { color: colors.primary, fontSize: 18, lineHeight: 24, fontWeight: '700' },
  body: { color: colors.muted, fontSize: 16, lineHeight: 24 },
  small: { color: colors.muted, fontSize: 13, lineHeight: 18 },
});

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: radius.card, padding: spacing.lg, shadowColor: colors.primary, shadowOpacity: 0.05, shadowRadius: 15, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  pill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6, gap: 6 },
  pillIcon: { marginTop: -1 },
  pillMint: { backgroundColor: colors.mint }, pillAmber: { backgroundColor: colors.amberSoft }, pillDark: { backgroundColor: colors.primaryContainer },
  pillTextBase: { fontSize: 12, fontWeight: '700', letterSpacing: 0.2 },
  pillText: { color: colors.primaryContainer }, pillAmberText: { color: colors.amberStrong }, pillDarkText: { color: colors.white },
  button: { minHeight: 54, flexDirection: 'row', paddingHorizontal: 20, borderRadius: radius.button, justifyContent: 'center', alignItems: 'center', gap: 8 },
  buttonIcon: { },
  buttonDark: { backgroundColor: colors.primaryContainer, shadowColor: colors.primaryContainer, shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 }, 
  buttonAmber: { backgroundColor: colors.amber, shadowColor: colors.amber, shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 }, 
  buttonSoft: { backgroundColor: colors.mintStrong },
  buttonText: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  buttonDarkText: { color: colors.white }, buttonAmberText: { color: colors.ink }, buttonSoftText: { color: colors.primaryContainer },
  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eyebrow: { fontSize: 12, lineHeight: 16, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase' },
});
