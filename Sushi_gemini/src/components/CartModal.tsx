import React from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { MenuItem } from '../data/menuData';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onIncrease: (item: MenuItem) => void;
  onDecrease: (itemId: string) => void;
  onClear: () => void;
  onProceedToOrder: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onIncrease,
  onDecrease,
  onClear,
  onProceedToOrder
}) => {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 sm:py-10 animate-fade-in"
    >
      {/* Full-screen pop-up taking up most of screen (большая часть экрана в центре) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl h-[88vh] rounded-3xl bg-white/85 backdrop-blur-3xl border border-white shadow-[0_24px_80px_rgba(255,182,193,0.45)] flex flex-col overflow-hidden animate-scale-up"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#ffe5ec]/80 via-[#f0efeb]/80 to-[#e8dafb]/80 border-b border-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#ffadc6] text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#804058] flex items-center gap-2">
                <span>Ваша корзина Moon Song</span>
              </h2>
              <p className="text-xs text-[#9d8189] font-medium">
                {cartItems.length > 0
                  ? `В чеке позиций: ${cartItems.length}`
                  : 'Корзина пока пуста'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {cartItems.length > 0 && (
              <button
                onClick={onClear}
                className="px-3.5 py-2 rounded-xl bg-white/70 hover:bg-[#ffe5ec] text-[#d46a84] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white"
                title="Очистить всю корзину"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Очистить</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/80 hover:bg-white text-[#6d6875] transition-all shadow-sm border border-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body / Items list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-24 h-24 rounded-full bg-[#fff0f3] flex items-center justify-center mb-4 text-4xl shadow-inner border border-white">
                🍱
              </div>
              <h3 className="text-xl font-bold text-[#804058] mb-2">
                В корзине пока нет блюд
              </h3>
              <p className="text-sm text-[#9d8189] max-w-md mb-6">
                Выберите аппетитные сеты, суши или роллы из нашего меню на главной странице.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ffadc6] to-[#ff8fa3] text-white font-bold shadow-md shadow-[#ffadc6]/40 hover:scale-105 transition-transform"
              >
                Перейти в меню
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map(({ item, quantity }) => {
                const itemTotal = item.price * quantity;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 shadow-sm border border-white"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#b5838d] tracking-wider block">
                          {item.categoryTitle}
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-[#4a4e69] leading-tight mb-1">
                          {item.name}
                        </h4>
                        <span className="text-xs text-[#9d8189]">
                          {item.price} ₽ / порция
                        </span>
                      </div>
                    </div>

                    {/* Quantity + & - controls */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 pt-3 sm:pt-0 border-t sm:border-0 border-[#ffe5ec]">
                      <div className="flex items-center gap-1.5 bg-[#fff0f3] rounded-2xl p-1 border border-[#ffadc6]/60 shadow-xs">
                        <button
                          onClick={() => onDecrease(item.id)}
                          className="w-8 h-8 rounded-xl bg-white text-[#d46a84] hover:bg-[#ffe5ec] flex items-center justify-center font-bold shadow-2xs transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-extrabold text-base text-[#804058]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onIncrease(item)}
                          className="w-8 h-8 rounded-xl bg-[#ffadc6] text-white hover:bg-[#ff8fa3] flex items-center justify-center font-bold shadow-2xs transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Total price for this item with quantity */}
                      <div className="text-right min-w-[100px]">
                        <span className="text-[11px] text-[#9d8189] block font-medium">Сумма:</span>
                        <span className="text-lg font-extrabold text-[#804058]">
                          {itemTotal.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with total price & order button */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white/95 border-t border-[#ffe5ec] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-lg">
            <div>
              <span className="text-xs text-[#9d8189] uppercase tracking-wider font-semibold block">
                Итого к оплате по чеку:
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-[#d46a84] to-[#804058] bg-clip-text text-transparent">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-xs text-[#2d6a4f] bg-[#d8f3dc] px-2.5 py-0.5 rounded-full font-bold">
                  ✓ Бесплатная доставка Moon
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToOrder}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ffadc6] via-[#ff8fa3] to-[#d46a84] text-white font-extrabold text-lg shadow-xl shadow-[#ffadc6]/50 hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-3"
            >
              <span>Заказать ({totalPrice} ₽)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
