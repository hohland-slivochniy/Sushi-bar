import React, { useState } from 'react';
import { UserProfile, dbService, OrderRecord } from '../utils/dbSimulation';
import { Mail, Clock, LogOut, Moon, CheckCircle, Database, Download, Sparkles } from 'lucide-react';

interface AuthAndProfilePageProps {
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  onDownloadZip: () => void;
}

export const AuthAndProfilePage: React.FC<AuthAndProfilePageProps> = ({
  currentUser,
  onLoginSuccess,
  onLogout,
  onDownloadZip
}) => {
  // Registration form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'database'>('orders');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;

    const user = dbService.registerUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      patronymic: patronymic.trim(),
      email: email.trim()
    });
    onLoginSuccess(user);
  };

  // IF NOT LOGGED IN: REGISTRATION SCREEN (на экране слева окно с пользовательским вводом и соответствующим placeholder текстом)
  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
        <div className="rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_16px_48px_rgba(255,182,193,0.3)] overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT SIDE: USER INPUT WINDOW WITH PLACEHOLDERS */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/50 border-b lg:border-b-0 lg:border-r border-white">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffccd5]/70 text-[#804058] text-xs font-extrabold tracking-wider uppercase mb-3">
                <Moon className="w-3.5 h-3.5" />
                <span>Регистрация аккаунта Moon Song</span>
              </span>
              <h2 className="text-3xl font-extrabold text-[#804058] mb-2">
                Создание аккаунта в .db
              </h2>
              <p className="text-sm text-[#6d6875]">
                Заполните данные слева. По нажатию на кнопку вы автоматически войдете в аккаунт, который сохранится в базе данных.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#804058]">Имя *</label>
                <input
                  type="text"
                  required
                  placeholder="Например: Алина / Сакура"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/90 border border-[#ffccd5] focus:outline-none focus:ring-2 focus:ring-[#ffadc6] text-sm text-[#4a4e69] font-medium shadow-xs transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#804058]">Фамилия *</label>
                <input
                  type="text"
                  required
                  placeholder="Например: Иванова / Цветаева"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/90 border border-[#ffccd5] focus:outline-none focus:ring-2 focus:ring-[#ffadc6] text-sm text-[#4a4e69] font-medium shadow-xs transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6d6875]">Отчество</label>
                <input
                  type="text"
                  placeholder="Например: Валерьевна / Александровна"
                  value={patronymic}
                  onChange={(e) => setPatronymic(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/90 border border-white focus:outline-none focus:ring-2 focus:ring-[#e8dafb] text-sm text-[#4a4e69] font-medium shadow-xs transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#804058]">Электронная почта (E-mail) *</label>
                <input
                  type="email"
                  required
                  placeholder="moon.song@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/90 border border-[#ffccd5] focus:outline-none focus:ring-2 focus:ring-[#ffadc6] text-sm text-[#4a4e69] font-medium shadow-xs transition-all"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ffadc6] via-[#ff8fa3] to-[#d46a84] text-white font-extrabold text-base shadow-xl shadow-[#ffadc6]/50 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Зарегистрироваться и войти автоматически</span>
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE: PASTEL HERO & TECH INFO */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 bg-gradient-to-br from-[#ffe5ec]/70 via-[#f0efeb]/70 to-[#e8dafb]/70 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-white shadow-md flex items-center justify-center mb-6 border border-white">
                🌸
              </div>
              <h3 className="text-2xl font-extrabold text-[#804058] mb-4">
                Преимущества личного кабинета Moon Song
              </h3>
              <ul className="space-y-4 text-sm text-[#4a4e69]">
                <li className="flex items-start gap-3 bg-white/60 p-3.5 rounded-2xl border border-white">
                  <CheckCircle className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#804058] block">Полная история заказов</strong>
                    Отслеживайте статус приготовления блюд и состав прошлых чеков в реальном времени.
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white/60 p-3.5 rounded-2xl border border-white">
                  <Database className="w-5 h-5 text-[#7b2cbf] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#804058] block">Сохранение в базе данных SQLite (.db)</strong>
                    Ваши данные надежно записываются в файл базы данных. Вы можете скачать весь проект с Python/FastAPI бэкендом в один клик.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-6 rounded-3xl bg-white/80 border border-white shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#804058]">Нужен исходный код проекта с Python API?</h4>
                  <p className="text-xs text-[#9d8189]">Включает FastAPI, SQLite, README.md и requirements.txt</p>
                </div>
                <button
                  onClick={onDownloadZip}
                  className="px-4 py-2.5 rounded-xl bg-[#d8f3dc] text-[#1b4332] font-bold text-xs flex items-center gap-1.5 shadow-xs hover:bg-[#b7e4c7] shrink-0 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Скачать .ZIP</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // IF LOGGED IN: PERSONAL CABINET (Личный кабинет с историей заказов)
  const userOrders = dbService.getUserOrders(currentUser.id);
  const dbDump = dbService.getRawDbDump();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in space-y-8">
      {/* Profile Header Banner */}
      <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white p-6 md:p-8 shadow-[0_12px_40px_rgba(255,182,193,0.25)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-tr from-[#ffadc6] via-[#e8dafb] to-[#d8f3dc] text-white font-extrabold text-2xl flex items-center justify-center shadow-md border-2 border-white">
            {currentUser.firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-bold mb-1.5 border border-white">
              ✓ Активный аккаунт в базе .db
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#804058]">
              {currentUser.lastName} {currentUser.firstName} {currentUser.patronymic}
            </h1>
            <p className="text-xs text-[#9d8189] flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5 text-[#d46a84]" />
              <span>{currentUser.email}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onDownloadZip}
            className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-[#d8f3dc] text-[#1b4332] font-bold text-sm shadow-sm hover:bg-[#b7e4c7] transition-all flex items-center justify-center gap-2 border border-white"
          >
            <Download className="w-4 h-4" />
            <span>Скачать Python Backend (.ZIP)</span>
          </button>
          <button
            onClick={onLogout}
            className="px-5 py-3 rounded-2xl bg-[#fff0f3] text-[#d46a84] hover:bg-[#ffe5ec] font-bold text-sm transition-all flex items-center gap-2 border border-white"
          >
            <LogOut className="w-4 h-4" />
            <span>Выйти</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (История заказов / Просмотр базы данных .db) */}
      <div className="flex gap-3 border-b border-white pb-3">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-[#ffadc6] to-[#ff8fa3] text-white shadow-md shadow-[#ffadc6]/40'
              : 'bg-white/70 text-[#6d6875] hover:bg-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>История заказов ({userOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'database'
              ? 'bg-gradient-to-r from-[#e8dafb] to-[#c77dff] text-white shadow-md shadow-[#e8dafb]/40'
              : 'bg-white/70 text-[#6d6875] hover:bg-white'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Инспектор базы данных (moonsong.db)</span>
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'orders' ? (
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white p-12 text-center flex flex-col items-center justify-center shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#fff0f3] flex items-center justify-center text-3xl mb-4 border border-white">
                📦
              </div>
              <h3 className="text-xl font-bold text-[#804058] mb-1">У вас пока нет оформленных заказов</h3>
              <p className="text-sm text-[#9d8189] max-w-md">
                Добавьте любимые сеты, роллы или суши в корзину и оформите первый заказ прямо сейчас!
              </p>
            </div>
          ) : (
            userOrders.map((order: OrderRecord) => (
              <div
                key={order.id}
                className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white p-6 shadow-[0_8px_24px_rgba(255,182,193,0.2)] hover:shadow-[0_12px_32px_rgba(255,182,193,0.3)] transition-all space-y-4"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#ffe5ec]">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-xl bg-[#ffccd5]/80 text-[#804058] font-extrabold text-xs">
                      {order.id}
                    </span>
                    <span className="text-xs font-semibold text-[#9d8189]">
                      📅 {order.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-xl bg-[#d8f3dc] text-[#1b4332] text-xs font-bold border border-white">
                      {order.status}
                    </span>
                    <span className="text-lg font-extrabold text-[#804058]">
                      {order.totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 border border-white">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0">
                        <h5 className="font-bold text-xs text-[#4a4e69] truncate">{item.name}</h5>
                        <span className="text-[11px] text-[#9d8189]">{item.quantity} шт × {item.price} ₽</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address summary */}
                <div className="pt-2 text-xs text-[#6d6875] bg-[#f0efeb]/60 p-3 rounded-2xl flex items-center gap-2 border border-white">
                  <span>📍 Доставка по адресу:</span>
                  <strong className="text-[#804058]">ул. {order.address.street}, д. {order.address.house} {order.address.apartment && `, кв. ${order.address.apartment}`}</strong>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* DATABASE (.db) INSPECTOR VIEW */
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white p-6 md:p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#804058] flex items-center gap-2">
                <Database className="w-5 h-5 text-[#7b2cbf]" />
                <span>Импорт/Экспорт SQLite Базы Данных (moonsong.db)</span>
              </h3>
              <p className="text-xs text-[#6d6875]">
                Смоделированная структура реляционных таблиц (users, orders) для Python FastAPI бэкенда.
              </p>
            </div>

            <button
              onClick={onDownloadZip}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#ffadc6] to-[#d46a84] text-white font-bold text-xs shadow-md shadow-[#ffadc6]/40 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Скачать полный проект (Backend + .db)</span>
            </button>
          </div>

          {/* Code preview of database content */}
          <div className="bg-[#2b2d42] text-[#e2eafc] p-6 rounded-2xl font-mono text-xs overflow-x-auto space-y-4 shadow-inner">
            <div className="text-[#8d99ae]">// Файл базы данных: {dbDump.databaseFile}</div>
            <div>
              <span className="text-[#ffb703]">SELECT * FROM users;</span>
              <pre className="mt-1 bg-black/30 p-3 rounded-xl text-[#a8dadc] overflow-x-auto">
                {JSON.stringify(dbDump.tables.users, null, 2)}
              </pre>
            </div>
            <div>
              <span className="text-[#ffb703]">SELECT * FROM orders;</span>
              <pre className="mt-1 bg-black/30 p-3 rounded-xl text-[#a8dadc] overflow-x-auto">
                {JSON.stringify(dbDump.tables.orders, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
