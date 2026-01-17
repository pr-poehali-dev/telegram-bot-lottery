import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const DashboardView = () => {
  const stats = [
    { label: 'Всего участников', value: '1,247', icon: 'Users', color: 'bg-blue-500', change: '+12%' },
    { label: 'Совершено звонков', value: '856', icon: 'Phone', color: 'bg-green-500', change: '+8%' },
    { label: 'Ожидают звонка', value: '391', icon: 'Clock', color: 'bg-orange-500', change: '-3%' },
    { label: 'Успешные ответы', value: '68.7%', icon: 'CheckCircle2', color: 'bg-emerald-500', change: '+5%' },
  ];

  const quickActions = [
    { label: 'Загрузить список', icon: 'Upload', variant: 'default' as const },
    { label: 'Начать обзвон', icon: 'Play', variant: 'default' as const },
    { label: 'Экспорт данных', icon: 'Download', variant: 'outline' as const },
    { label: 'Настройки бота', icon: 'Settings', variant: 'outline' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Дашборд</h2>
        <p className="text-slate-500">Обзор текущего розыгрыша и статистика</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className={`${stat.color} rounded-lg p-2.5`}>
                <Icon name={stat.icon as any} className="text-white" size={20} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Прогресс обзвона</h3>
            <Button variant="ghost" size="sm">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Общий прогресс</span>
                <span className="text-sm font-semibold text-primary">68.7%</span>
              </div>
              <Progress value={68.7} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">856</p>
                <p className="text-xs text-slate-500 mt-1">Успешно</p>
              </div>
              <div className="text-center border-x border-slate-200">
                <p className="text-2xl font-bold text-orange-600">391</p>
                <p className="text-xs text-slate-500 mt-1">В очереди</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">124</p>
                <p className="text-xs text-slate-500 mt-1">Не отвечено</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Быстрые действия</h3>
          <div className="space-y-3">
            {quickActions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant}
                className="w-full justify-start gap-3"
                size="lg"
              >
                <Icon name={action.icon as any} size={18} />
                {action.label}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Последние активности</h3>
          <Button variant="link" size="sm">
            Показать все
          </Button>
        </div>
        <div className="space-y-3">
          {[
            { action: 'Загружен новый список участников', time: '5 минут назад', icon: 'FileUp', color: 'bg-blue-100 text-blue-600' },
            { action: 'Завершен звонок участнику #1234', time: '12 минут назад', icon: 'PhoneCall', color: 'bg-green-100 text-green-600' },
            { action: 'Обновлены настройки озвучки', time: '1 час назад', icon: 'Settings', color: 'bg-purple-100 text-purple-600' },
            { action: 'Экспортированы результаты', time: '2 часа назад', icon: 'Download', color: 'bg-orange-100 text-orange-600' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className={`${activity.color} rounded-lg p-2`}>
                <Icon name={activity.icon as any} size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardView;
