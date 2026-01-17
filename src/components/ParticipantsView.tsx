import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ParticipantsView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const participants = [
    { id: 1, name: 'Иван Петров', phone: '+7 (999) 123-45-67', email: 'ivan@example.com', city: 'Москва', date: '2026-01-15', status: 'called', result: 'success' },
    { id: 2, name: 'Мария Сидорова', phone: '+7 (999) 234-56-78', email: 'maria@example.com', city: 'Санкт-Петербург', date: '2026-01-15', status: 'pending', result: null },
    { id: 3, name: 'Алексей Козлов', phone: '+7 (999) 345-67-89', email: 'alex@example.com', city: 'Казань', date: '2026-01-16', status: 'called', result: 'no-answer' },
    { id: 4, name: 'Елена Морозова', phone: '+7 (999) 456-78-90', email: 'elena@example.com', city: 'Москва', date: '2026-01-16', status: 'called', result: 'success' },
    { id: 5, name: 'Дмитрий Новиков', phone: '+7 (999) 567-89-01', email: 'dmitry@example.com', city: 'Екатеринбург', date: '2026-01-17', status: 'pending', result: null },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: 'Ожидает', className: 'bg-orange-100 text-orange-700 border-orange-200' },
      called: { label: 'Обзвонен', className: 'bg-blue-100 text-blue-700 border-blue-200' },
    };
    return variants[status] || variants.pending;
  };

  const getResultBadge = (result: string | null) => {
    if (!result) return null;
    const variants: Record<string, { label: string; className: string; icon: string }> = {
      success: { label: 'Успешно', className: 'bg-green-100 text-green-700', icon: 'CheckCircle2' },
      'no-answer': { label: 'Не ответил', className: 'bg-red-100 text-red-700', icon: 'XCircle' },
    };
    return variants[result];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Участники розыгрыша</h2>
          <p className="text-slate-500">Управление базой участников</p>
        </div>
        <Button>
          <Icon name="UserPlus" size={18} className="mr-2" />
          Добавить участника
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Поиск по имени, телефону или email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидают</SelectItem>
                <SelectItem value="called">Обзвонены</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Город" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все города</SelectItem>
                <SelectItem value="moscow">Москва</SelectItem>
                <SelectItem value="spb">Санкт-Петербург</SelectItem>
                <SelectItem value="kazan">Казань</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Icon name="Filter" size={18} />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 p-3 rounded-tl-lg">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="text-left text-xs font-semibold text-slate-600 p-3">Имя</th>
                <th className="text-left text-xs font-semibold text-slate-600 p-3">Контакты</th>
                <th className="text-left text-xs font-semibold text-slate-600 p-3">Город</th>
                <th className="text-left text-xs font-semibold text-slate-600 p-3">Дата</th>
                <th className="text-left text-xs font-semibold text-slate-600 p-3">Статус</th>
                <th className="text-left text-xs font-semibold text-slate-600 p-3">Результат</th>
                <th className="text-left text-xs font-semibold text-slate-600 p-3 rounded-tr-lg">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {participants.map((participant) => {
                const statusBadge = getStatusBadge(participant.status);
                const resultBadge = participant.result ? getResultBadge(participant.result) : null;
                
                return (
                  <tr key={participant.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <input type="checkbox" className="rounded border-slate-300" />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {participant.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{participant.name}</p>
                          <p className="text-xs text-slate-500">ID: {participant.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm text-slate-700">
                          <Icon name="Phone" size={14} className="text-slate-400" />
                          {participant.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Icon name="Mail" size={12} className="text-slate-400" />
                          {participant.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-slate-600">{participant.city}</td>
                    <td className="p-3 text-sm text-slate-600">{participant.date}</td>
                    <td className="p-3">
                      <Badge variant="outline" className={statusBadge.className}>
                        {statusBadge.label}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {resultBadge && (
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${resultBadge.className}`}>
                          <Icon name={resultBadge.icon as any} size={14} />
                          {resultBadge.label}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Icon name="Eye" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <p className="text-sm text-slate-600">
            Показано <strong>1-5</strong> из <strong>{participants.length}</strong> участников
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ParticipantsView;
