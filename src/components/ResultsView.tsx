import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ResultsView = () => {
  const topParticipants = [
    { rank: 1, name: 'Иван Петров', city: 'Москва', score: 98, badge: '🥇' },
    { rank: 2, name: 'Мария Сидорова', city: 'Санкт-Петербург', score: 95, badge: '🥈' },
    { rank: 3, name: 'Алексей Козлов', city: 'Казань', score: 92, badge: '🥉' },
    { rank: 4, name: 'Елена Морозова', city: 'Москва', score: 89, badge: '' },
    { rank: 5, name: 'Дмитрий Новиков', city: 'Екатеринбург', score: 85, badge: '' },
  ];

  const cityStats = [
    { city: 'Москва', participants: 456, percentage: 36.5 },
    { city: 'Санкт-Петербург', participants: 312, percentage: 25.0 },
    { city: 'Казань', participants: 198, percentage: 15.9 },
    { city: 'Екатеринбург', participants: 156, percentage: 12.5 },
    { city: 'Другие', participants: 125, percentage: 10.0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Результаты розыгрыша</h2>
          <p className="text-slate-500">Статистика и итоги обзвона участников</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Share2" size={18} className="mr-2" />
            Поделиться
          </Button>
          <Button>
            <Icon name="Download" size={18} className="mr-2" />
            Экспорт отчета
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Успешных звонков', value: '856', icon: 'CheckCircle2', color: 'bg-green-500' },
          { label: 'Средняя длительность', value: '1:45', icon: 'Clock', color: 'bg-blue-500' },
          { label: 'Процент ответов', value: '68.7%', icon: 'TrendingUp', color: 'bg-purple-500' },
          { label: 'Общее время', value: '24:32', icon: 'Timer', color: 'bg-orange-500' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`${stat.color} rounded-lg p-2.5`}>
                <Icon name={stat.icon as any} className="text-white" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Топ участников</h3>
            <Button variant="ghost" size="sm">
              <Icon name="Trophy" size={16} className="mr-2 text-yellow-500" />
              Все победители
            </Button>
          </div>

          <div className="space-y-3">
            {topParticipants.map((participant) => (
              <div
                key={participant.rank}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 font-bold text-slate-700">
                  {participant.badge || participant.rank}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{participant.name}</p>
                  <p className="text-xs text-slate-500">{participant.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{participant.score}</p>
                  <p className="text-xs text-slate-500">баллов</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            <Icon name="Eye" size={16} className="mr-2" />
            Показать всех участников
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Статистика по городам</h3>
            <Button variant="ghost" size="sm">
              <Icon name="MapPin" size={16} className="mr-2" />
              Карта
            </Button>
          </div>

          <div className="space-y-4">
            {cityStats.map((city, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{city.city}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-semibold">{city.participants}</span>
                    <span className="text-slate-500 text-xs">({city.percentage}%)</span>
                  </div>
                </div>
                <Progress value={city.percentage} className="h-2" />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Всего участников:</span>
              <span className="text-lg font-bold text-primary">1,247</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Детальная статистика звонков</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Calendar" size={16} className="mr-2" />
              За неделю
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="RefreshCw" size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 rounded-lg p-2">
                <Icon name="CheckCircle2" size={18} className="text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-700">Успешные</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Ответили сразу</span>
                <span className="font-semibold text-slate-900">567</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Перезвонили</span>
                <span className="font-semibold text-slate-900">289</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="font-semibold text-green-600">Итого</span>
                <span className="font-bold text-green-600">856</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-red-100 rounded-lg p-2">
                <Icon name="XCircle" size={18} className="text-red-600" />
              </div>
              <h4 className="font-semibold text-slate-700">Неуспешные</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Не ответили</span>
                <span className="font-semibold text-slate-900">98</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Занято</span>
                <span className="font-semibold text-slate-900">26</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="font-semibold text-red-600">Итого</span>
                <span className="font-bold text-red-600">124</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-orange-100 rounded-lg p-2">
                <Icon name="Clock" size={18} className="text-orange-600" />
              </div>
              <h4 className="font-semibold text-slate-700">Ожидание</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">В очереди</span>
                <span className="font-semibold text-slate-900">312</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Запланировано</span>
                <span className="font-semibold text-slate-900">79</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="font-semibold text-orange-600">Итого</span>
                <span className="font-bold text-orange-600">391</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-primary/5 to-blue-50 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="bg-primary rounded-lg p-3">
            <Icon name="TrendingUp" size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-2">Эффективность кампании</h4>
            <p className="text-sm text-slate-600 mb-4">
              Ваша кампания показывает отличные результаты! Процент успешных звонков на 15% выше среднего показателя.
            </p>
            <div className="flex gap-3">
              <Badge className="bg-green-500">+15% к среднему</Badge>
              <Badge variant="outline">68.7% успешность</Badge>
              <Badge variant="outline">1,247 участников</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsView;
