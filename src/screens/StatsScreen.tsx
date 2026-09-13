import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BrandHeader } from '../components/AppChrome';
import { Eyebrow, SectionCard, text } from '../components/UI';
import { colors, radius, spacing } from '../theme';

// ─── Mock data ────────────────────────────────────────────────────────────────
const weeklyData = [
  { day: 'Seg', minutes: 45, intent: 'Estudar' },
  { day: 'Ter', minutes: 80, intent: 'Criar' },
  { day: 'Qua', minutes: 25, intent: 'Pesquisar' },
  { day: 'Qui', minutes: 60, intent: 'Estudar' },
  { day: 'Sex', minutes: 90, intent: 'Colaborar' },
  { day: 'Sáb', minutes: 40, intent: 'Me conectar' },
  { day: 'Dom', minutes: 0, intent: '' },
];

const intentColors: Record<string, string> = {
  'Estudar': '#0B5D4E',
  'Criar': '#D97706',
  'Pesquisar': '#10B981',
  'Colaborar': '#F59E0B',
  'Me conectar': '#546A62',
  '': '#DDF0E9',
};

const monthlyTrend = [30, 55, 40, 70, 60, 85, 75, 90, 65, 80, 95, 88, 72, 100];

const tabs = ['Semana', 'Mês', 'Hábitos'];

