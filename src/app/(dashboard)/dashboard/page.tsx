'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockStats = {
  totalOrders: 156,
  pendingOrders: 24,
  completedOrders: 132,
  revenue: 275000,
  recentActivity: [
    { id: 1, description: 'Yeni sipariş alındı: #3456', date: '2 saat önce' },
    { id: 2, description: 'Sipariş #3245 tamamlandı', date: '4 saat önce' },
    { id: 3, description: 'Yeni müşteri eklendi: ABC Tekstil', date: '6 saat önce' },
    { id: 4, description: 'Sipariş #3125 iptal edildi', date: '1 gün önce' },
  ],
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(mockStats);
  
  // In a real app, you would fetch this data from your API
  useEffect(() => {
    // Example API call in a real application:
    // const fetchStats = async () => {
    //   const response = await fetch('/api/dashboard/stats');
    //   const data = await response.json();
    //   setStats(data);
    // };
    // fetchStats();
    
    // Using mock data for now
    setStats(mockStats);
  }, []);

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">
          Hoş Geldiniz, {session?.user?.name || 'Kullanıcı'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          RT TEKSTİL sistemine hoş geldiniz. Aşağıda güncel istatistiklerinizi görebilirsiniz.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Toplam Siparişler</dt>
            <dd className="mt-1 text-3xl font-semibold text-blue-600">{stats.totalOrders}</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Bekleyen Siparişler</dt>
            <dd className="mt-1 text-3xl font-semibold text-yellow-600">{stats.pendingOrders}</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Tamamlanan Siparişler</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">{stats.completedOrders}</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Toplam Gelir (₺)</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-600">{stats.revenue.toLocaleString('tr-TR')}</dd>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Son Aktiviteler</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {stats.recentActivity.map((activity) => (
            <li key={activity.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.description}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {activity.date}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Role-specific content */}
      {session?.user?.role === 'admin' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Yönetici Paneli</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500">
              Yönetici olarak sistemdeki tüm kullanıcıları ve raporları yönetebilirsiniz.
            </p>
            <div className="mt-4 flex">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Kullanıcı Ekle
              </button>
              <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Rapor Oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}