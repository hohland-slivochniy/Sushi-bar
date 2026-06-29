import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { Plus, Minus, X, ShieldCheck, Sparkles, Coffee } from 'lucide-react';

interface ProductCardProps {
  item: MenuItem;
  cartQty: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  cartQty,
  onAddToCart,
  onRemoveFromCart
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Avoid zooming if button clicked directly
    if ((e.target as HTMLElement).closest('button')) return;
    setIsZoomed(true);
  };

  return (
    <>
      {/* NORMAL GRID CARD (Realism + Pastel Liquid Glass) */}
      <div
        onClick={handleCardClick}
        className="group relative rounded-3xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_rgba(255,182,193,0.18)] hover:shadow-[0_12px_32px_rgba(255,182,193,0.35)] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer transform hover:-translate-y-1.5"
      >
        {/* TOP-RIGHT PASTEL PINK CART BADGE (Нежно розовый кружок с белым текстом сверху справа) */}
        {cartQty > 0 && (
          <div className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#ffadc6] text-white font-extrabold text-sm flex items-center justify-center shadow-lg border-2 border-white animate-fade-in">
            {cartQty}
          </div>
        )}

        {/* Realistic High-Quality Photo */}
        <div className="relative h-52 w-full overflow-hidden bg-gradient-to-tr from-[#ffe5ec] to-[#f0efeb]">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          
          {/* Dietary & Spice Tags */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
            {item.isHalal && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#d8f3dc]/90 text-[#1b4332] text-xs font-semibold backdrop-blur-md border border-white/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#2d6a4f]" />
                Халяль
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-white/85 text-[#6d6875] text-xs font-semibold backdrop-blur-md border border-white/60">
              {item.spicyLevel}
            </span>
            {item.isSweet && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffe5ec]/90 text-[#9b2242] text-xs font-semibold backdrop-blur-md border border-white/60">
                🍰 Сладкий
              </span>
            )}
          </div>
        </div>

        {/* Card Content (without long description, exactly as requested) */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="font-bold text-lg text-[#4a4e69] leading-snug group-hover:text-[#d46a84] transition-colors">
                {item.name}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium text-[#9d8189] mb-3">
              {item.weight && (
                <span className="px-2 py-0.5 rounded-lg bg-[#fff0f3] text-[#b5838d]">
                  ⚖️ {item.weight}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-lg bg-[#f4f1de] text-[#6b705c]">
                🔥 {item.calories} ккал
              </span>
            </div>

            {/* Ingredients (списком через запятую) */}
            <p className="text-xs text-[#6d6875] leading-relaxed line-clamp-2 mb-4 bg-white/40 p-2 rounded-xl border border-white/60">
              <span className="font-semibold text-[#804058]">Ингредиенты:</span>{' '}
              {item.ingredients.join(', ')}
            </p>
          </div>

          {/* Price and Add to Cart Button */}
          <div className="pt-2 border-t border-[#ffe5ec] flex items-center justify-between">
            <div>
              <span className="text-2xl font-extrabold text-[#804058]">
                {item.price.toLocaleString('ru-RU')} ₽
              </span>
            </div>

            {cartQty === 0 ? (
              <button
                onClick={() => onAddToCart(item)}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#ffadc6] to-[#ff8fa3] text-white font-bold text-sm shadow-md shadow-[#ffadc6]/50 hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>В корзину</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-white/90 rounded-2xl p-1 border border-[#ffadc6]/50 shadow-sm">
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="w-8 h-8 rounded-xl bg-[#fff0f3] text-[#d46a84] hover:bg-[#ffe5ec] flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-bold text-sm text-[#804058]">
                  {cartQty}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-8 h-8 rounded-xl bg-[#ffadc6] text-white hover:bg-[#ff8fa3] flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="px-5 pb-2.5 pt-0 text-center">
          <span className="text-[10px] font-medium text-[#9d8189]/70 group-hover:text-[#d46a84] transition-colors">
            ✨ Нажмите на карточку для раскрытия (0.5с)
          </span>
        </div>
      </div>

      {/* ZOOMED MODAL CARD (Плавное увеличение за 0.5 секунд + блюр фона сайта + большое содержание) */}
      {isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xl flex items-center justify-center p-4 transition-all duration-500 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-white/85 backdrop-blur-3xl border border-white shadow-[0_24px_64px_rgba(255,182,193,0.4)] overflow-hidden transition-all duration-500 transform scale-100 flex flex-col max-h-[90vh]"
          >
            {/* TOP RIGHT PASTEL PINK BADGE IN ZOOMED VIEW */}
            {cartQty > 0 && (
              <div className="absolute top-4 right-16 z-30 px-3.5 py-1 rounded-full bg-[#ffadc6] text-white font-extrabold text-sm flex items-center gap-1.5 shadow-lg border-2 border-white">
                <span>В корзине: {cartQty} шт</span>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/80 hover:bg-white text-[#6d6875] transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Realistic Image */}
            <div className="relative h-72 sm:h-80 w-full shrink-0">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-[#ffadc6]/90 text-white text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                  {item.categoryTitle}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold drop-shadow-md">
                  {item.name}
                </h2>
              </div>
            </div>

            {/* Scrollable Detailed Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-[#fff0f3]/70 border border-white">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#804058]">
                  <span>💰 Цена:</span> <strong className="text-lg text-[#d46a84]">{item.price} ₽</strong>
                </div>
                {item.weight && (
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#6d6875] pl-3 border-l border-[#ffccd5]">
                    <span>⚖️ Вес:</span> {item.weight}
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-sm font-medium text-[#6d6875] pl-3 border-l border-[#ffccd5]">
                  <span>🔥 Калории:</span> {item.calories} ккал
                </div>
              </div>

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl bg-[#e8dafb]/80 text-[#5e4b8b] text-xs font-bold border border-white">
                  {item.isHalal ? '☪️ Халяль (Сертифицировано)' : '❌ Не халяль'}
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#ffe5ec] text-[#9b2242] text-xs font-bold border border-white">
                  🌶️ Острота: {item.spicyLevel}
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#d8f3dc] text-[#1b4332] text-xs font-bold border border-white">
                  {item.isSweet ? '🍭 Сладкое блюдо' : '🧂 Не сладкое (основное)'}
                </span>
              </div>

              {/* Full Description (обязательно) */}
              <div className="bg-white/60 p-4 rounded-2xl border border-white/80 shadow-sm">
                <h4 className="text-sm font-bold text-[#804058] mb-1.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d46a84]" />
                  <span>Описание блюда</span>
                </h4>
                <p className="text-sm text-[#4a4e69] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Ingredients List (обязательно, списком через запятую) */}
              <div className="bg-[#f0efeb]/60 p-4 rounded-2xl border border-white/80">
                <h4 className="text-sm font-bold text-[#6b705c] mb-1.5">
                  🥢 Ингредиенты (состав):
                </h4>
                <p className="text-sm text-[#5c677d] font-medium">
                  {item.ingredients.join(', ')}
                </p>
              </div>

              {/* Recommended Drinks (напитки) */}
              {item.recommendedDrinks.length > 0 && (
                <div className="bg-[#e8dafb]/40 p-4 rounded-2xl border border-white/80">
                  <h4 className="text-sm font-bold text-[#5e4b8b] mb-1.5 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-[#7b2cbf]" />
                    <span>Рекомендуемые напитки к блюду:</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.recommendedDrinks.map((drink, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-white/80 text-[#5e4b8b] text-xs font-semibold shadow-xs">
                        🧋 {drink}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Add to Cart Bar */}
            <div className="p-5 bg-white/90 border-t border-[#ffe5ec] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#9d8189] block font-medium">Итого за порцию:</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#804058]">
                  {item.price.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <div className="flex items-center gap-3">
                {cartQty === 0 ? (
                  <button
                    onClick={() => onAddToCart(item)}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ffadc6] to-[#ff8fa3] text-white font-extrabold text-base shadow-lg shadow-[#ffadc6]/50 hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Добавить в корзину</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-[#fff0f3] rounded-2xl p-1.5 border border-[#ffadc6]">
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="w-10 h-10 rounded-xl bg-white text-[#d46a84] hover:bg-[#ffe5ec] flex items-center justify-center font-bold shadow-sm"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-4 text-center font-extrabold text-lg text-[#804058]">
                      {cartQty} шт
                    </span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="w-10 h-10 rounded-xl bg-[#ffadc6] text-white hover:bg-[#ff8fa3] flex items-center justify-center font-bold shadow-sm"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
