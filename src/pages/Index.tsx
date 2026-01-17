import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import DashboardView from '@/components/DashboardView';
import ParticipantsView from '@/components/ParticipantsView';
import CallsView from '@/components/CallsView';
import UploadView from '@/components/UploadView';
import ResultsView from '@/components/ResultsView';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-xl p-2.5">
                <Icon name="Bot" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Розыгрыш Бот</h1>
                <p className="text-sm text-slate-500">Панель управления</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Icon name="Circle" size={8} className="fill-green-600 mr-1.5" />
                Активен
              </Badge>
              <Button variant="ghost" size="icon">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1.5 h-auto gap-1">
            <TabsTrigger value="dashboard" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Upload" size={18} />
              Загрузка
            </TabsTrigger>
            <TabsTrigger value="participants" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Users" size={18} />
              Участники
            </TabsTrigger>
            <TabsTrigger value="calls" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Phone" size={18} />
              Звонки
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="BarChart3" size={18} />
              Результаты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <DashboardView />
          </TabsContent>

          <TabsContent value="upload" className="space-y-6 animate-fade-in">
            <UploadView />
          </TabsContent>

          <TabsContent value="participants" className="space-y-6 animate-fade-in">
            <ParticipantsView />
          </TabsContent>

          <TabsContent value="calls" className="space-y-6 animate-fade-in">
            <CallsView />
          </TabsContent>

          <TabsContent value="results" className="space-y-6 animate-fade-in">
            <ResultsView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
