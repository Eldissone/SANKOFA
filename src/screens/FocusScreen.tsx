import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BrandHeader } from '../components/AppChrome';
import { Eyebrow, Pill, PrimaryButton, SectionCard, text } from '../components/UI';
import { colors, radius, spacing } from '../theme';

const distractions = ['Notificações', 'Mensagens', 'Redes Sociais', 'Vídeos Curtos', 'Jogos'];
const intents: Array<{ label: string; icon: keyof typeof Feather.glyphMap }> = [
  { label: 'Estudar', icon: 'book' },
  { label: 'Me conectar', icon: 'users' },
  { label: 'Criar', icon: 'pen-tool' },
  { label: 'Pesquisar', icon: 'search' },
  { label: 'Colaborar', icon: 'link' },
  { label: 'Descansar', icon: 'coffee' }
];
const installedApps: Array<{ id: string; name: string; icon: keyof typeof Feather.glyphMap }> = [
  { id: 'notion', name: 'Notion', icon: 'book-open' },
  { id: 'anki', name: 'Anki', icon: 'copy' },
  { id: 'calculadora', name: 'Calc', icon: 'hash' },
  { id: 'spotify', name: 'Spotify', icon: 'music' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'message-circle' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
];

export function FocusScreen({ onStart, onProfile }: { onStart: (config: { intent: string, goal: string, duration: number, allowedApps?: string[], microSteps?: { id: string; text: string; done: boolean }[], aiMode?: 'active' | 'silent' }) => void; onProfile?: () => void }) {
  const [intent, setIntent] = useState('Estudar');
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState(40);
  const [selected, setSelected] = useState<string[]>(['Notificações', 'Mensagens']);
  const [shield, setShield] = useState(true);
  const [step, setStep] = useState(1);
  const [allowedApps, setAllowedApps] = useState<string[]>(['notion', 'anki', 'calculadora']);
  const [microSteps, setMicroSteps] = useState<{ id: string; text: string; done: boolean }[]>([]);
  const [newStep, setNewStep] = useState('');
  const [aiMode, setAiMode] = useState<'active' | 'silent'>('active');
  const [intentExpanded, setIntentExpanded] = useState(false); // unused, kept for safety
  const toggle = (value: string) => setSelected((old) => old.includes(value) ? old.filter((item) => item !== value) : [...old, value]);
  const toggleAllowedApp = (id: string) => setAllowedApps((old) => old.includes(id) ? old.filter(i => i !== id) : [...old, id]);

  const generateMicroSteps = () => {
    setMicroSteps([
      { id: '1', text: 'Revisar conceitos principais', done: false },
      { id: '2', text: 'Praticar com exemplos', done: false },
      { id: '3', text: 'Fazer síntese final', done: false }
    ]);
  };

  return (
    <View style={styles.page}>
      <BrandHeader title="Sankofa" onProfile={onProfile} />

      <View style={styles.progressHeader}>
        <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]} />
        <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]} />
        <View style={[styles.stepDot, step >= 3 && styles.stepDotActive]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={text.h1}>Você veio fazer o quê?</Text>
            <Text style={text.body}>Defina a direção mental antes de abrir as comportas da atenção.</Text>

            <View style={styles.intentGrid}>
              {intents.map((item) => {
                const active = intent === item.label;
                return (
                  <Pressable key={item.label} onPress={() => setIntent(item.label)} style={[styles.intentCard, active && styles.intentCardActive]}>
                    <View style={[styles.intentIconBox, active && styles.intentIconBoxActive]}>
                      <Feather name={item.icon} size={28} color={active ? colors.amberStrong : colors.white} />
                    </View>
                    <Text style={[styles.intentCardText, active && styles.intentCardTextActive]}>{item.label}</Text>
                  </Pressable>
                );
              })}
            </View>

            <PrimaryButton onPress={() => setStep(2)} icon="arrow-right" style={{ marginTop: spacing.lg }}>Configurar Ambiente</PrimaryButton>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={text.h1}>
              {intent === 'Estudar' ? 'Preparação para Estudo' :
                intent === 'Me conectar' ? 'Ambiente de Conexão' :
                  intent === 'Criar' ? 'Ambiente de Criação' :
                    intent === 'Pesquisar' ? 'Ambiente de Pesquisa' :
                      intent === 'Colaborar' ? 'Ambiente de Colaboração' :
                        'Preparação para Descanso'}
            </Text>
            <Text style={text.body}>
              {intent === 'Me conectar' || intent === 'Colaborar'
                ? 'Conecte-se com outros estudantes e crie salas para aprendizado coletivo, sem distrações.'
                : 'Quais ferramentas você vai precisar? O que costuma te distrair?'}
            </Text>

            <SectionCard style={{ marginTop: spacing.md, marginBottom: spacing.md }}>
              <View style={styles.cardTop}>
                <Eyebrow icon="flag" color={colors.amberStrong}>Meta de conclusão</Eyebrow>
              </View>
              <TextInput
                style={styles.goalInput}
                placeholder="O que decreta o fim dessa sessão?"
                placeholderTextColor={colors.muted}
                value={goal}
                onChangeText={setGoal}
              />
              <Text style={text.body}>Escreva claramente onde você quer chegar antes de entrar no fluxo.</Text>
              
              {microSteps.length > 0 && (
                <View style={styles.microStepsList}>
                  {microSteps.map(step => (
                    <View key={step.id} style={styles.microStepItem}>
                      <Feather name="square" size={16} color={colors.muted} />
                      <Text style={styles.microStepText}>{step.text}</Text>
                      <Pressable onPress={() => setMicroSteps(old => old.filter(s => s.id !== step.id))}>
                        <Feather name="x" size={14} color={colors.muted} />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.addStepRow}>
                <TextInput
                  style={styles.addStepInput}
                  placeholder="Adicionar passo manual..."
                  placeholderTextColor={colors.muted}
                  value={newStep}
                  onChangeText={setNewStep}
                  onSubmitEditing={() => {
                    if (newStep.trim()) {
                      setMicroSteps(old => [...old, { id: Date.now().toString(), text: newStep.trim(), done: false }]);
                      setNewStep('');
                    }
                  }}
                />
                <Pressable 
                  style={styles.addStepButton} 
                  onPress={() => {
                    if (newStep.trim()) {
                      setMicroSteps(old => [...old, { id: Date.now().toString(), text: newStep.trim(), done: false }]);
                      setNewStep('');
                    }
                  }}
                >
                  <Feather name="plus" size={18} color={colors.white} />
                </Pressable>
              </View>

              {microSteps.length === 0 && (
                <Pressable onPress={generateMicroSteps} style={styles.aiButton}>
                  <Text style={styles.aiButtonText}>✨ Gerar micro-passos com IA</Text>
                </Pressable>
              )}
            </SectionCard>

            <SectionCard>
              {(intent === 'Me conectar' || intent === 'Colaborar') ? (
                <View>
                  <Text style={text.h3}>Salas de Aprendizado Coletivo</Text>
                  <Text style={[text.small, { marginBottom: spacing.md }]}>Junte-se a uma sala ativa ou crie a sua para compartilhar conhecimento e trocar ideias.</Text>

                  <View style={{ gap: spacing.sm }}>
                    <Pressable style={styles.roomCard}>
                      <View style={styles.roomIcon}><Feather name="users" size={20} color={colors.white} /></View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.roomTitle}>Grupo: Matemática Avançada</Text>
                        <Text style={styles.roomSubtitle}>3 estudantes focados agora</Text>
                      </View>
                      <Feather name="chevron-right" size={20} color={colors.muted} />
                    </Pressable>
                    <Pressable style={styles.roomCard}>
                      <View style={[styles.roomIcon, { backgroundColor: colors.amber }]}><Feather name="plus" size={20} color={colors.white} /></View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.roomTitle}>Criar Nova Sala</Text>
                        <Text style={styles.roomSubtitle}>Convide colegas para o estado de fluxo</Text>
                      </View>
                      <Feather name="chevron-right" size={20} color={colors.muted} />
                    </Pressable>
                  </View>

                  <View style={[styles.shield, { marginTop: spacing.xl }]}>
                    <View style={styles.shieldIcon}>
                      <Feather name="shield" size={18} color={colors.primaryContainer} />
                    </View>
                    <View style={styles.shieldCopy}>
                      <Text style={text.h3}>Ambiente Controlado</Text>
                      <Text style={text.small}>Bloquear distrações locais enquanto conectado na sala?</Text>
                    </View>
                    <Switch value={shield} onValueChange={setShield} trackColor={{ false: colors.line, true: colors.primaryContainer }} thumbColor={shield ? colors.amber : colors.white} />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.questionBox}>
                    <Text style={styles.question}>O que mais costuma distrair você?</Text>
                    <Text style={text.small}>Antecipe as âncoras de fuga mental para blindar sua rota.</Text>
                    <View style={styles.tags}>
                      {distractions.map((item) => {
                        const active = selected.includes(item);
                        return (
                          <Pressable key={item} onPress={() => toggle(item)} style={[styles.tag, active && styles.tagActive]}>
                            <Feather name={active ? 'check' : 'plus'} size={14} color={active ? colors.white : colors.muted} />
                            <Text style={[styles.tagText, active && styles.tagTextActive]}>{item}</Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>

                  <View style={styles.shield}>
                    <View style={styles.shieldIcon}>
                      <Feather name="shield" size={18} color={colors.primaryContainer} />
                    </View>
                    <View style={styles.shieldCopy}>
                      <Text style={text.h3}>Adaptação</Text>
                      <Text style={text.small}>Colocar apps não essenciais em segundo plano durante esta sessão?</Text>
                    </View>
                    <Switch value={shield} onValueChange={setShield} trackColor={{ false: colors.line, true: colors.primaryContainer }} thumbColor={shield ? colors.amber : colors.white} />
                  </View>

                  {shield && (
                    <View style={{ marginTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.mint, paddingTop: spacing.md }}>
                      <Text style={text.h3}>Apps Permitidos (Espaço de Foco)</Text>
                      <Text style={[text.small, { marginBottom: spacing.md }]}>Selecione os apps essenciais. Os não selecionados serão silenciados.</Text>
                      <View style={styles.appGrid}>
                        {installedApps.map((app) => {
                          const isAllowed = allowedApps.includes(app.id);
                          return (
                            <Pressable key={app.id} onPress={() => toggleAllowedApp(app.id)} style={[styles.appItem, isAllowed && styles.appItemActive]}>
                              <Feather name={app.icon} size={24} color={isAllowed ? colors.primaryContainer : colors.muted} />
                              <Text style={[styles.appItemText, isAllowed && styles.appItemTextActive]}>{app.name}</Text>
                              {isAllowed && <View style={styles.appCheck}><Feather name="check" size={10} color={colors.white} /></View>}
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  <View style={[styles.shield, { marginTop: spacing.lg, backgroundColor: colors.surfaceSoft }]}>
                    <View style={[styles.shieldIcon, { backgroundColor: colors.white }]}>
                      <Feather name="cpu" size={18} color={colors.amberStrong} />
                    </View>
                    <View style={styles.shieldCopy}>
                      <Text style={text.h3}>Tutor Socrático</Text>
                      <Text style={text.small}>Intervenção da IA durante a sessão</Text>
                    </View>
                    <Switch value={aiMode === 'active'} onValueChange={(val) => setAiMode(val ? 'active' : 'silent')} trackColor={{ false: colors.line, true: colors.amberStrong }} thumbColor={colors.white} />
                  </View>

                </View>
              )}
            </SectionCard>

            <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg }}>
              <PrimaryButton onPress={() => setStep(1)} tone="soft" icon="arrow-left" style={{ paddingHorizontal: 20 }}>Voltar</PrimaryButton>
              <PrimaryButton onPress={() => setStep(3)} icon="arrow-right" style={{ flex: 1 }}>Ajustar Tempo</PrimaryButton>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={text.h1}>Ajuste do Tempo</Text>
            <Text style={text.body}>Quanto tempo você consegue sustentar esse estado sem exaustão?</Text>

            <SectionCard style={{ marginTop: spacing.md, paddingVertical: spacing.xl, alignItems: 'center' }}>
              <Pill tone="mint" icon="play">SESSÃO</Pill>
              <Text style={{ fontSize: 56, fontWeight: '800', color: colors.primary, marginTop: spacing.md, marginBottom: spacing.md }}>{duration}m</Text>

              <View style={styles.timeWrap}>
                {[15, 25, 40, 60].map((t) => (
                  <Pressable key={t} onPress={() => setDuration(t)} style={[styles.timePill, duration === t && styles.timePillActive]}>
                    <Text style={[styles.timeText, duration === t && styles.timeTextActive]}>{t}m</Text>
                  </Pressable>
                ))}
              </View>
            </SectionCard>

            <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg }}>
              <PrimaryButton onPress={() => setStep(2)} tone="soft" icon="arrow-left" style={{ paddingHorizontal: 20 }}>Voltar</PrimaryButton>
              <PrimaryButton onPress={() => onStart({ intent, goal: goal || 'Foco Contínuo', duration, allowedApps, microSteps, aiMode })} icon="play-circle" style={{ flex: 1 }}>
                Iniciar Sessão
              </PrimaryButton>
            </View>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md, flexGrow: 1 },
  progressHeader: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: 8, paddingBottom: spacing.sm },
  stepDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.line },
  stepDotActive: { backgroundColor: colors.primaryContainer },
  stepContainer: { gap: spacing.sm },
  sessionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  timePill: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.pill, backgroundColor: colors.mint },
  timePillActive: { backgroundColor: colors.amberStrong },
  timeText: { color: colors.primary, fontSize: 16, fontWeight: '800' },
  timeTextActive: { color: colors.white },
  intentGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  intentCard: { width: '47%', height: 140, backgroundColor: colors.white, borderRadius: radius.card, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, borderWidth: 1, borderColor: colors.line },
  intentCardMore: { width: '47%', aspectRatio: 0.9, backgroundColor: colors.surfaceSoft, borderRadius: radius.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line, borderStyle: 'dashed', gap: 8 },
  intentCardMoreText: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  collapseBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: spacing.sm },
  collapseBtnText: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  intentCardActive: { backgroundColor: colors.amberStrong, borderColor: colors.amberStrong },
  intentIconBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  intentIconBoxActive: { backgroundColor: colors.white },
  intentCardText: { color: colors.primary, fontSize: 16, fontWeight: '800' },
  intentCardTextActive: { color: colors.white },
  intentCardSubText: { color: colors.white, opacity: 0.8, fontSize: 11, fontStyle: 'italic', position: 'absolute', bottom: spacing.md },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  goalInput: { marginTop: spacing.xs, marginBottom: spacing.sm, fontSize: 18, fontWeight: '800', color: colors.primary, borderBottomWidth: 1, borderBottomColor: colors.mintStrong, paddingVertical: 4 },
  questionBox: { backgroundColor: colors.mint, borderRadius: radius.soft, marginTop: spacing.lg, padding: spacing.md, gap: spacing.sm },
  question: { color: colors.primary, fontSize: 16, lineHeight: 22, fontWeight: '800' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: spacing.xs },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.white, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8 },
  tagActive: { backgroundColor: colors.primaryContainer },
  tagText: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  tagTextActive: { color: colors.white },
  shield: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mintStrong, borderRadius: radius.soft, padding: spacing.md, gap: 12, marginTop: spacing.lg },
  shieldIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  shieldCopy: { flex: 1, gap: 2 },
  photo: { height: 120, marginTop: spacing.lg, backgroundColor: '#789B8D', borderRadius: radius.soft, justifyContent: 'flex-end', padding: spacing.md },
  photoLabel: { color: colors.white, fontSize: 13, fontWeight: '800' },
  notice: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16, backgroundColor: colors.amberSoft, borderRadius: radius.soft },
  noticeText: { color: colors.amberStrong, fontWeight: '700', fontSize: 14, flex: 1 },
  assurance: { textAlign: 'center', color: colors.muted, fontSize: 13, fontWeight: '700', marginTop: -8 },
  appGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  appItem: { width: 72, height: 72, backgroundColor: colors.white, borderRadius: radius.soft, alignItems: 'center', justifyContent: 'center', gap: 4, position: 'relative' },
  appItemActive: { backgroundColor: colors.mint, borderColor: colors.primaryContainer, borderWidth: 1 },
  appItemText: { fontSize: 11, color: colors.muted, fontWeight: '600' },
  appItemTextActive: { color: colors.primaryContainer, fontWeight: '800' },
  appCheck: { position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.surface },
  roomCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceSoft, padding: spacing.md, borderRadius: radius.soft, gap: spacing.md },
  roomIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  roomTitle: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  roomSubtitle: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  aiButton: { marginTop: spacing.md, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.amberSoft, borderRadius: radius.pill },
  aiButtonText: { color: colors.amberStrong, fontSize: 13, fontWeight: '800' },
  microStepsList: { marginTop: spacing.md, gap: 8, padding: spacing.sm, backgroundColor: colors.surfaceSoft, borderRadius: radius.soft },
  microStepItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  microStepText: { color: colors.ink, fontSize: 14, fontWeight: '600', flex: 1 },
  addStepRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: spacing.md },
  addStepInput: { flex: 1, backgroundColor: colors.surfaceSoft, borderRadius: radius.soft, paddingHorizontal: 12, height: 40, color: colors.primary, fontSize: 14 },
  addStepButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' },
});
