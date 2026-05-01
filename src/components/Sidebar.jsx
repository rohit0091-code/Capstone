import { useAuth } from '../context/AuthContext';

const menuItems = [
  { icon: 'fa-house', label: 'Dashboard', path: 'dashboard' },
  { icon: 'fa-users', label: 'Users', path: 'users' },
  { icon: 'fa-chart-line', label: 'Sales', path: 'sales' },
  { icon: 'fa-box', label: 'Products', path: 'products' },
  { icon: 'fa-file-lines', label: 'Reports', path: 'reports' },
];

export default function Sidebar({ activePage, setActivePage }) {
  const { currentUser, switchRole, isAdmin } = useAuth();

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen shadow-lg">
    
      <div className="p-6 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
          P
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Admin</h1>
          <p className="text-xs text-blue-600">Enterprise Dashboard</p>
        </div>
      </div>

     
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex bg-gray-100 rounded-3xl p-1 text-sm font-medium">
          <button
            onClick={() => switchRole('admin')}
            className={`flex-1 py-2.5 rounded-3xl transition-all ${currentUser.role === 'admin' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
            ADMIN
          </button>
          <button
            onClick={() => switchRole('user')}
            className={`flex-1 py-2.5 rounded-3xl transition-all ${currentUser.role === 'user' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
            USER
          </button>
        </div>
      </div>

    
      <nav className="flex-1 px-3 py-8">
        {menuItems.map((item) => {

          if (!isAdmin && ['users', 'reports'].includes(item.path)) return null;

          return (
            <button
              key={item.path}
              onClick={() => setActivePage(item.path)}
              className={`sidebar-link w-full flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-medium mb-1 
                ${activePage === item.path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              {item.label}
            </button>
          );
        })}
      </nav>


      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            className="w-11 h-11 rounded-2xl ring-2 ring-blue-500 object-cover"
            alt={currentUser.name}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{currentUser.name}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              ● {currentUser.role.toUpperCase()}
            </p>
          </div>
          <button
            onClick={() => alert('Logged out successfully!')}
            className="text-gray-600 hover:text-red-500 p-2 rounded-xl hover:bg-gray-100"
          >
            <i className="fa-solid fa-right-from-bracket text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}