import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

const CallsView = () => {
  const [isAutoCallEnabled, setIsAutoCallEnabled] = useState(true);
  const [callVolume, setCallVolume] = useState([75]);
  const [callSpeed, setCallSpeed] = useState([50]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Управление звонками</h2>
          <p className="text-slate-500">Настройка автоматического обзвона участников</p>
        </div>
        <Button size="lg" className="gap-2">
          <Icon name="Play" size={20} />
          Начать обзвон
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Настройки озвучки</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-primary rounded-lg p-2">
                  <Icon name="Volume2" size={20} className="text-white" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Автоматический обзвон</Label>
                  <p className="text-xs text-slate-500">Включить автоматические звонки</p>
                </div>
              </div>
              <Switch
                checked={isAutoCallEnabled}
                onCheckedChange={setIsAutoCallEnabled}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Громкость озвучки</Label>
                <span className="text-sm font-semibold text-primary">{callVolume[0]}%</span>
              </div>
              <Slider
                value={callVolume}
                onValueChange={setCallVolume}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Скорость речи</Label>
                <span className="text-sm font-semibold text-primary">{callSpeed[0]}%</span>
              </div>
              <Slider
                value={callSpeed}
                onValueChange={setCallSpeed}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Текст озвучки</Label>
              <Textarea
                placeholder="Здравствуйте! Это звонок от компании..."
                className="min-h-[120px] resize-none"
                defaultValue="Здравствуйте, {имя}! Вы участвуете в розыгрыше от нашей компании. Для подтверждения участия нажмите 1."
              />
              <p className="text-xs text-slate-500">
                Используйте переменные: {'{имя}'}, {'{телефон}'}, {'{город}'}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1">
                <Icon name="Volume2" size={16} className="mr-2" />
                Прослушать
              </Button>
              <Button className="flex-1">
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить настройки
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Расписание</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Понедельник - Пятница</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Icon name="Clock" size={16} className="text-slate-400" />
                <span>09:00 - 18:00</span>
              </div>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Суббота</span>
                <Switch />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Icon name="Clock" size={16} className="text-slate-400" />
                <span>10:00 - 16:00</span>
              </div>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Воскресенье</span>
                <Switch />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Icon name="Clock" size={16} className="text-slate-400" />
                <span>Выходной</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              <Icon name="Settings" size={16} className="mr-2" />
              Настроить расписание
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">История звонков</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={16} className="mr-2" />
              Фильтры
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Иван Петров', phone: '+7 (999) 123-45-67', time: '14:35', duration: '1:24', status: 'success' },
            { name: 'Мария Сидорова', phone: '+7 (999) 234-56-78', time: '14:32', duration: '0:00', status: 'no-answer' },
            { name: 'Алексей Козлов', phone: '+7 (999) 345-67-89', time: '14:28', duration: '2:15', status: 'success' },
            { name: 'Елена Морозова', phone: '+7 (999) 456-78-90', time: '14:25', duration: '1:48', status: 'success' },
            { name: 'Дмитрий Новиков', phone: '+7 (999) 567-89-01', time: '14:20', duration: '0:00', status: 'busy' },
          ].map((call, idx) => {
            const statusConfig: Record<string, { icon: string; color: string; label: string }> = {
              success: { icon: 'CheckCircle2', color: 'text-green-600', label: 'Успешно' },
              'no-answer': { icon: 'XCircle', color: 'text-red-600', label: 'Не ответил' },
              busy: { icon: 'PhoneOff', color: 'text-orange-600', label: 'Занято' },
            };
            const status = statusConfig[call.status];

            return (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`${status.color} bg-opacity-10 rounded-lg p-2`}>
                    <Icon name={status.icon as any} size={20} className={status.color} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{call.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500">{call.phone}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{call.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={status.color}>
                      {status.label}
                    </Badge>
                    <p className="text-xs text-slate-500 mt-1">{call.duration}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="ml-4">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default CallsView;
