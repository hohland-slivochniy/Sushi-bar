import React, { useState } from 'react';
import { CATEGORIES, MENU_ITEMS, MenuItem } from '../data/menuData';
import { ProductCard } from './ProductCard';
import { Sparkles, Search, SlidersHorizontal } from 'lucide-react';

interface CatalogPageProps {
  cartMap: { [itemId: string]: number };
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  cartMap,
  onAddToCart,
  onRemoveFromCart
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 animate-fade-in space-y-8">
      
      {/* HERO BANNER IN PASTEL LIQUID GLASS STYLE */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#ffe5ec]/80 via-[#f0efeb]/80 to-[#e8dafb]/80 backdrop-blur-2xl border border-white p-8 md:p-12 shadow-[0_16px_48px_rgba(255,182,193,0.3)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-4 text-left z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 text-[#804058] font-bold text-xs shadow-xs border border-white">
            <Sparkles className="w-3.5 h-3.5 text-[#d46a84]" />
            <span>Ночной гастрономический ритуал</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#804058] via-[#d46a84] to-[#5e4b8b] bg-clip-text text-transparent leading-tight">
            Лунный свет в каждом кусочке Moon Song 🌙
          </h1>
          <p className="text-sm sm:text-base text-[#6d6875] leading-relaxed">
            Авторские сеты, свежайшие роллы, ароматные воки и согревающие супы. Нажмите на любую карточку товара для увеличения за 0.5с и просмотра подробного состава!
          </p>
        </div>

        {/* Decorative Floating Moon / Sushi element */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-tr from-[#ffadc6] via-[#e8dafb] to-[#d8f3dc] p-1.5 shadow-[0_20px_50px_rgba(255,182,193,0.45)] transform -rotate-3 hover:rotate-0 transition-transform duration-500 shrink-0">
          <div className="w-full h-full rounded-3xl overflow-hidden bg-white/30 backdrop-blur-md relative">
            <img
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
              alt="Moon Song Premium Sushi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur-xl p-4 rounded-3xl border border-white shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9d8189]" />
          <input
            type="text"
            placeholder="Поиск блюда или ингредиента (например, лосось, угорь)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border border-white focus:outline-none focus:ring-2 focus:ring-[#ffadc6] text-sm text-[#4a4e69] font-medium shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#804058] bg-[#fff0f3] px-4 py-3 rounded-2xl border border-white">
          <SlidersHorizontal className="w-4 h-4 text-[#d46a84]" />
          <span>Всего блюд в меню: {MENU_ITEMS.length} шт</span>
        </div>
      </div>

      {/* CATEGORY TABS (9 категорий) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-3 rounded-2xl font-extrabold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-[#ffadc6] via-[#ff8fa3] to-[#d46a84] text-white shadow-lg shadow-[#ffadc6]/50 scale-105'
              : 'bg-white/70 text-[#6d6875] hover:bg-white border border-white/80'
          }`}
        >
          <span>✨ Все меню ({MENU_ITEMS.length})</span>
        </button>

        {CATEGORIES.map((cat) => {
          const count = MENU_ITEMS.filter((m) => m.category === cat.id).length;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-3 rounded-2xl font-extrabold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#ffadc6] via-[#ff8fa3] to-[#d46a84] text-white shadow-lg shadow-[#ffadc6]/50 scale-105'
                  : 'bg-white/70 text-[#6d6875] hover:bg-white border border-white/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* ITEMS GRID OR EMPTY STATE */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/70 backdrop-blur-xl border border-white">
          <p className="text-lg font-bold text-[#804058]">Блюда не найдены по запросу «{searchQuery}»</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="mt-4 px-6 py-2.5 rounded-2xl bg-[#ffadc6] text-white font-bold text-sm shadow-md"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              cartQty={cartMap[item.id] || 0}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
        </div>
      )}

    </div>
  );
};
