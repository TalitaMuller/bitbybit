import { useState, useEffect } from 'react';
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

export interface Product {
    id: number;
    name: string;
    price: number;
    store: string;
    imageUrl: string;
    description: string;
    category: string;
    link: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<number[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500 mb-4"></div>
        <p className="text-xl">Carregando catálogo de peças...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans pb-24">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route
            path="/"
            element={<HomePage
              products={products}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
            />}
          />
          <Route path="/produto/:id" element={<ProductDetailPage products={products} />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route
            path="/comparar"
            element={<ComparisonPage
              products={products}
              compareList={compareList}
            />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/montador"
            element={
              <ProtectedRoute 
                element={<PCBuilderPage products={products} />} 
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
        products={products}
        compareList={compareList}
        onRemove={handleToggleCompare}
      />

      <Chatbot />
    </div>
  );
}

export default App;