// ─── Bar Chart ────────────────────────────────────────────────────────────────
function BarChart({ data, selectedDay, onSelect }: {
  data: typeof weeklyData;
  selectedDay: number;
  onSelect: (i: number) => void;
}) {
  const maxMin = Math.max(...data.map(d => d.minutes), 1);
  return (
    <View style={bc.container}>
      {data.map((item, i) => {
        const pct = item.minutes / maxMin;
        const isSelected = selectedDay === i;
        const barColor = intentColors[item.intent] ?? colors.line;
        return (
          <Pressable key={item.day} style={bc.col} onPress={() => onSelect(i)}>
            <View style={bc.barTrack}>
              <View
                style={[
                  bc.bar,
                  {
                    height: `${Math.max(pct * 100, item.minutes > 0 ? 4 : 0)}%`,
                    backgroundColor: isSelected ? colors.amber : barColor,
                    opacity: item.minutes === 0 ? 0.3 : 1,
                  },
                ]}
              />
            </View>
            <Text style={[bc.label, isSelected && bc.labelSelected]}>{item.day}</Text>
            {isSelected && item.minutes > 0 && (
              <View style={bc.tooltip}>
                <Text style={bc.tooltipText}>{item.minutes}m</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const bc = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end', height: 130, gap: 6, paddingBottom: 24 },
  col: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end', position: 'relative' },
  barTrack: { flex: 1, width: '100%', justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: 6, minHeight: 0 },
  label: { fontSize: 10, color: colors.muted, fontWeight: '700', marginTop: 4, position: 'absolute', bottom: 0 },
  labelSelected: { color: colors.amberStrong },
  tooltip: { position: 'absolute', top: -28, backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  tooltipText: { color: colors.white, fontSize: 10, fontWeight: '800' },
});

// ─── Mini Line Trend ──────────────────────────────────────────────────────────
function LineTrend({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const W = 260;
  const H = 60;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - (v / max) * H,
  }));

  return (
    <View style={{ height: H + 12, marginTop: spacing.sm }}>
      <View style={{ position: 'absolute', width: W, height: H }}>
        {pts.slice(0, -1).map((pt, i) => {
          const next = pts[i + 1];
          const dx = next.x - pt.x;
          const dy = next.y - pt.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <View
              key={i}
              style={{
                position: 'absolute',
                left: pt.x,
                top: pt.y,
                width: len,
                height: 2,
                backgroundColor: colors.primaryContainer,
                borderRadius: 1,
                transform: [{ rotate: `${angle}deg` }],
                transformOrigin: '0 50%',
              }}
            />
          );
        })}
        {pts.map((pt, i) => (
          <View
            key={`dot-${i}`}
            style={{
              position: 'absolute',
              left: pt.x - 3,
              top: pt.y - 3,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === pts.length - 1 ? colors.amber : colors.mint,
              borderWidth: 1.5,
              borderColor: i === pts.length - 1 ? colors.amberStrong : colors.primaryContainer,
            }}
          />
        ))}
      </View>
      <Text style={{ position: 'absolute', bottom: 0, right: 0, fontSize: 10, color: colors.success, fontWeight: '700' }}>
        ↑ tendência positiva
      </Text>
    </View>
  );
}

// ─── Habit Ring ───────────────────────────────────────────────────────────────
function HabitRing({ pct, label, color }: { pct: number; label: string; color: string }) {
  return (
    <View style={{ alignItems: 'center', gap: 6 }}>
      <View style={[hr.ring, { borderColor: colors.line }]}>
        <View style={[hr.fill, { borderColor: color, borderTopColor: 'transparent', borderLeftColor: pct > 50 ? color : 'transparent' }]} />
        <View style={hr.inner}>
          <Text style={[hr.value, { color }]}>{pct}%</Text>
        </View>
      </View>
      <Text style={hr.label}>{label}</Text>
    </View>
  );
}

const hr = StyleSheet.create({
  ring: { width: 72, height: 72, borderRadius: 36, borderWidth: 6, justifyContent: 'center', alignItems: 'center' },
  fill: { position: 'absolute', width: 72, height: 72, borderRadius: 36, borderWidth: 6, borderColor: colors.primaryContainer },
  inner: { alignItems: 'center' },
  value: { fontSize: 16, fontWeight: '800' },
  label: { fontSize: 11, color: colors.muted, fontWeight: '700', textAlign: 'center', maxWidth: 72 },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function StatsScreen({ onBack, onProfile }: { onBack: () => void; onProfile?: () => void }) {
  const [tab, setTab] = useState(0);
  const [selectedDay, setSelectedDay] = useState(4); // Sexta por padrão

  const selected = weeklyData[selectedDay];
  const totalWeek = weeklyData.reduce((s, d) => s + d.minutes, 0);

  return (
    <View style={styles.page}>
      <BrandHeader title="Estatísticas" back onBack={onBack} onProfile={onProfile} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header KPIs */}
        <View style={styles.kpiRow}>
          <View style={styles.kpi}>
            <Feather name="zap" size={18} color={colors.amber} />
            <Text style={styles.kpiValue}>7</Text>
            <Text style={styles.kpiLabel}>Risca{'\n'}dias</Text>
          </View>
          <View style={[styles.kpi, { backgroundColor: colors.primaryContainer }]}>
            <Feather name="clock" size={18} color={colors.white} />
            <Text style={[styles.kpiValue, { color: colors.white }]}>{totalWeek}m</Text>
            <Text style={[styles.kpiLabel, { color: colors.mintStrong }]}>Total{'\n'}semana</Text>
          </View>
          <View style={styles.kpi}>
            <Feather name="edit-3" size={18} color={colors.primaryContainer} />
            <Text style={styles.kpiValue}>10</Text>
            <Text style={styles.kpiLabel}>Palavras{'\n'}/ foco</Text>
          </View>
          <View style={styles.kpi}>
            <Feather name="shield" size={18} color={colors.success} />
            <Text style={styles.kpiValue}>85%</Text>
            <Text style={styles.kpiLabel}>Presença{'\n'}média</Text>
          </View>
        </View>

        {/* Tab switcher */}
        <View style={styles.tabRow}>
          {tabs.map((t, i) => (
            <Pressable key={t} onPress={() => setTab(i)} style={[styles.tabBtn, tab === i && styles.tabBtnActive]}>
              <Text style={[styles.tabText, tab === i && styles.tabTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        {/* ── TAB 0: SEMANA ── */}
        {tab === 0 && (
          <>
            <SectionCard>
              <Eyebrow icon="bar-chart-2" color={colors.primaryContainer}>Foco por dia</Eyebrow>
              <Text style={[text.small, { marginBottom: spacing.md, marginTop: 4 }]}>
                Toque numa barra para ver detalhes
              </Text>
              <BarChart data={weeklyData} selectedDay={selectedDay} onSelect={setSelectedDay} />

              {selected.minutes > 0 ? (
                <View style={styles.dayDetail}>
                  <View style={[styles.intentDot, { backgroundColor: intentColors[selected.intent] }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dayDetailTitle}>{selected.day} — {selected.intent}</Text>
                    <Text style={styles.dayDetailSub}>{selected.minutes} min de foco profundo</Text>
                  </View>
                  <Text style={styles.dayDetailBadge}>{selected.minutes >= 60 ? '🔥 Fluxo' : '✅ Bom'}</Text>
                </View>
              ) : (
                <View style={styles.dayDetail}>
                  <Text style={styles.dayDetailSub}>Sem sessão registrada neste dia.</Text>
                </View>
              )}
            </SectionCard>

            <SectionCard>
              <Eyebrow icon="pie-chart" color={colors.amberStrong}>Mix de intenções</Eyebrow>
              <View style={styles.intentLegend}>
                {Object.entries(intentColors).filter(([k]) => k).map(([label, color]) => {
                  const total = weeklyData.filter(d => d.intent === label).reduce((s, d) => s + d.minutes, 0);
                  if (total === 0) return null;
                  const pct = Math.round((total / totalWeek) * 100);
                  return (
                    <View key={label} style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: color }]} />
                      <Text style={styles.legendLabel}>{label}</Text>
                      <View style={styles.legendBarBg}>
                        <View style={[styles.legendBarFill, { width: `${pct}%`, backgroundColor: color }]} />
                      </View>
                      <Text style={styles.legendPct}>{pct}%</Text>
                    </View>
                  );
                })}
              </View>
            </SectionCard>
          </>
        )}

        {/* ── TAB 1: MÊS ── */}
        {tab === 1 && (
          <SectionCard>
            <Eyebrow icon="trending-up" color={colors.primaryContainer}>Consistência nos últimos 14 dias</Eyebrow>
            <Text style={[text.small, { marginTop: 4, marginBottom: spacing.md }]}>
              Cada ponto representa uma sessão concluída
            </Text>
            <LineTrend data={monthlyTrend} />
            <View style={styles.trendStats}>
              <View style={styles.trendStat}>
                <Text style={styles.trendValue}>+18%</Text>
                <Text style={styles.trendLabel}>vs semana passada</Text>
              </View>
              <View style={styles.trendStat}>
                <Text style={styles.trendValue}>5.2h</Text>
                <Text style={styles.trendLabel}>média semanal</Text>
              </View>
              <View style={styles.trendStat}>
                <Text style={styles.trendValue}>3</Text>
                <Text style={styles.trendLabel}>sessões/dia</Text>
              </View>
            </View>
          </SectionCard>
        )}

        {/* ── TAB 2: HÁBITOS ── */}
        {tab === 2 && (
          <>
            <SectionCard>
              <Eyebrow icon="activity" color={colors.primaryContainer}>Qualidade de presença</Eyebrow>
              <Text style={[text.small, { marginTop: 4, marginBottom: spacing.lg }]}>
                Baseado nas suas sessões desta semana
              </Text>
              <View style={styles.ringRow}>
                <HabitRing pct={85} label="Atenção plena" color={colors.primaryContainer} />
                <HabitRing pct={72} label="Sem pausas" color={colors.amber} />
                <HabitRing pct={91} label="Notas criadas" color={colors.success} />
              </View>
            </SectionCard>

            <SectionCard>
              <Eyebrow icon="zap" color={colors.amberStrong}>Dicas de melhoria</Eyebrow>
              <View style={styles.tips}>
                <View style={styles.tip}>
                  <View style={[styles.tipIcon, { backgroundColor: colors.amberSoft }]}>
                    <Feather name="clock" size={16} color={colors.amberStrong} />
                  </View>
                  <Text style={styles.tipText}>Pause para revisão após 25 min. Seu ritmo cai levemente após 30 min contínuos.</Text>
                </View>
                <View style={styles.tip}>
                  <View style={[styles.tipIcon, { backgroundColor: colors.mint }]}>
                    <Feather name="target" size={16} color={colors.primaryContainer} />
                  </View>
                  <Text style={styles.tipText}>Use esquemas visuais nas notas longas para poupar energia mental.</Text>
                </View>
                <View style={styles.tip}>
                  <View style={[styles.tipIcon, { backgroundColor: colors.mint }]}>
                    <Feather name="sun" size={16} color={colors.primaryContainer} />
                  </View>
                  <Text style={styles.tipText}>Suas sessões da manhã têm 40% mais presença. Priorize esse horário.</Text>
                </View>
              </View>
            </SectionCard>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },

  kpiRow: { flexDirection: 'row', gap: spacing.sm },
  kpi: { flex: 1, backgroundColor: colors.white, borderRadius: radius.soft, padding: spacing.md, alignItems: 'center', gap: 4, shadowColor: colors.primary, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  kpiValue: { fontSize: 16, fontWeight: '800', color: colors.primary },
  kpiLabel: { fontSize: 10, color: colors.muted, fontWeight: '600', textAlign: 'center', lineHeight: 14 },

  tabRow: { flexDirection: 'row', backgroundColor: colors.mint, borderRadius: radius.pill, padding: 4, gap: 4 },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: radius.pill, alignItems: 'center' },
  tabBtnActive: { backgroundColor: colors.white, shadowColor: colors.primary, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  tabText: { fontSize: 13, fontWeight: '700', color: colors.muted },
  tabTextActive: { color: colors.primary },

  dayDetail: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceSoft, padding: spacing.md, borderRadius: radius.soft, marginTop: spacing.sm },
  intentDot: { width: 12, height: 12, borderRadius: 6 },
  dayDetailTitle: { fontSize: 14, fontWeight: '800', color: colors.primary },
  dayDetailSub: { fontSize: 12, color: colors.muted, fontWeight: '600' },
  dayDetailBadge: { fontSize: 14 },

  intentLegend: { marginTop: spacing.md, gap: spacing.sm },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { fontSize: 13, fontWeight: '600', color: colors.primary, width: 90 },
  legendBarBg: { flex: 1, height: 8, backgroundColor: colors.line, borderRadius: 4, overflow: 'hidden' },
  legendBarFill: { height: '100%', borderRadius: 4 },
  legendPct: { fontSize: 12, fontWeight: '800', color: colors.muted, width: 36, textAlign: 'right' },

  trendStats: { flexDirection: 'row', marginTop: spacing.lg, gap: spacing.sm },
  trendStat: { flex: 1, backgroundColor: colors.surfaceSoft, padding: spacing.md, borderRadius: radius.soft, alignItems: 'center' },
  trendValue: { fontSize: 20, fontWeight: '800', color: colors.primaryContainer },
  trendLabel: { fontSize: 11, color: colors.muted, fontWeight: '600', textAlign: 'center', marginTop: 2 },

  ringRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: spacing.sm },

  tips: { marginTop: spacing.md, gap: spacing.sm },
  tip: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  tipIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  tipText: { flex: 1, fontSize: 14, color: colors.ink, lineHeight: 20, fontWeight: '500' },
});
