import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { ScreenName } from '../components/AppChrome';

export function HomeScreen({ onBack, onNavigate }: { onBack?: () => void, onNavigate: (screen: ScreenName) => void }) {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={12}>
          <Feather name="arrow-left" size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Feather name="user" size={40} color={colors.white} />
        </View>
        <Text style={styles.name}>Estudante Sankofa</Text>
      </View>

      <View style={styles.actions}>
        <ActionCard onPress={() => onNavigate('focus')} title="Iniciar Sessão de Foco" subtitle="Entre em estado de fluxo" icon="plus" color={colors.mintStrong} />
        <ActionCard onPress={() => onNavigate('stats')} title="Minhas Estatísticas" subtitle="Desempenho e resiliência" icon="minus" color={colors.amber} />
      </View>


    </View>
  );
}

function ActionCard({ title, subtitle, icon, color, onPress }: { title: string; subtitle: string; icon: keyof typeof Feather.glyphMap; color: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.actionCard}>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Feather name={icon} size={20} color={colors.white} />
      </View>
    </Pressable>
  );
}

const CELL = 60;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface, paddingHorizontal: spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xl * 1.5 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: colors.primary },

  profileCard: { alignItems: 'center', backgroundColor: colors.surfaceSoft, padding: spacing.xl, borderRadius: radius.card, marginTop: spacing.xl, shadowColor: colors.primary, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  name: { fontSize: 22, fontWeight: '800', color: colors.primary },
  subtitle: { fontSize: 13, color: colors.muted, marginTop: 4 },

  actions: { marginTop: spacing.xl, gap: spacing.md },
  actionCard: { flexDirection: 'row', backgroundColor: colors.white, padding: spacing.lg, borderRadius: radius.card, alignItems: 'center', shadowColor: colors.primary, shadowOpacity: 0.03, shadowRadius: 10, elevation: 1 },
  actionText: { flex: 1 },
  actionTitle: { fontSize: 15, fontWeight: '800', color: colors.primary },
  actionSubtitle: { fontSize: 12, color: colors.muted, marginTop: 2 },
  actionIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },

  artContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: spacing.xl, paddingRight: spacing.sm },
  artRow: { flexDirection: 'row' },
  shape: { width: CELL, height: CELL, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },

  circle: { borderRadius: CELL / 2 },
  leafTopRight: { borderTopRightRadius: CELL, borderBottomLeftRadius: CELL },
  leafTopLeft: { borderTopLeftRadius: CELL, borderBottomRightRadius: CELL },
  leafBottomRight: { borderBottomRightRadius: CELL, borderTopLeftRadius: CELL },
  leafBottomLeft: { borderBottomLeftRadius: CELL, borderTopRightRadius: CELL },

  triangleUp: { backgroundColor: 'transparent', borderLeftWidth: CELL / 2, borderRightWidth: CELL / 2, borderBottomWidth: CELL, borderLeftColor: 'transparent', borderRightColor: 'transparent' },
  innerCircle: { width: CELL * 0.5, height: CELL * 0.5, borderRadius: CELL, backgroundColor: colors.amber },
});
