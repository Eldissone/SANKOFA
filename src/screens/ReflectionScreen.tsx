import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BrandHeader } from '../components/AppChrome';
import { Eyebrow, Pill, PrimaryButton, SectionCard, text } from '../components/UI';
import { colors, radius, spacing } from '../theme';
import type { SessionResult } from '../../App';

export function ReflectionScreen({ onProfile, onDone, sessionResult }: {
  onProfile?: () => void;
  onDone?: () => void;
  sessionResult?: SessionResult | null;
}) {
  const [choice, setChoice] = useState<'silence' | 'later' | null>(null);
  const [done, setDone] = useState(false);

  const elapsedMin = sessionResult ? Math.floor(sessionResult.elapsedSec / 60) : 40;
  const goal = sessionResult?.goal ?? 'Biologia celular: Mitose vs Meiose';
  const intent = sessionResult?.intent ?? 'Estudar';
  const totalMin = sessionResult?.durationMin ?? 40;
  const notes = sessionResult?.notes ?? '';
  const pct = Math.min(100, Math.round((elapsedMin / totalMin) * 100));

  return (
    <View style={styles.page}>
      <BrandHeader title="Reflexao da Sessao" onProfile={onProfile} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.closing}>
          <Eyebrow icon="star" color={colors.primaryContainer}>Intencao: {intent}</Eyebrow>
          <Text style={styles.closingQuote}>{goal}</Text>
          <Pill tone="mint" icon="check-circle">Sessao Concluida com Presenca</Pill>
        </View>

        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop' }} style={styles.photo} imageStyle={{ borderRadius: radius.card }}>
          <Text style={styles.photoLabel}>Ritmo autonomo cultivado hoje</Text>
        </ImageBackground>

        <View style={styles.heading}>
          <Text style={text.h2}>Meu Foco Consciente</Text>
          <Pill icon="pie-chart">Relatorio Agil</Pill>
        </View>

        <SectionCard style={styles.metricsCard}>
          <View style={styles.metricTop}>
            <View>
              <Eyebrow color={colors.muted}>Tempo dedicado</Eyebrow>
              <Text style={styles.minutes}>{elapsedMin} <Text style={styles.min}>min</Text></Text>
              <Text style={text.small}>{elapsedMin} de {totalMin} min programados</Text>
            </View>
            <PresenceRing pct={pct} />
          </View>

          <View style={styles.bar}><View style={[styles.barFill, { width: `${pct}%` }]} /></View>
          <View style={styles.barLabels}>
            <Text style={styles.barLabel}>{pct}% Atencao Plena</Text>
            <Text style={styles.barLabel}>{100 - pct}% Transicao Agil</Text>
          </View>

          <View style={styles.statRow}>
            <Metric label="Duracao" value={`${totalMin}m`} caption="Sessao programada" icon="clock" />
            <Metric label="Concluido" value={`${pct}%`} caption="Meta cumprida na sessao" icon="check-circle" />
          </View>
        </SectionCard>

        {notes.length > 0 && (
          <SectionCard>
            <Eyebrow icon="edit-3" color={colors.primaryContainer}>Anotacoes da sessao</Eyebrow>
            <Text style={styles.notesText}>{notes}</Text>
          </SectionCard>
        )}

        <View style={styles.insight}>
          <View style={styles.insightTop}>
            <View style={styles.bulb}><Feather name="zap" size={20} color={colors.white} /></View>
            <View style={{ flex: 1 }}>
              <Eyebrow color={colors.amberStrong}>Insight de habito</Eyebrow>
              <Text style={styles.insightTitle}>Sua maior interrupcao durante os estudos foram notificacoes de mensagens.</Text>
            </View>
          </View>
          <View style={styles.ask}>
            <Text style={styles.askText}>{choice === 'silence' ? 'Notificacoes serao silenciadas nas proximas sessoes.' : choice === 'later' ? 'Tudo bem. Voce podera alterar isso quando quiser.' : 'Quer silenciar notificacoes automaticamente nas proximas sessoes de estudo?'}</Text>
            {!choice && (
              <View style={styles.actionRow}>
                <PrimaryButton style={{ flex: 1 }} onPress={() => setChoice('silence')} icon="bell-off">Silenciar</PrimaryButton>
                <PrimaryButton tone="soft" style={{ flex: 1 }} onPress={() => setChoice('later')}>Agora nao</PrimaryButton>
              </View>
            )}
          </View>
        </View>

        <PrimaryButton
          onPress={() => {
            setDone(true);
            if (onDone) setTimeout(onDone, 1200);
          }}
          icon="check-square"
        >
          Concluir e Registar nas Estatisticas
        </PrimaryButton>
        {done && (
          <View style={styles.done}>
            <Feather name="check" size={16} color={colors.white} />
            <Text style={styles.doneText}>Sessao registrada. Ate a proxima aprendizagem consciente.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function PresenceRing({ pct }: { pct: number }) {
  return (
    <View style={styles.ring}>
      <Text style={styles.ringValue}>{pct}%</Text>
      <Text style={styles.ringLabel}>presenca</Text>
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
  closingQuote: { color: colors.primary, fontSize: 20, lineHeight: 28, letterSpacing: -0.3, fontWeight: '800' },
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
  barFill: { height: '100%', backgroundColor: colors.primaryContainer, borderRadius: 99 },
  barLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  barLabel: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  statRow: { flexDirection: 'row', gap: spacing.sm },
  metric: { flex: 1, padding: spacing.md, borderRadius: radius.soft, backgroundColor: colors.mint },
  metricLabel: { color: colors.amberStrong, fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  metricValue: { color: colors.primary, fontSize: 24, fontWeight: '800', marginTop: 8 },
  metricCaption: { color: colors.muted, fontSize: 13, lineHeight: 18, marginTop: 4 },
  notesText: { color: colors.ink, fontSize: 14, lineHeight: 22, marginTop: spacing.sm },
  insight: { borderRadius: radius.card, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.amberSoft },
  insightTop: { flexDirection: 'row', gap: 12 },
  bulb: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.amberStrong, justifyContent: 'center', alignItems: 'center' },
  insightTitle: { marginTop: 4, color: colors.primary, fontSize: 16, lineHeight: 22, fontWeight: '800' },
  ask: { backgroundColor: colors.white, padding: spacing.md, borderRadius: radius.soft, gap: spacing.md },
  askText: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  actionRow: { flexDirection: 'row', gap: spacing.sm },
  done: { padding: spacing.md, backgroundColor: colors.primaryContainer, borderRadius: radius.soft, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  doneText: { color: colors.white, textAlign: 'center', fontSize: 14, fontWeight: '700' },
});
