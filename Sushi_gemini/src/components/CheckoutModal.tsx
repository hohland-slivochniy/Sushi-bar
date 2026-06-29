import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, Sparkles, Home, Building, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToCart: () => void;
  totalPrice: number;
  onConfirmOrder: (address: { street: string; house: string; entrance?: string; apartment?: string; comment?: string }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onBackToCart,
  totalPrice,
  onConfirmOrder
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [entrance, setEntrance] = useState('');
  const [apartment, setApartment] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street.trim() || !house.trim()) {
      setError('Пожалуйста, укажите улицу и номер дома');
      return;
    }
    setError('');

    // Trigger celebration confetti!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    onConfirmOrder({ street, house, entrance, apartment, comment });
    setStep('success');
  };

  const handleFinish = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-white/90 backdrop-blur-3xl border border-white shadow-[0_24px_80px_rgba(255,182,193,0.45)] overflow-hidden animate-scale-up"
      >
        {step === 'form' ? (
          <>
            {/* Form Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-[#ffe5ec] to-[#e8dafb] border-b border-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={onBackToCart}
                  className="p-2 rounded-xl bg-white/70 hover:bg-white text-[#804058] transition-colors"
                  title="Вернуться в корзину"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-extrabold text-[#804058] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#d46a84]" />
                    <span>Оформление заказа Moon Song</span>
                  </h2>
                  <p className="text-xs text-[#9d8189]">Адрес доставки и пожелания к заказу</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-white/80 hover:bg-white text-[#6d6875] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3.5 rounded-2xl bg-[#ffccd5]/60 text-[#9b2242] text-sm font-semibold border border-white">
                  ⚠️ {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-[#804058] flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-[#d46a84]" />
                    <span>Улица *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: ул. Лунная / Сакура проспект"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#ffccd5] focus:outline-none focus:ring-2 focus:ring-[#ffadc6] text-sm text-[#4a4e69] font-medium shadow-xs transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#804058] flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#d46a84]" />
                    <span>Дом *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="№ 14/2"
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#ffccd5] focus:outline-none focus:ring-2 focus:ring-[#ffadc6] text-sm text-[#4a4e69] font-medium shadow-xs transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6d6875]">Подъезд / Этаж</label>
                  <input
                    type="text"
                    placeholder="Например: 2 подъезд, 4 этаж"
                    value={entrance}
                    onChange={(e) => setEntrance(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white focus:outline-none focus:ring-2 focus:ring-[#e8dafb] text-sm text-[#4a4e69]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6d6875]">Квартира / Офис</label>
                  <input
                    type="text"
                    placeholder="Например: кв. 42"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white focus:outline-none focus:ring-2 focus:ring-[#e8dafb] text-sm text-[#4a4e69]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6d6875]">Комментарий к заказу</label>
                <textarea
                  rows={2}
                  placeholder="Количество приборов, домофон не работает или пожелания шеф-повару..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white focus:outline-none focus:ring-2 focus:ring-[#e8dafb] text-sm text-[#4a4e69] resize-none"
                />
              </div>

              <div className="pt-4 border-t border-[#ffe5ec] flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#9d8189] block">Итого к оплате:</span>
                  <span className="text-2xl font-extrabold text-[#804058]">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#ffadc6] to-[#d46a84] text-white font-extrabold text-base shadow-lg shadow-[#ffadc6]/50 hover:brightness-105 active:scale-98 transition-all flex items-center gap-2"
                >
                  <span>Оформить заказ</span>
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          /* SUCCESS SCREEN */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-[#d8f3dc] text-[#2d6a4f] flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
              <CheckCircle2 className="w-14 h-14" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#804058] to-[#d46a84] bg-clip-text text-transparent">
                Вы успешно оформили заказ! 🌸
              </h2>
              <p className="text-sm sm:text-base text-[#6d6875] max-w-md mx-auto leading-relaxed">
                Спасибо за заказ в Moon Song! Повар уже начал готовить ваши блюда под лунным светом. Заказ записан в базу данных и отображается в вашем личном кабинете.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fff0f3]/70 border border-white w-full max-w-sm text-left space-y-1 text-xs text-[#804058]">
              <div className="flex justify-between">
                <span>📍 Адрес доставки:</span>
                <strong>ул. {street}, д. {house}</strong>
              </div>
              <div className="flex justify-between">
                <span>⌛ Время доставки:</span>
                <strong>~35-45 минут</strong>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#ffadc6] to-[#d46a84] text-white font-extrabold shadow-lg shadow-[#ffadc6]/40 hover:scale-105 transition-all"
            >
              Отлично, вернуться на главную
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
