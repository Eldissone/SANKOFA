import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BrandHeader } from '../components/AppChrome';
import { Eyebrow, Pill, PrimaryButton, SectionCard, text } from '../components/UI';
import { colors, radius, spacing } from '../theme';

export function CreateScreen({ onProfile }: { onProfile?: () => void }) {
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('Escreva sua síntese acima para destravar uma questão crítica formulada sob medida.');

  const count = useMemo(() => summary.trim() ? summary.trim().split(/\s+/).length : 0, [summary]);
  const concepts = ['Meiose I vs II'];
  if (/crossing|quiasma/i.test(summary)) concepts.push('Recombinação gênica');
  if (/gameta|haploide/i.test(summary)) concepts.push('Células haploides');

  const challenge = () => setQuestion(summary.trim().length > 20 ? 'Se o crossing-over ocorre na Prófase I, o que impediria a variabilidade caso os cromossomos homólogos não se pareassem perfeitamente?' : 'Qual é a diferença entre a Anáfase da Meiose I e da Meiose II na separação de cromossomos e cromátides?');

  const formats: Array<{ icon: keyof typeof Feather.glyphMap; label: string }> = [
    { icon: 'mic', label: 'Áudio Feynman' },
    { icon: 'git-merge', label: 'Diagrama' },
    { icon: 'copy', label: 'Flashcard' }
  ];

  return (
    <View style={styles.page}>
      <BrandHeader title="Sankofa" onProfile={onProfile} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={text.h1}>Criar & Sintetizar</Text>
        <Text style={text.body}>A melhor forma de aprender é construindo com suas próprias palavras.</Text>

        <SectionCard>
          <View style={styles.focusTop}>
            <Eyebrow icon="target" color={colors.amberStrong}>Foco em andamento</Eyebrow>
            <Pill icon="book-open">Biologia Celular</Pill>
          </View>
          <Text style={[text.h2, styles.title]}>Mini-Síntese: Mapa Mental ou Flashcard da Meiose</Text>
          <Text style={text.body}>Transforme as fases e o crossing-over em um conceito explicável para um leigo.</Text>
          <View style={styles.inspiration}>
            <Text style={styles.inspirationLabel}>PRINCÍPIO DE FEYNMAN</Text>
            <Text style={styles.inspirationText}>Se não puder explicar com simplicidade, você ainda não dominou.</Text>
          </View>
        </SectionCard>

        <Text style={styles.sectionLabel}>Formatos Expressivos</Text>
        <View style={styles.formats}>
          {formats.map(({ icon, label }) => (
            <Pressable key={label} onPress={() => Alert.alert(label, 'Formato selecionado para sua próxima síntese.')} style={styles.format}>
              <View style={styles.formatIcon}>
                <Feather name={icon} size={20} color={colors.primaryContainer} />
              </View>
              <Text style={styles.formatText}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <SectionCard>
          <View style={styles.summaryTop}>
            <Text style={text.h3}><Feather name="edit" size={18} color={colors.primary} /> Meu Resumo</Text>
            <Pill tone="mint">{count} palavras</Pill>
          </View>
          <TextInput value={summary} onChangeText={setSummary} multiline textAlignVertical="top" placeholder="Explique como acontece o crossing-over e por que ele gera variabilidade genética..." placeholderTextColor={colors.muted} style={styles.editor} />

          <View style={styles.conceptTitleRow}>
            <Feather name="cpu" size={14} color={colors.muted} />
            <Text style={[text.small, styles.conceptTitle]}>Conceitos-chave identificados:</Text>
          </View>

          <View style={styles.concepts}>
            {concepts.map((concept) => <Pill key={concept} icon="check">{concept}</Pill>)}
            {count === 0 && <Text style={styles.hint}>+ Digite termos como "gametas" ou "quiasma"</Text>}
          </View>
        </SectionCard>

        <View style={styles.aiCard}>
          <View style={styles.aiHeading}>
            <View style={styles.aiIcon}><Feather name="cpu" size={20} color={colors.white} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiTitle}>Parceiro de Criação IA</Text>
              <Text style={styles.aiText}>Desafie sua explicação! Peça para a IA formular uma pergunta de teste rigorosa.</Text>
            </View>
          </View>
          <View style={styles.aiOutput}>
            <Eyebrow color={colors.amberSoft} icon="help-circle">Desafio gerado</Eyebrow>
            <Text style={styles.aiQuestion}>“{question}”</Text>
          </View>
          <PrimaryButton tone="amber" icon="zap" onPress={challenge}>Pedir Pergunta Desafio à IA</PrimaryButton>
        </View>

        <View style={styles.rhythm}>
          <View style={styles.rhythmRing}>
            <Feather name="award" size={24} color={colors.amberStrong} />
          </View>
          <View style={{ flex: 1 }}>
            <Eyebrow color={colors.amberStrong}>Ritmo de autoria</Eyebrow>
            <Text style={styles.rhythmText}>Você já produziu <Text style={{ fontWeight: '800' }}>1 síntese</Text> e <Text style={{ fontWeight: '800' }}>3 conexões originais</Text> nesta sessão.</Text>
          </View>
        </View>

        <View>
          <View style={styles.communityTop}>
            <Text style={styles.sectionLabel}>Ideias da Comunidade de Mestres</Text>
            <Text style={styles.more}>Ver mais</Text>
          </View>
          <View style={styles.communityRow}>
            <Community title="Esquema das 4 células-filhas" type="Diagrama" icon="git-merge" />
            <Community title="Analogia da Dança dos Pares" type="1m 40s" icon="mic" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Community({ title, type, icon }: { title: string; type: string; icon: keyof typeof Feather.glyphMap }) {
  return (
    <View style={styles.community}>
      <View style={styles.communityArt}>
        <Feather name={icon} size={28} color={colors.primaryContainer} />
        <Pill style={styles.type}>{type}</Pill>
      </View>
      <Text numberOfLines={1} style={styles.communityName}>{title}</Text>
      <Text style={text.small}>Por Clarice V.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  focusTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { marginTop: spacing.sm, marginBottom: spacing.xs },
  inspiration: { marginTop: spacing.md, padding: spacing.md, justifyContent: 'center', backgroundColor: colors.primaryContainer, borderRadius: radius.soft },
  inspirationLabel: { color: colors.mint, fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  inspirationText: { color: colors.white, fontSize: 14, lineHeight: 20, fontWeight: '700', marginTop: 4 },
  sectionLabel: { color: colors.muted, fontSize: 13, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  formats: { flexDirection: 'row', gap: spacing.sm },
  format: { flex: 1, minHeight: 90, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: radius.soft, shadowColor: colors.primary, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  formatIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.mint, justifyContent: 'center', alignItems: 'center' },
  formatText: { color: colors.primary, fontSize: 12, fontWeight: '700', textAlign: 'center' },
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  editor: { minHeight: 140, marginTop: spacing.sm, backgroundColor: colors.mint, borderRadius: radius.soft, padding: spacing.md, color: colors.ink, fontSize: 16, lineHeight: 24 },
  conceptTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
  conceptTitle: { fontWeight: '700' },
  concepts: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  hint: { backgroundColor: colors.surfaceSoft, color: colors.muted, fontSize: 12, fontWeight: '700', paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill },
  aiCard: { backgroundColor: colors.primaryContainer, borderRadius: radius.card, padding: spacing.lg, gap: spacing.md, shadowColor: colors.primaryContainer, shadowOpacity: 0.2, shadowRadius: 15, elevation: 4 },
  aiHeading: { flexDirection: 'row', gap: 12 },
  aiIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.amber, justifyContent: 'center', alignItems: 'center' },
  aiTitle: { color: colors.white, fontSize: 20, fontWeight: '800' },
  aiText: { color: colors.mintStrong, fontSize: 14, lineHeight: 20, marginTop: 4 },
  aiOutput: { backgroundColor: 'rgba(0, 0, 0, 0.15)', borderRadius: radius.soft, padding: spacing.md, gap: 8 },
  aiQuestion: { color: colors.white, fontSize: 15, lineHeight: 22, fontStyle: 'italic', fontWeight: '500' },
  rhythm: { flexDirection: 'row', gap: 16, alignItems: 'center', padding: spacing.lg, borderRadius: radius.card, backgroundColor: colors.amberSoft },
  rhythmRing: { width: 56, height: 56, borderRadius: 28, borderColor: colors.amberStrong, borderWidth: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  rhythmText: { color: colors.ink, fontSize: 14, lineHeight: 20, marginTop: 4 },
  communityTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  more: { color: colors.primaryContainer, fontSize: 13, fontWeight: '800' },
  communityRow: { flexDirection: 'row', gap: spacing.sm },
  community: { flex: 1, backgroundColor: colors.white, padding: spacing.sm, borderRadius: radius.soft, shadowColor: colors.primary, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  communityArt: { height: 80, backgroundColor: colors.mint, borderRadius: radius.soft - 4, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  type: { position: 'absolute', right: 6, bottom: 6 },
  communityName: { color: colors.primary, fontSize: 12, fontWeight: '800', marginTop: 10, marginBottom: 2 },
});
