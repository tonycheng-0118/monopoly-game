import { GameProvider } from '../context/GameContext';
import GameBoard from '../components/GameBoard';
import Controls from '../components/Controls';
import GameModal from '../components/GameModal';

export default function Home() {
  return (
    <GameProvider>
      <main style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex' }}>
        <GameBoard />
        <Controls />
        <GameModal />
      </main>
    </GameProvider>
  );
}
