import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Fixed height, scrolls independently */}
      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header - Fixed */}
        <div className="sticky top-0 z-50 shrink-0">
          <Header />
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </div>
        
        {/* Footer - Fixed */}
        <div className="sticky bottom-0 z-40 shrink-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;