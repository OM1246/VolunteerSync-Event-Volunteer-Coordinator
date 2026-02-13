import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            <main className="pt-20 md:pt-24 px-4 pb-12 transition-all duration-500 min-h-[100dvh]" style={{ paddingTop: 'calc(5rem + env(safe-area-inset-top))' }}>
                <div className="max-w-7xl mx-auto animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
