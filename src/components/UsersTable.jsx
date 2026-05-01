import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import UserProfile from './UserProfile';

const initialUsers = [
  { id: 1, name: "Priya Sharma", role: "Admin", email: "priya@email.com", status: "Active", joinDate: "2024-01-15" },
  { id: 2, name: "Ayush Jha", role: "User", email: "ayush@email.com", status: "Active", joinDate: "2024-03-22" },
  { id: 3, name: "Priya Sharma", role: "User", email: "priya@email.com", status: "Active", joinDate: "2024-03-22" },
  { id: 4, name: "Rahul Verma", role: "Moderator", email: "rahul@adminx.com", status: "Inactive", joinDate: "2023-11-10" },
  { id: 5, name: "Neha Gupta", role: "User", email: "neha@email.com", status: "Active", joinDate: "2024-02-05" },
];

export default function UsersTable() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', role: 'User', status: 'Active' });

  const { isAdmin } = useAuth();

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl text-sm font-medium z-50 ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} text-white`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    if (search) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter !== 'All') result = result.filter(user => user.role === roleFilter);
    if (statusFilter !== 'All') result = result.filter(user => user.status === statusFilter);

    return result;
  }, [users, search, roleFilter, statusFilter]);

  const openAddModal = () => {
    setModalMode('add');
    setCurrentUser({ name: '', email: '', role: 'User', status: 'Active' });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setModalMode('edit');
    setCurrentUser({ ...user });
    setShowModal(true);
  };

  const handleSaveUser = () => {
    if (!currentUser.name || !currentUser.email) return;

    if (modalMode === 'add') {
      setUsers([...users, { id: Date.now(), ...currentUser, joinDate: new Date().toISOString().slice(0, 10) }]);
      showToast(`User "${currentUser.name}" added successfully!`);
    } else {
      setUsers(users.map(u => u.id === currentUser.id ? { ...currentUser } : u));
      showToast(`User "${currentUser.name}" updated!`);
    }
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    ));
  };

  const deleteUser = (id, name) => {
    if (confirm(`Delete "${name}"?`)) {
      setUsers(users.filter(u => u.id !== id));
      showToast(`User "${name}" deleted`, "error");
    }
  };


  const openUserProfile = (user) => {
    setSelectedUser(user);
  };

  const closeUserProfile = () => {
    setSelectedUser(null);
  };

  return (
    <>
      {!selectedUser ? (

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200 flex flex-wrap gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-2xl px-5 py-3 w-80 focus:outline-none focus:border-blue-500"
            />

            <div className="flex gap-3">
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="bg-gray-100 border border-gray-300 rounded-2xl px-5 py-3">
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-gray-100 border border-gray-300 rounded-2xl px-5 py-3">
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {isAdmin && (
                <>
                  <button onClick={openAddModal} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-2xl flex items-center gap-2 text-white">
                    <i className="fa-solid fa-plus"></i> Add User
                  </button>
                </>
              )}
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-5 text-left cursor-pointer text-gray-700">User Name</th>
                <th className="px-8 py-5 text-left cursor-pointer text-gray-700">Role</th>
                <th className="px-8 py-5 text-left cursor-pointer text-gray-700">Email</th>
                <th className="px-8 py-5 text-left text-gray-700">Status</th>
                {isAdmin && <th className="px-8 py-5 text-left text-gray-700">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td
                    className="px-8 py-5 font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                    onClick={() => openUserProfile(user)}
                  >
                    {user.name}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1 text-xs rounded-full ${user.role === 'Admin' ? 'bg-purple-500' : user.role === 'Moderator' ? 'bg-orange-500' : 'bg-gray-500'} text-white`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-gray-600">{user.email}</td>
                  <td className="px-8 py-5">
                    <button onClick={() => toggleStatus(user.id)} className={`px-4 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </button>
                  </td>
                  {isAdmin && (
                    <td className="px-8 py-5 flex gap-4">
                      <button onClick={() => openEditModal(user)} className="text-blue-600 hover:text-blue-500"><i className="fa-solid fa-edit"></i></button>
                      <button onClick={() => deleteUser(user.id, user.name)} className="text-red-500 hover:text-red-400"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (

        <UserProfile user={selectedUser} onClose={closeUserProfile} />
      )}


      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h2>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-600 block mb-2">Full Name</label>
                <input type="text" value={currentUser.name} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} className="w-full bg-gray-100 border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Email</label>
                <input type="email" value={currentUser.email} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} className="w-full bg-gray-100 border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Role</label>
                <select value={currentUser.role} onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })} className="w-full bg-gray-100 border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500">
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  {isAdmin && <option value="Admin">Admin</option>}
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveUser} className="flex-1 py-4 bg-blue-500 rounded-2xl text-white hover:bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}