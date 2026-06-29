import React from 'react';
import { ShoppingBag, User, Sparkles, Moon, Download } from 'lucide-react';
import { UserProfile } from '../utils/dbSimulation';

interface NavbarProps {
  currentPage: 'menu' | 'auth_profile';
  onNavigate: (page: 'menu' | 'auth_profile') => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: UserProfile | null;
  onDownloadZip: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  currentUser,
  onDownloadZip
}) => {
  return (
    <header className="sticky top-0 z-40 px-4 md:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(255,182,193,0.25)] px-6 py-3.5 flex items-center justify-between">
        
        {/* Left: Navigation Buttons & Download ZIP */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('menu')}
            className={`px-5 py-2.5 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
              currentPage === 'menu'
                ? 'bg-gradient-to-r from-[#ffd6e0] to-[#ffccd5] text-[#804058] shadow-md shadow-[#ffd6e0]/50 scale-105'
                : 'bg-white/60 text-[#6d6875] hover:bg-white/90'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#d46a84]" />
            <span>Меню Moon Song</span>
          </button>

          <button
            onClick={() => onNavigate('auth_profile')}
            className={`px-5 py-2.5 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
              currentPage === 'auth_profile'
                ? 'bg-gradient-to-r from-[#e8dafb] to-[#dcd0ff] text-[#5e4b8b] shadow-md shadow-[#e8dafb]/50 scale-105'
                : 'bg-white/60 text-[#6d6875] hover:bg-white/90'
            }`}
          >
            <User className="w-4 h-4 text-[#9d8189]" />
            <span>
              {currentUser ? `${currentUser.firstName} (${currentUser.email})` : 'Регистрация / Кабинет'}
            </span>
          </button>

          <button
            onClick={onDownloadZip}
            title="Скачать архив с Python FastAPI backend и базой .db"
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#d8f3dc]/80 text-[#2d6a4f] hover:bg-[#b7e4c7] transition-all text-sm font-medium border border-white/60 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Скачать Python/FastAPI .ZIP</span>
          </button>
        </div>

        {/* Center/Right: Cart & Logo (Moon Song on right as requested) */}
        <div className="flex items-center gap-5">
          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-3 rounded-2xl bg-gradient-to-br from-[#fff0f3] to-[#ffe5ec] border border-white hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#ffccd5]/40 text-[#b5838d]"
            title="Открыть корзину"
          >
            <ShoppingBag className="w-6 h-6 text-[#d46a84]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-r from-[#ff8fa3] to-[#ff758f] text-white text-xs font-bold flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Right Logo (Moon Song) */}
          <div 
            onClick={() => onNavigate('menu')}
            className="cursor-pointer flex items-center gap-3 pl-3 border-l border-[#f4acb7]/30"
          >
            <div className="text-right hidden sm:block">
              <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#d46a84] via-[#b5838d] to-[#6d6875] bg-clip-text text-transparent">
                Moon Song
              </h1>
              <p className="text-[10px] text-[#9d8189] font-medium uppercase tracking-widest">
                Премиум японская кухня
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ffccd5] via-[#e8dafb] to-[#d8f3dc] flex items-center justify-center shadow-inner border border-white/80">
              <Moon className="w-6 h-6 text-[#804058] animate-pulse" />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
