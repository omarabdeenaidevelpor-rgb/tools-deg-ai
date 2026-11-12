import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from 'next-themes';
import { ArabicProvider } from 'react-ari';
import Sidebar from '@/layouts/Sidebar';
import Dashboard from '@/pages/Dashboard';
import BrandStudio from '@/pages/BrandStudio';
import CVStudio from '@/pages/CVStudio';
import WebsiteStudio from '@/pages/WebsiteStudio';
import EbookStudio from '@/pages/EbookStudio';
import CourseStudio from '@/pages/CourseStudio';
import TemplateStudio from '@/pages/TemplateStudio';
import MarketingStudio from '@/pages/MarketingStudio';
import DigitalStore from '@/pages/DigitalStore';
import AutomationCenter from '@/pages/AutomationCenter';
import MyProjects from '@/pages/MyProjects';
import MediaLibrary from '@/pages/MediaLibrary';
import AISettings from '@/pages/AISettings';
import SystemSettings from '@/pages/SystemSettings';
import { ArabicLTR, ArabicRTL } from '@/types/locale';

const locales: ArabicLTR | ArabicRTL = {
  ar: {
    direction: 'rtl',
    locale: 'ar',
    name: 'العربية',
  },
  en: {
    direction: 'ltr',
    locale: 'en',
    name: 'English',
  },
};

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider attribute="class">
        <Sidebar />
        <main class="flex-1 overflow-y-auto bg-navy-950 min-h-screen">
          <RouterRoutes />
        </main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function RouterRoutes() {
  const [locale, setLocale] = React.useState<'ar' | 'en'>('en');

  const handleLocaleChange = (lang: 'ar' | 'en') => {
    setLocale(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">
          {locale === 'ar' ? 'مصنع المنتجات الرقمية AI' : 'Digital Product Factory AI'}
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleLocaleChange('en')}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            English
          </button>
          <button
            onClick={() => handleLocaleChange('ar')}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            العربية
          </button>
        </div>
      </div>

      <nav className="hidden md:block">
        <div className="space-y-2">
          <a
            href="#"
            onClick={() => window.location.hash = '/'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="LayoutDashboard" className="w-5 h-5 mr-2" />
            Dashboard
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/brand-studio'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="Palette" className="w-5 h-5 mr-2" />
            Brand Studio
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/cv-studio'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="User" className="w-5 h-5 mr-2" />
            CV Studio
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/website-studio'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="Monitor" className="w-5 h-5 mr-2" />
            Website Studio
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/ebook-studio'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="BookOpen" className="w-5 h-5 mr-2" />
            Ebook Studio
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/course-studio'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="GraduationCap" className="w-5 h-5 mr-2" />
            Course Studio
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/template-studio'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="Folder" className="w-5 h-5 mr-2" />
            Template Studio
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/marketing-studio'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="Megaphone" className="w-5 h-5 mr-2" />
            Marketing Studio
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/digital-store'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="ShoppingBag" className="w-5 h-5 mr-2" />
            Digital Store
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/automation-center'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="Zap" className="w-5 h-5 mr-2" />
            Automation Center
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/my-projects'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="Folder" className="w-5 h-5 mr-2" />
            My Projects
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/media-library'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="Image" className="w-5 h-5 mr-2" />
            Media Library
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/ai-settings'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="Brain" className="w-5 h-5 mr-2" />
            AI Settings
          </a>
          <a
            href="#"
            onClick={() => window.location.hash = '/system-settings'}
            className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <LucideIcon name="Settings" className="w-5 h-5 mr-2" />
            System Settings
          </a>
        </div>
      </nav>

      <section className="mt-4 md:mt-6">
        <Outlet />
      </section>
    </div>
  );
}

export default App;