import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
        {/* 헤더 */}
        <main>
            {children}
        </main>
        {/* 푸터 */}
    </div>
  );
};

export default Layout;
