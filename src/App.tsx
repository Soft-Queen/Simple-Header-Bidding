import { AdUnit } from './components/AdUnit';
import { Layout } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layout className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Header Bidding Demo</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Content Area */}
          <div className="md:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Article Content</h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua.
              </p>
              
              {/* Inline Ad Unit */}
              <AdUnit 
                id="article-ad-1"
                sizes={[[728, 90], [970, 250]]}
                className="my-6 flex justify-center bg-gray-50 p-4 rounded"
              />
              
              <p className="text-gray-600">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Sidebar Content</h3>
              
              {/* Sidebar Ad Unit */}
              <AdUnit 
                id="sidebar-ad-1"
                sizes={[[300, 250], [300, 600]]}
                className="my-4 flex justify-center bg-gray-50 p-2 rounded"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;