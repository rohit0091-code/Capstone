import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserProfile({ user, onClose }) {
    const { isAdmin } = useAuth();

    const [userStats] = useState(() => ({
        totalOrders: Math.floor(Math.random() * 50) + 15,
        totalSpent: (Math.random() * 1200 + 450).toFixed(2),
        joinDate: user.joinDate,
        lastActive: "2 days ago"
    }));

    const recentOrders = [
        { id: "#3921", date: "2025-04-15", amount: 239, status: "Delivered" },
        { id: "#3894", date: "2025-04-08", amount: 89, status: "Processing" },
        { id: "#3782", date: "2025-03-29", amount: 145, status: "Delivered" },
    ];

    return (
        <div className="bg-orange-50 rounded-3xl p-8 max-w-5xl mx-auto border border-orange-200">
            <button
                onClick={onClose}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
            >
                <i className="fa-solid fa-arrow-left"></i> Back Users
            </button>

            <div className="flex gap-8">
               
                <div className="w-96 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center text-5xl font-bold text-white mb-6">
                            {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-blue-600 mt-1">{user.email}</p>

                        <div className="mt-6 flex gap-2">
                            <span className={`px-5 py-1.5 text-sm rounded-full ${user.role === 'Admin' ? 'bg-purple-500' : user.role === 'Moderator' ? 'bg-orange-500' : 'bg-gray-500'} text-white`}>
                                {user.role}
                            </span>
                            <span className={`px-5 py-1.5 text-sm rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                {user.status}
                            </span>
                        </div>
                    </div>

                    <div className="mt-10 space-y-6 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Joined</span>
                            <span className="text-gray-900">{userStats.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Last Active</span>
                            <span className="text-gray-900">{userStats.lastActive}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Orders</span>
                            <span className="font-semibold text-gray-900">{userStats.totalOrders}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Spent</span>
                            <span className="font-semibold text-gray-900">${userStats.totalSpent}</span>
                        </div>
                    </div>
                </div>


                <div className="flex-1 space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">User Activity Dashboard</h3>


                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                        <h4 className="font-semibold mb-4 text-gray-900">Recent Orders</h4>
                        <div className="space-y-4">
                            {recentOrders.map(order => (
                                <div key={order.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                                    <div>
                                        <p className="font-medium text-gray-900">{order.id}</p>
                                        <p className="text-xs text-gray-600">{order.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">${order.amount}</p>
                                        <p className={`text-xs ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                                            {order.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                        <h4 className="font-semibold mb-4 text-gray-900">Recent Activity</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-4">
                                <div className="text-green-600">•</div>
                                <div className="text-gray-900">Placed order #{recentOrders[0].id} - ${recentOrders[0].amount}</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-blue-600">•</div>
                                <div className="text-gray-900">Updated profile information</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-orange-600">•</div>
                                <div className="text-gray-900">Logged in from new device</div>
                            </div>
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="bg-white rounded-3xl p-6 text-center shadow-lg border border-gray-100">
                            <p className="text-gray-600">Admin Actions</p>
                            <div className="flex gap-4 justify-center mt-4">
                                <button className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 border border-red-200">Suspend User</button>
                                <button className="px-6 py-3 bg-orange-50 text-orange-600 rounded-2xl hover:bg-orange-100 border border-orange-200">Reset Password</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}