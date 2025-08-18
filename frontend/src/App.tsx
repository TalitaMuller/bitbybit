// src/App.tsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { ComparisonBar } from './components/ui/ComparisonBar';
import { PCBuilderPage } from './pages/PCBuilderPage';
import { Chatbot } from './components/chatbot/Chatbot'; // 1. IMPORTAR O CHATBOT

// Dados de exemplo
export const ALL_PRODUCTS = [
  { id: 1, name: 'Placa de Vídeo RTX 4060 Ti', price: 2899.90, store: 'KaBuM!', imageUrl: `https://placehold.co/600x400/1a202c/9f7aea?text=RTX+4060+Ti`, description: 'Ideal para jogos em 1440p com Ray Tracing e DLSS 3.', category: 'Placa de Vídeo' },
  { id: 2, name: 'Processador AMD Ryzen 7 7800X3D', price: 2550.00, store: 'Pichau', imageUrl: `https://placehold.co/600x400/1a202c/9f7aea?text=Ryzen+7`, description: 'O melhor processador para jogos graças à tecnologia 3D V-Cache.', category: 'Processador' },
  { id: 3, name: 'Monitor Gamer SuperFrame 27" 165Hz', price: 1199.00, store: 'TerabyteShop', imageUrl: `https://placehold.co/600x400/1a202c/9f7aea?text=Monitor`, description: 'Tela IPS de 27 polegadas com alta taxa de atualização para gameplays fluidos.', category: 'Monitor' },
  { id: 4, name: 'SSD NVMe Kingston 1TB', price: 450.00, store: 'KaBuM!', imageUrl: `https://placehold.co/600x400/1a202c/9f7aea?text=SSD+1TB`, description: 'Armazenamento ultra-rápido para inicialização instantânea de jogos e programas.', category: 'Armazenamento' },
  { id: 5, name: 'Placa Mãe Gigabyte B550M Aorus Elite', price: 850.00, store: 'Pichau', imageUrl: `https://placehold.co/600x400/1a202c/9f7aea?text=B550M`, description: 'Placa mãe robusta para processadores AMD com suporte a PCIe 4.0.', category: 'Placa Mãe' },
  { id: 6, name: 'Memória RAM Corsair Vengeance 16GB (2x8GB) DDR4 3200MHz', price: 350.00, store: 'TerabyteShop', imageUrl: `https://placehold.co/600x400/1a202c/9f7aea?text=RAM+16GB`, description: 'Memória de alta performance para jogos e multitarefa.', category: 'Memória RAM' },
  { id: 7, name: 'Fonte Corsair CX650 650W, 80 Plus Bronze', price: 450.00, store: 'KaBuM!', imageUrl: `https://placehold.co/600x400/1a202c/9f7aea?text=Fonte+650W`, description: 'Fonte de alimentação confiável para sistemas de médio porte.', category: 'Fonte' },
];

function App() {
  const [compareList, setCompareList] = useState<number[]>([]);

  const handleToggleCompare = (productId: number) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        if (prev.length < 4) {
          return [...prev, productId];
        }
        return prev;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans pb-24">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route
            path="/"
            element={<HomePage
              products={ALL_PRODUCTS}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
            />}
          />
          <Route path="/produto/:id" element={<ProductDetailPage products={ALL_PRODUCTS} />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route
            path="/comparar"
            element={<ComparisonPage
              products={ALL_PRODUCTS}
              compareList={compareList}
            />}
          />
          <Route
            path="/montador"
            element={<PCBuilderPage products={ALL_PRODUCTS} />}
          />
        </Routes>
      </main>

      <ComparisonBar
        products={ALL_PRODUCTS}
        compareList={compareList}
        onRemove={handleToggleCompare}
      />

      <Chatbot /> {/* 2. ADICIONAR O COMPONENTE AQUI */}
    </div>
  );
}

export default App;