import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BrandHeader } from '../components/AppChrome';
import { Eyebrow, Pill, PrimaryButton, SectionCard, text } from '../components/UI';
import { colors, radius, spacing } from '../theme';

export function ReflectionScreen({ onProfile }: { onProfile?: () => void }) {
  const [choice, setChoice] = useState<'silence' | 'later' | null>(null);
  const [done, setDone] = useState(false);

  return (
    <View style={styles.page}>
      <BrandHeader title="Modo Aprendizagem" onProfile={onProfile} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.closing}>
          <Eyebrow icon="star" color={colors.primaryContainer}>Fechamento de ciclo</Eyebrow>
          <Text style={styles.closingQuote}>“Você não passou 40 minutos longe do celular. Você transformou 40 minutos de celular em aprendizagem.”</Text>
          <Pill tone="mint" icon="check-circle">Sessão Concluída com Presença</Pill>
        </View>

        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop' }} style={styles.photo} imageStyle={{ borderRadius: radius.card }}>
          <Text style={styles.photoLabel}>Ritmo autônomo cultivado hoje</Text>
        </ImageBackground>

        <View style={styles.heading}>
          <Text style={text.h2}>Meu Foco Consciente</Text>
          <Pill icon="pie-chart">Relatório Ágil</Pill>
        </View>

        <SectionCard style={styles.metricsCard}>
          <View style={styles.metricTop}>
            <View>
              <Eyebrow color={colors.muted}>Tempo dedicado</Eyebrow>
              <Text style={styles.minutes}>40 <Text style={styles.min}>min</Text></Text>
              <Text style={text.small}>34 min em foco profundo contínuo</Text>
            </View>
            <PresenceRing />
          </View>

          <View style={styles.bar}><View style={styles.barFill} /></View>
          <View style={styles.barLabels}>
            <Text style={styles.barLabel}>85% Atenção Plena</Text>
            <Text style={styles.barLabel}>15% Transição Ágil</Text>
          </View>

          <View style={styles.statRow}>
            <Metric label="Resiliência" value="2" caption="Interrupções voluntárias gerenciadas" icon="shield" />
            <Metric label="Produção" value="1" caption="Síntese autoral criada no caderno" icon="file-text" />
          </View>
        </SectionCard>

        <View style={styles.insight}>
          <View style={styles.insightTop}>
            <View style={styles.bulb}><Feather name="zap" size={20} color={colors.white} /></View>
            <View style={{ flex: 1 }}>
              <Eyebrow color={colors.amberStrong}>Insight de hábito</Eyebrow>
              <Text style={styles.insightTitle}>Sua maior interrupção durante os estudos foram notificações de mensagens.</Text>
            </View>
          </View>
          <View style={styles.ask}>
            <Text style={styles.askText}>{choice === 'silence' ? 'Notificações serão silenciadas nas próximas sessões.' : choice === 'later' ? 'Tudo bem. Você poderá alterar isso quando quiser.' : 'Quer silenciar notificações automaticamente nas próximas sessões de estudo?'}</Text>
            {!choice && (
              <View style={styles.actionRow}>
                <PrimaryButton style={{ flex: 1 }} onPress={() => setChoice('silence')} icon="bell-off">Silenciar</PrimaryButton>
                <PrimaryButton tone="soft" style={{ flex: 1 }} onPress={() => setChoice('later')}>Agora não</PrimaryButton>
              </View>
            )}
          </View>
        </View>


        <PrimaryButton onPress={() => setDone(true)} icon="check-square">Concluir & Registrar Aprendizado</PrimaryButton>
        {done && (
          <View style={styles.done}>
            <Feather name="check" size={16} color={colors.white} />
            <Text style={styles.doneText}>Sessão registrada. Até a próxima aprendizagem consciente.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function PresenceRing() {
  return (
    <View style={styles.ring}>
      <Text style={styles.ringValue}>85%</Text>
      <Text style={styles.ringLabel}>presença</Text>
    </View>
  );
}

function Metric({ label, value, caption, icon }: { label: string; value: string; caption: string; icon: keyof typeof Feather.glyphMap }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}><Feather name={icon} size={12} /> {label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricCaption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  closing: { padding: spacing.lg, gap: spacing.md, borderRadius: radius.card, backgroundColor: colors.mintStrong },
  closingQuote: { color: colors.primary, fontSize: 24, lineHeight: 32, letterSpacing: -0.5, fontWeight: '800' },
  photo: { height: 140, borderRadius: radius.card, backgroundColor: '#819F91', padding: spacing.md, justifyContent: 'flex-end' },
  photoLabel: { color: colors.white, fontSize: 13, fontWeight: '800' },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricsCard: { gap: spacing.md },
  metricTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  minutes: { color: colors.primary, fontSize: 36, lineHeight: 42, fontWeight: '800', marginTop: 4 },
  min: { fontSize: 16, fontWeight: '600', color: colors.muted },
  ring: { width: 84, height: 84, borderRadius: 42, borderWidth: 8, borderColor: colors.amber, borderLeftColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  ringValue: { fontSize: 18, color: colors.primary, fontWeight: '800' },
  ringLabel: { fontSize: 10, color: colors.muted, fontWeight: '700', textTransform: 'uppercase' },
  bar: { height: 10, backgroundColor: colors.line, borderRadius: 99, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.primaryContainer, width: '85%', borderRadius: 99 },
  barLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  barLabel: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  statRow: { flexDirection: 'row', gap: spacing.sm },
  metric: { flex: 1, padding: spacing.md, borderRadius: radius.soft, backgroundColor: colors.mint },
  metricLabel: { color: colors.amberStrong, fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  metricValue: { color: colors.primary, fontSize: 24, fontWeight: '800', marginTop: 8 },
  metricCaption: { color: colors.muted, fontSize: 13, lineHeight: 18, marginTop: 4 },
  insight: { borderRadius: radius.card, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.amberSoft },
  insightTop: { flexDirection: 'row', gap: 12 },
  bulb: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.amberStrong, justifyContent: 'center', alignItems: 'center' },
  insightTitle: { marginTop: 4, color: colors.primary, fontSize: 16, lineHeight: 22, fontWeight: '800' },
  ask: { backgroundColor: colors.white, padding: spacing.md, borderRadius: radius.soft, gap: spacing.md },
  askText: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  actionRow: { flexDirection: 'row', gap: spacing.sm },
  trustTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  privacyBox: { padding: spacing.lg, borderRadius: radius.soft, backgroundColor: colors.mint, gap: spacing.sm },
  never: { backgroundColor: colors.dangerSoft },
  privacyHeadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  privacyHeading: { color: colors.primary, fontSize: 16, fontWeight: '800' },
  privacyText: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  guarantee: { alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
  done: { padding: spacing.md, backgroundColor: colors.primaryContainer, borderRadius: radius.soft, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  doneText: { color: colors.white, textAlign: 'center', fontSize: 14, fontWeight: '700' },
});
