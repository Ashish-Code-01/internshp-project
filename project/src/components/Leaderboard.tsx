import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react';
import { api } from '../services/api';
import { Intern } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await api.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">#{rank}</div>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalRaised = leaderboard.reduce((sum, intern) => sum + intern.totalRaised, 0);
  const totalDonations = leaderboard.reduce((sum, intern) => sum + intern.totalDonations, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Intern Leaderboard</h1>
            <p className="text-purple-100">See how everyone is performing this month</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Top Performers</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalRaised)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalDonations.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Interns</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{leaderboard.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">Top Performers</h3>
        <div className="flex justify-center items-end space-x-8">
          {leaderboard.slice(0, 3).map((intern, index) => {
            const rank = index + 1;
            const height = rank === 1 ? 'h-32' : rank === 2 ? 'h-24' : 'h-20';
            const position = rank === 1 ? 'order-2' : rank === 2 ? 'order-1' : 'order-3';
            
            return (
              <div key={intern.id} className={`flex flex-col items-center ${position}`}>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                    {intern.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex justify-center">{getRankIcon(rank)}</div>
                </div>
                <div className={`${getRankBadgeColor(rank)} ${height} w-24 rounded-t-lg flex flex-col justify-end p-4`}>
                  <div className="text-center text-white">
                    <p className="font-bold text-lg">#{rank}</p>
                    <p className="text-xs opacity-90">{formatCurrency(intern.totalRaised)}</p>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="font-medium text-gray-900">{intern.name}</p>
                  <p className="text-sm text-gray-600">{intern.totalDonations} donations</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Full Rankings</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {leaderboard.map((intern) => (
            <div
              key={intern.id}
              className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                user?.id === intern.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(intern.rank)}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {intern.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 flex items-center">
                      {intern.name}
                      {user?.id === intern.id && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">You</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">{intern.referralCode}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(intern.totalRaised)}</p>
                  <p className="text-sm text-gray-600">{intern.totalDonations} donations</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;