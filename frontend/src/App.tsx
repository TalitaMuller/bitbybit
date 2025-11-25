import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { ComparisonBar } from './components/ui/ComparisonBar';
import { PCBuilderPage } from './pages/PCBuilderPage';
import { Chatbot } from './components/chatbot/Chatbot'; 

import { RegisterPage } from './pages/RegisterPage'; 
import { LoginPage } from './pages/LoginPage';


import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { MyBuildsPage } from './pages/MyBuildsPage';

export const ALL_PRODUCTS = [
  { id: 1, name: 'Placa de Vídeo RTX 4060 Ti 8GB', price: 2899.90, store: 'KaBuM!', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=RTX+4060+Ti', description: 'Ideal para jogos em 1440p com Ray Tracing e DLSS 3.', category: 'Placa de Vídeo' },
  { id: 8, name: 'Placa de Vídeo RX 7700 XT 12GB', price: 3150.00, store: 'Pichau', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=RX+7700+XT', description: 'Excelente performance em rasterização pura, ótima para monitores Quad HD.', category: 'Placa de Vídeo' },
  { id: 9, name: 'Placa de Vídeo RTX 4070 Super 12GB', price: 4599.99, store: 'TerabyteShop', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=RTX+4070+S', description: 'Performance de ponta para jogos em 4K e alta taxa de quadros.', category: 'Placa de Vídeo' },
  { id: 10, name: 'Placa de Vídeo RX 6600 8GB', price: 1389.00, store: 'KaBuM!', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=RX+6600', description: 'Melhor custo-benefício para jogos em Full HD (1080p) com tudo no alto.', category: 'Placa de Vídeo' },

  { id: 2, name: 'Processador AMD Ryzen 7 7800X3D', price: 2550.00, store: 'Pichau', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=Ryzen+7', description: 'O melhor processador para jogos graças à tecnologia 3D V-Cache.', category: 'Processador' },
  { id: 11, name: 'Processador Intel Core i5-13600K', price: 1950.00, store: 'TerabyteShop', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=i5-13600K', description: 'Um monstro em produtividade e excelente para jogos, com ótimo potencial de overclock.', category: 'Processador' },
  { id: 12, name: 'Processador AMD Ryzen 5 5600', price: 850.00, store: 'KaBuM!', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=Ryzen+5', description: 'Processador de entrada com 6 núcleos, perfeito para builds de ótimo custo-benefício.', category: 'Processador' },

  { id: 5, name: 'Placa Mãe Gigabyte B550M Aorus Elite', price: 850.00, store: 'Pichau', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=B550M', description: 'Placa mãe robusta para processadores AMD AM4 com suporte a PCIe 4.0.', category: 'Placa Mãe' },
  { id: 13, name: 'Placa Mãe Gigabyte B760M Gaming X', price: 1100.00, store: 'KaBuM!', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=B760M', description: 'Placa mãe com suporte a memórias DDR5 para processadores Intel de 12ª e 13ª geração.', category: 'Placa Mãe' },
  { id: 14, name: 'Placa Mãe ASRock A620M-HDV/M.2+', price: 720.00, store: 'TerabyteShop', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=A620M', description: 'Placa de entrada para a plataforma AMD AM5, ideal para builds com Ryzen 7000.', category: 'Placa Mãe' },

  { id: 6, name: 'Memória RAM Corsair Vengeance 16GB (2x8GB) DDR4 3200MHz', price: 350.00, store: 'TerabyteShop', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=RAM+16GB', description: 'Memória de alta performance para jogos e multitarefa em plataformas DDR4.', category: 'Memória RAM' },
  { id: 15, name: 'Memória RAM Kingston Fury Beast 32GB (2x16GB) DDR5 5200MHz', price: 899.90, store: 'KaBuM!', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=RAM+32GB', description: 'Grande capacidade e velocidade DDR5 para workstations e jogos pesados.', category: 'Memória RAM' },
  
  { id: 4, name: 'SSD NVMe Kingston 1TB', price: 450.00, store: 'KaBuM!', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=SSD+1TB', description: 'Armazenamento ultra-rápido para inicialização instantânea de jogos e programas.', category: 'Armazenamento' },
  { id: 16, name: 'SSD Crucial P3 Plus 2TB NVMe Gen4', price: 880.00, store: 'Pichau', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=SSD+2TB', description: 'Velocidades de leitura e escrita altíssimas com a tecnologia PCIe 4.0.', category: 'Armazenamento' },
  
  { id: 7, name: 'Fonte Corsair CX650 650W, 80 Plus Bronze', price: 450.00, store: 'KaBuM!', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=Fonte+650W', description: 'Fonte de alimentação confiável para sistemas de médio porte.', category: 'Fonte' },
  { id: 17, name: 'Fonte XPG Core Reactor 850W, 80 Plus Gold, Modular', price: 950.00, store: 'TerabyteShop', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=Fonte+850W', description: 'Alta eficiência e cabos modulares para um build limpo e potente.', category: 'Fonte' },
  
  { id: 3, name: 'Monitor Gamer SuperFrame 27" 165Hz', price: 1199.00, store: 'TerabyteShop', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=Monitor', description: 'Tela IPS de 27 polegadas com alta taxa de atualização para gameplays fluidos.', category: 'Monitor' },
  { id: 18, name: 'Monitor LG UltraGear 24" Full HD, 144Hz, 1ms', price: 980.00, store: 'Pichau', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=Monitor+LG', description: 'Monitor gamer de entrada perfeito para e-sports e jogos competitivos.', category: 'Monitor' },
  { id: 19, name: 'Monitor Dell UltraSharp 27" 4K', price: 3200.00, store: 'KaBuM!', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=Monitor+4K', description: 'Resolução 4K e fidelidade de cores excepcional, ideal para profissionais de criação.', category: 'Monitor' },

  { id: 20, name: 'Cooler para Processador DeepCool AG400', price: 180.00, store: 'Pichau', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=Cooler', description: 'Solução de resfriamento a ar eficiente e silenciosa, compatível com a maioria dos sockets Intel e AMD.', category: 'Cooler' },
  { id: 21, name: 'Gabinete Gamer Lian Li Lancool 215, Mid-Tower', price: 550.00, store: 'TerabyteShop', imageUrl: 'https://placehold.co/600x400/1a202c/9f7aea?text=Gabinete', description: 'Gabinete Mid-Tower com excelente fluxo de ar, equipado com duas fans ARGB de 200mm na frente.', category: 'Gabinete' }
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
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/montador"
            element={
              <ProtectedRoute 
                element={<PCBuilderPage products={ALL_PRODUCTS} />} 
              />
            }
          />
          <Route
            path="/my-builds" 
            element={
              <ProtectedRoute 
                element={<MyBuildsPage />} 
              />
            }
          />
        </Routes>
      </main>

      <ComparisonBar
        products={ALL_PRODUCTS}
        compareList={compareList}
        onRemove={handleToggleCompare}
      />

      <Chatbot />
    </div>
  );
}

export default App;