import React from 'react';
import NinjaGenerator from './components/NinjaGenerator';
import { Swords } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <Swords className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Naruto 5e Adversary Generator</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <NinjaGenerator />
      </main>
    </div>
  );
};

export default App;
