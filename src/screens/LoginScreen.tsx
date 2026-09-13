import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PrimaryButton } from '../components/UI';
import { colors, spacing } from '../theme';

export function LoginScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.page}>
     
      <View style={styles.artContainer}>
        {/* Geometric Art Composition */}
        <View style={styles.artGrid}>
          {/* Row 1 */}
          <View style={styles.cell}><View style={[styles.shape, styles.dots]} /></View>
          <View style={styles.cell}><View style={[styles.shape, styles.leafTopRight, { backgroundColor: colors.amber }]} /></View>
          <View style={styles.cell}><View style={[styles.shape, styles.leafTopLeft, { backgroundColor: colors.primary }]} /></View>
          <View style={styles.cell}><View style={[styles.shape, styles.circle, { backgroundColor: colors.mint }]} /></View>
          
          {/* Row 2 */}
          <View style={styles.cell}><View style={[styles.shape, { backgroundColor: colors.primaryContainer }]}><View style={styles.innerCircle} /></View></View>
          <View style={styles.cell}><View style={[styles.shape, styles.triangleUp, { borderBottomColor: colors.primary }]} /></View>
          <View style={styles.cell}><View style={[styles.shape, styles.leafBottomLeft, { backgroundColor: colors.amberStrong }]} /></View>
          <View style={styles.cell}><View style={[styles.shape, { backgroundColor: colors.primary }]} /></View>
          
          {/* Row 3 */}
          <View style={styles.cell}><View style={[styles.shape, styles.leafBottomRight, { backgroundColor: colors.primary }]} /></View>
          <View style={styles.cell}><View style={[styles.shape, { backgroundColor: colors.amber }]} /></View>
          <View style={styles.cell}><View style={[styles.shape, { backgroundColor: colors.primaryContainer }]}><View style={styles.innerCircleSmall} /></View></View>
          <View style={styles.cell}><View style={[styles.shape, styles.triangleRight, { borderLeftColor: colors.mintStrong }]} /></View>
          
          {/* Row 4 */}
          <View style={styles.cell}><View style={[styles.shape, { backgroundColor: colors.mint }]} /></View>
          <View style={styles.cell}><View style={[styles.shape, styles.circle, { backgroundColor: colors.primaryContainer }]}><View style={styles.innerDot} /></View></View>
          <View style={styles.cell}><View style={[styles.shape, styles.leafTopRight, { backgroundColor: colors.amber }]} /></View>
          <View style={styles.cell}><View style={[styles.shape, { backgroundColor: colors.primary }]} /></View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Construa seu{'\n'}conhecimento</Text>
        <Text style={styles.subtitle}>O Modo Aprendizagem do Sankofa ajuda você a transformar o tempo de tela em foco profundo e reflexivo. Assuma o controle.</Text>
        <PrimaryButton onPress={onStart} style={styles.button}>Começar</PrimaryButton>
      </View>
    </View>
  );
}

const CELL_SIZE = 56;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.surface, padding: spacing.xl },
  greeting: { fontSize: 20, fontWeight: '800', color: colors.primary },
  
  artContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  artGrid: { width: CELL_SIZE * 4, height: CELL_SIZE * 4, flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: CELL_SIZE, height: CELL_SIZE, padding: 3 },
  shape: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
  
  circle: { borderRadius: CELL_SIZE / 2 },
  leafTopRight: { borderTopRightRadius: CELL_SIZE, borderBottomLeftRadius: CELL_SIZE },
  leafTopLeft: { borderTopLeftRadius: CELL_SIZE, borderBottomRightRadius: CELL_SIZE },
  leafBottomRight: { borderBottomRightRadius: CELL_SIZE, borderTopLeftRadius: CELL_SIZE },
  leafBottomLeft: { borderBottomLeftRadius: CELL_SIZE, borderTopRightRadius: CELL_SIZE },
  
  triangleUp: { backgroundColor: 'transparent', borderLeftWidth: CELL_SIZE/2 - 3, borderRightWidth: CELL_SIZE/2 - 3, borderBottomWidth: CELL_SIZE - 6, borderLeftColor: 'transparent', borderRightColor: 'transparent' },
  triangleRight: { backgroundColor: 'transparent', borderTopWidth: CELL_SIZE/2 - 3, borderBottomWidth: CELL_SIZE/2 - 3, borderLeftWidth: CELL_SIZE - 6, borderTopColor: 'transparent', borderBottomColor: 'transparent' },
  
  innerCircle: { width: CELL_SIZE * 0.6, height: CELL_SIZE * 0.6, borderRadius: CELL_SIZE, backgroundColor: colors.amber },
  innerCircleSmall: { width: CELL_SIZE * 0.4, height: CELL_SIZE * 0.4, borderRadius: CELL_SIZE, backgroundColor: colors.amberStrong },
  innerDot: { width: CELL_SIZE * 0.3, height: CELL_SIZE * 0.3, borderRadius: CELL_SIZE, backgroundColor: colors.white },
  
  dots: { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.muted, borderStyle: 'dotted', borderRadius: CELL_SIZE/2 },

  content: { paddingBottom: spacing.xl * 1.5, gap: spacing.md, alignItems: 'center' },
  title: { fontSize: 42, lineHeight: 46, fontWeight: '900', textAlign: 'center', color: colors.primary },
  subtitle: { fontSize: 14, lineHeight: 22, color: colors.muted, marginBottom: spacing.sm, textAlign: 'center' },
  button: { paddingHorizontal: spacing.xl },
});
