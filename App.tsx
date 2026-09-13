import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, SafeAreaView, StatusBar as RNStatusBar, StyleSheet, View } from 'react-native';
import { BottomNav, ScreenName } from './src/components/AppChrome';
import { colors } from './src/theme';
import { CreateScreen } from './src/screens/CreateScreen';
import { FocusScreen } from './src/screens/FocusScreen';
import { ReflectionScreen } from './src/screens/ReflectionScreen';
import { SessionScreen } from './src/screens/SessionScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { StatsScreen } from './src/screens/StatsScreen';

export type SessionConfig = {
  intent: string;
  goal: string;
  duration: number;
};

export type SessionResult = {
  intent: string;
  goal: string;
  durationMin: number;
  elapsedSec: number;
  notes: string;
};

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('login');
  const [prevScreen, setPrevScreen] = useState<ScreenName>('focus');
  const [config, setConfig] = useState<SessionConfig>({
    intent: 'Estudar',
    goal: 'Biologia celular: Mitose vs Meiose',
    duration: 40,
  });
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  const goToProfile = () => { setPrevScreen(screen); setScreen('home'); };
  const goBack = () => setScreen(prevScreen);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        {screen === 'login' && <LoginScreen onStart={() => setScreen('focus')} />}
        {screen === 'home' && <HomeScreen onBack={goBack} onNavigate={setScreen} />}
        {screen === 'focus' && <FocusScreen onStart={(cfg) => { setConfig(cfg); setScreen('learn'); }} onProfile={goToProfile} />}
        {screen === 'learn' && <SessionScreen config={config} onBack={() => setScreen('focus')} onProfile={goToProfile} onEnd={(result) => { setSessionResult(result); setScreen('reflect'); }} />}
        {screen === 'create' && <CreateScreen onProfile={goToProfile} />}
        {screen === 'reflect' && <ReflectionScreen sessionResult={sessionResult} onDone={() => setScreen('stats')} onProfile={goToProfile} />}
        {screen === 'stats' && <StatsScreen onBack={() => setScreen('home')} onProfile={goToProfile} />}
      </View>
      {screen !== 'login' && screen !== 'home' && <BottomNav active={screen} onChange={setScreen} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface, paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight ?? 0 : 0 },
  app: { flex: 1 },
});
