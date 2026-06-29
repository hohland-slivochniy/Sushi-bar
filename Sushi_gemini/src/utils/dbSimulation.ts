export interface UserProfile {
  id: string;
  firstName: string; // Имя
  lastName: string;  // Фамилия
  patronymic: string; // Отчество
  email: string;     // Почта
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface OrderRecord {
  id: string;
  userId: string;
  date: string;
  items: OrderItem[];
  totalPrice: number;
  address: {
    street: string;
    house: string;
    entrance?: string;
    apartment?: string;
    comment?: string;
  };
  status: string;
}

const DB_USERS_KEY = 'moonsong_sqlite_users_db';
const DB_ORDERS_KEY = 'moonsong_sqlite_orders_db';
const CURRENT_USER_KEY = 'moonsong_current_user_id';

export const dbService = {
  getUsers(): UserProfile[] {
    const data = localStorage.getItem(DB_USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  getOrders(): OrderRecord[] {
    const data = localStorage.getItem(DB_ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  registerUser(userData: Omit<UserProfile, 'id' | 'createdAt'>): UserProfile {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      // Login if exists or update
      localStorage.setItem(CURRENT_USER_KEY, existing.id);
      return existing;
    }
    const newUser: UserProfile = {
      ...userData,
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(DB_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, newUser.id);
    console.log('[SQLite .db Simulation] User saved into users.db:', newUser);
    return newUser;
  },

  getCurrentUser(): UserProfile | null {
    const userId = localStorage.getItem(CURRENT_USER_KEY);
    if (!userId) return null;
    const users = this.getUsers();
    return users.find(u => u.id === userId) || null;
  },

  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  addOrder(userId: string, items: OrderItem[], totalPrice: number, address: OrderRecord['address']): OrderRecord {
    const orders = this.getOrders();
    const newOrder: OrderRecord = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userId,
      date: new Date().toLocaleString('ru-RU', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }),
      items,
      totalPrice,
      address,
      status: 'Приготовление 🍣'
    };
    orders.unshift(newOrder);
    localStorage.setItem(DB_ORDERS_KEY, JSON.stringify(orders));
    console.log('[SQLite .db Simulation] Order saved into orders.db:', newOrder);
    return newOrder;
  },

  getUserOrders(userId: string): OrderRecord[] {
    const orders = this.getOrders();
    return orders.filter(o => o.userId === userId);
  },

  getRawDbDump() {
    return {
      databaseFile: 'moonsong.db (SQLite 3.42)',
      tables: {
        users: this.getUsers(),
        orders: this.getOrders(),
      }
    };
  }
};
