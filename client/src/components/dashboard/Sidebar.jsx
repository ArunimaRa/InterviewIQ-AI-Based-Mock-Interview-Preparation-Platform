import { BarChart3, BrainCircuit, FileText, CheckCircle2, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const tabs = [
  { id: 'overview', icon: BarChart3, label: 'Analytics' },
  { id: 'interviews', icon: BrainCircuit, label: 'Mock AI' },
  { id: 'resume', icon: FileText, label: 'Resume' },
  { id: 'tests', icon: CheckCircle2, label: 'MCQ Tests' },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 fixed h-[calc(100vh-80px)] glass-panel border-y-0 border-l-0 rounded-none z-10 hidden md:flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 p-0.5 shadow-lg shadow-primary/20">
              <div className="w-full h-full bg-dark rounded-full flex items-center justify-center uppercase">
                <span className="text-lg font-bold">{user?.name?.substring(0, 2) || 'U'}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white">{user?.name || 'User'}</h3>
              <p className="text-xs text-gray-400">Premium Member</p>
            </div>
          </div>

          <nav className="space-y-2">
            {tabs.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-primary/20 to-transparent border-l-2 border-primary text-primary' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-0 z-40 bg-darker/95 backdrop-blur-md border-b border-white/5 px-4 py-3 mb-6">
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide snap-x">
          {tabs.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 snap-start flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
