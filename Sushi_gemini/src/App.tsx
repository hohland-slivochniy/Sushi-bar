import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CatalogPage } from './components/CatalogPage';
import { AuthAndProfilePage } from './components/AuthAndProfilePage';
import { CartModal, CartItem } from './components/CartModal';
import { CheckoutModal } from './components/CheckoutModal';
import { MenuItem } from './data/menuData';
import { dbService, UserProfile } from './utils/dbSimulation';
import { generateAndDownloadZip } from './utils/zipGenerator';

export function App() {
  const [currentPage, setCurrentPage] = useState<'menu' | 'auth_profile'>('menu');
  const [cartMap, setCartMap] = useState<{ [itemId: string]: { item: MenuItem; quantity: number } }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  const cartList: CartItem[] = Object.values(cartMap).filter(ci => ci.quantity > 0);
  const totalCartCount = cartList.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalCartPrice = cartList.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  // Cart helper functions
  const handleAddToCart = (item: MenuItem) => {
    setCartMap((prev) => {
      const existing = prev[item.id];
      if (existing) {
        return {
          ...prev,
          [item.id]: { item, quantity: existing.quantity + 1 }
        };
      }
      return {
        ...prev,
        [item.id]: { item, quantity: 1 }
      };
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartMap((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return {
        ...prev,
        [itemId]: { item: existing.item, quantity: existing.quantity - 1 }
      };
    });
  };

  const handleClearCart = () => {
    setCartMap({});
  };

  const handleProceedToOrder = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (address: { street: string; house: string; entrance?: string; apartment?: string; comment?: string }) => {
    const userId = currentUser ? currentUser.id : 'guest_user';
    const orderItems = cartList.map(ci => ({
      id: ci.item.id,
      name: ci.item.name,
      price: ci.item.price,
      quantity: ci.quantity,
      imageUrl: ci.item.imageUrl
    }));

    dbService.addOrder(userId, orderItems, totalCartPrice, address);
    handleClearCart();
  };

  const handleDownloadZip = () => {
    generateAndDownloadZip();
  };

  // Build cart qty map for fast lookup in cards
  const fastCartMap: { [itemId: string]: number } = {};
  Object.keys(cartMap).forEach((id) => {
    fastCartMap[id] = cartMap[id].quantity;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe5ec] via-[#f0efeb] to-[#e8dafb] text-[#4a4e69] font-sans selection:bg-[#ffadc6] selection:text-white pb-16">
      
      {/* Sticky Liquid Glass Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onDownloadZip={handleDownloadZip}
      />

      {/* Main Content Area (2 pages) */}
      <main className="transition-all duration-300">
        {currentPage === 'menu' ? (
          <CatalogPage
            cartMap={fastCartMap}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ) : (
          <AuthAndProfilePage
            currentUser={currentUser}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              // Notice we stay on profile page or switch as user wishes
            }}
            onLogout={() => {
              dbService.logout();
              setCurrentUser(null);
            }}
            onDownloadZip={handleDownloadZip}
          />
        )}
      </main>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartList}
        onIncrease={handleAddToCart}
        onDecrease={handleRemoveFromCart}
        onClear={handleClearCart}
        onProceedToOrder={handleProceedToOrder}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        totalPrice={totalCartPrice}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 mt-16">
        <div className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white p-6 md:p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9d8189]">
          <div>
            <strong className="text-[#804058] font-extrabold text-sm block">🌸 Moon Song (Мун Сонг) 2026</strong>
            Пастельная эстетика, Liquid Glass Style & Скругленные углы
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadZip}
              className="text-[#5e4b8b] font-bold hover:underline"
            >
              📦 Скачать Python/FastAPI/SQLite (.ZIP)
            </button>
            <span>Тех. стек: Python, FastAPI, SQLite, HTML, CSS, JS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
