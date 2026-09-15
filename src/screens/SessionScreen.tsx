import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BrandHeader } from '../components/AppChrome';
import { Eyebrow, Pill, PrimaryButton, SectionCard, text } from '../components/UI';
import { colors, radius, spacing } from '../theme';
import type { SessionConfig, SessionResult } from '../../App';

export function SessionScreen({ config, onBack, onProfile, onEnd }: {
  config: SessionConfig;
  onBack: () => void;
  onProfile?: () => void;
  onEnd?: (result: SessionResult) => void;
}) {
  const [seconds, setSeconds] = useState(config.duration * 60);
  const [isActive, setIsActive] = useState(true);
  const [prompt, setPrompt] = useState(true); // default true para demonstração do MVP
  const [toast, setToast] = useState('');
  const [note, setNote] = useState('');
  const [steps, setSteps] = useState(config.microSteps || []);
  
  const toggleStep = (id: string) => {
    setSteps(old => old.map(s => s.id === id ? { ...s, done: !s.done } : s));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      timer = setInterval(() => setSeconds((value) => value - 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, seconds]);
  const elapsed = config.duration * 60 - seconds;

  const handleEnd = () => {
    if (onEnd) {
      onEnd({
        intent: config.intent,
        goal: config.goal,
        durationMin: config.duration,
        elapsedSec: elapsed,
        notes: note,
      });
    } else {
      onBack();
    }
  };

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  const decide = (message: string) => { setPrompt(false); setToast(message); setTimeout(() => setToast(''), 2600); };

  return (
    <View style={styles.page}>
      <BrandHeader title="Sessão de Foco Ativa" back onBack={onBack} onProfile={onProfile} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <Eyebrow icon="activity" color={colors.primaryContainer}>Intenção: {config.intent}</Eyebrow>
          <Pill icon="wind">Respiração ativa</Pill>
        </View>
        <Text style={text.h2}>{config.goal}</Text>
        <Text style={text.small}>Módulo em andamento</Text>
        
        {steps.length > 0 && (
          <View style={styles.actionPlan}>
            <Eyebrow color={colors.primaryContainer} icon="list">Plano de Ação</Eyebrow>
            <View style={{ gap: 8, marginTop: 12 }}>
              {steps.map(step => (
                <Pressable key={step.id} style={styles.stepItem} onPress={() => toggleStep(step.id)}>
                  <View style={[styles.checkbox, step.done && styles.checkboxDone]}>
                    {step.done && <Feather name="check" size={14} color={colors.white} />}
                  </View>
                  <Text style={[styles.stepText, step.done && styles.stepTextDone]}>{step.text}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <SectionCard style={styles.timerCard}>
          <View style={styles.timerCircle}>
            <Text style={styles.timer}>{clock}</Text>
            <Text style={styles.remaining}>RESTANTES</Text>
          </View>
          <View style={styles.timerMeta}>
            <Text style={styles.timerCopy}>
              <Text style={styles.timerBig}>{clock}</Text> /{config.duration} min meta
            </Text>
            <View style={styles.progress}>
              <View style={[styles.progressFill, { width: `${Math.max(0, 100 - (seconds / (config.duration * 60)) * 100)}%` }]} />
            </View>
            <View style={styles.legendRow}>
              <Text style={styles.legend}><Feather name="circle" size={10} color={colors.primaryContainer} /> Imersão</Text>
              <Text style={[styles.legend, styles.reinforce]}><Feather name="circle" size={10} color={colors.amberStrong} /> Reforço (+6m)</Text>
            </View>
          </View>
        </SectionCard>

        <View style={styles.controlsRow}>
          <PrimaryButton
            onPress={() => setIsActive(!isActive)}
            icon={isActive ? "pause" : "play"}
            style={{ flex: 1 }}
          >
            {isActive ? "Pausar Sessão" : "Continuar Foco"}
          </PrimaryButton>
          <PrimaryButton
            onPress={handleEnd}
            tone="soft"
            icon="square"
            style={{ paddingHorizontal: 20 }}
          >
            Encerrar
          </PrimaryButton>
        </View>

        {prompt && (
          <View style={styles.prompt}>
            <View style={styles.promptTop}>
              <View style={styles.amberCircle}><Feather name="alert-circle" size={24} color={colors.amberStrong} /></View>
              <View style={{ flex: 1 }}>
                <Eyebrow color={colors.amberStrong}>Pausa sincera</Eyebrow>
                <Text style={[text.h2, styles.promptTitle]}>Parece que você está perdendo o foco.</Text>
              </View>
            </View>
            <Text style={[text.body, styles.promptBody]}>Notamos um intervalo no ritmo de anotações. Sem pressa e sem cobrança: você prefere renovar o impulso ou dar espaço para a mente respirar?</Text>
            <PrimaryButton icon="play" onPress={() => decide('Foco estendido por mais 15 minutos.')}>Continuar foco (+15 min)</PrimaryButton>
            <PrimaryButton icon="coffee" tone="amber" onPress={() => decide('Pausa consciente iniciada.')}>Fazer pausa consciente (5 min)</PrimaryButton>
            <PrimaryButton icon="shuffle" tone="soft" onPress={() => decide('Você pode escolher uma nova atividade.')}>Mudar de atividade</PrimaryButton>
            <Text style={styles.autonomy}>Autonomia guiada, zero vigilância invasiva.</Text>
          </View>
        )}

        {!prompt && (
          <View style={styles.resumed}>
            <Feather name="check-circle" size={16} color={colors.success} />
            <Text style={styles.resumedText}>Sua escolha foi respeitada. Continue no seu ritmo.</Text>
            <Pressable onPress={() => setPrompt(true)}>
              <Text style={styles.change}>Rever opções</Text>
            </Pressable>
          </View>
        )}

        <SectionCard>
          <View style={styles.tutorHeading}>
            <View style={styles.tutorIcon}><Feather name="message-square" size={20} color={colors.white} /></View>
            <View style={{ flex: 1 }}>
              <Text style={text.h3}>Tutor Socrático</Text>
              <Text style={text.small}>{config.aiMode === 'silent' ? 'Copiloto em modo silencioso' : 'Copiloto Dialético Ativo'}</Text>
            </View>
            <Pill icon={config.aiMode === 'silent' ? "moon" : "zap"}>{config.aiMode === 'silent' ? 'Apenas Observador' : 'Reflexão Ativa'}</Pill>
          </View>

          {config.aiMode !== 'silent' && (
            <View style={styles.provocation}>
              <Eyebrow color={colors.amberStrong} icon="help-circle">Provocação de Síntese</Eyebrow>
              <Text style={styles.quote}>“Não dou respostas prontas, te ajudo a conectar as ideias. O que você acabou de compreender sobre a transição dos cinetócoros durante a Anáfase?”</Text>
            </View>
          )}

          <Text style={[text.h3, styles.searchTitle, config.aiMode === 'silent' && { marginTop: spacing.md }]}>Pesquisa Guiada na Base</Text>
          <View style={styles.search}>
            <Feather name="search" size={18} color={colors.muted} />
            <TextInput placeholder="Ex.: Encurtamento de microtúbulos..." placeholderTextColor={colors.muted} style={styles.searchInput} />
            <Pressable style={styles.searchButton}><Feather name="arrow-right" size={18} color={colors.white} /></Pressable>
          </View>

          <View style={styles.diagramRow}>
            <View style={styles.diagram}>
              <Feather name="image" size={32} color={colors.muted} />
              <Text style={styles.diagramLabel}>Figura 1: Segregação Cromossômica</Text>
            </View>
            <View style={styles.diagram}>
              <Feather name="share-2" size={32} color={colors.muted} />
              <Text style={styles.diagramLabel}>Esquema 2: Tensão dos Polos</Text>
            </View>
          </View>



          <View style={styles.noteHeader}>
            <Text style={text.h3}><Feather name="edit-3" size={18} color={colors.primary} /> Suas Notas </Text>
            <Text style={styles.saved}>Salvo no caderno</Text>
          </View>
          <TextInput multiline value={note} onChangeText={setNote} style={styles.notes} textAlignVertical="top" />
          <View style={styles.chips}>
            <Pill icon="plus">Cinétocoro</Pill>
            <Pill icon="plus">Coesina</Pill>
            <Pill icon="plus">Fuso Mitótico</Pill>
          </View>
        </SectionCard>
      </ScrollView>
      {toast ? (
        <View style={styles.toast}>
          <Feather name="info" size={16} color={colors.white} />
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs },
  timerCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, backgroundColor: colors.surfaceSoft },
  timerCircle: { width: 92, height: 92, borderRadius: 46, borderWidth: 6, borderColor: colors.mintStrong, justifyContent: 'center', alignItems: 'center', borderTopColor: colors.amberStrong },
  timer: { fontWeight: '800', fontSize: 22, color: colors.primary },
  remaining: { fontSize: 10, color: colors.amberStrong, fontWeight: '800' },
  timerMeta: { flex: 1, gap: 10 },
  timerCopy: { color: colors.muted, fontSize: 14 },
  timerBig: { color: colors.primary, fontSize: 24, fontWeight: '800' },
  controlsRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  progress: { height: 10, backgroundColor: colors.line, borderRadius: 99, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.amber, borderRadius: 99 },
  legendRow: { flexDirection: 'row', gap: 12 },
  legend: { color: colors.primary, fontSize: 12, fontWeight: '700', flexDirection: 'row', alignItems: 'center', gap: 4 },
  reinforce: { color: colors.amberStrong },
  prompt: { padding: spacing.lg, gap: spacing.md, borderRadius: radius.card, backgroundColor: colors.mint, shadowColor: colors.primary, shadowOpacity: 0.1, shadowRadius: 15, elevation: 3 },
  promptTop: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  amberCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  promptTitle: { marginTop: 4, color: colors.primary },
  promptBody: { color: colors.ink, marginBottom: 4 },
  autonomy: { textAlign: 'center', color: colors.primaryContainer, fontSize: 12, fontWeight: '700', marginTop: 4 },
  resumed: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: spacing.md, backgroundColor: colors.mint, borderRadius: radius.soft },
  resumedText: { color: colors.success, fontWeight: '700', fontSize: 13, flex: 1 },
  change: { color: colors.primaryContainer, fontWeight: '800', fontSize: 13 },
  tutorHeading: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  tutorIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  provocation: { backgroundColor: colors.mint, padding: spacing.md, borderRadius: radius.soft, gap: 8, marginTop: spacing.md },
  quote: { color: colors.primary, fontSize: 16, lineHeight: 24, fontStyle: 'italic', fontWeight: '500' },
  diagramRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  diagram: { height: 120, flex: 1, backgroundColor: colors.mint, borderRadius: radius.soft, justifyContent: 'center', alignItems: 'center', gap: 12, overflow: 'hidden' },
  diagramLabel: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, backgroundColor: 'rgba(233, 245, 240, 0.9)', color: colors.primary, fontSize: 11, fontWeight: '700', textAlign: 'center' },
  searchTitle: { marginTop: spacing.lg },
  search: { flexDirection: 'row', alignItems: 'center', paddingLeft: 16, backgroundColor: colors.mint, borderRadius: radius.pill, marginTop: 8, height: 50, gap: 8 },
  searchInput: { flex: 1, color: colors.ink, fontSize: 15 },
  searchButton: { width: 40, height: 40, borderRadius: 20, marginRight: 5, backgroundColor: colors.primaryContainer, justifyContent: 'center', alignItems: 'center' },
  noteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xl },
  saved: { color: colors.success, fontSize: 12, fontWeight: '700' },
  notes: { minHeight: 100, marginTop: 12, backgroundColor: colors.mint, borderRadius: radius.soft, padding: spacing.md, color: colors.ink, fontSize: 15, lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  toast: { position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: 24, backgroundColor: colors.primary, padding: spacing.md, borderRadius: radius.soft, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, shadowColor: colors.primary, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  toastText: { color: colors.white, fontSize: 14, fontWeight: '700' },
  actionPlan: { backgroundColor: colors.mint, padding: spacing.md, borderRadius: radius.card, marginTop: spacing.xs },
  stepItem: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, padding: spacing.md, borderRadius: radius.soft },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: colors.success, borderColor: colors.success },
  stepText: { fontSize: 15, color: colors.primary, fontWeight: '600', flex: 1 },
  stepTextDone: { color: colors.muted, textDecorationLine: 'line-through' },
});
