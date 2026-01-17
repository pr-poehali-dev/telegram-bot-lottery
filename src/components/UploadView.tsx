import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Alert, AlertDescription } from '@/components/ui/alert';

const UploadView = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const sampleData = [
    { id: 1, name: 'Иван Петров', phone: '+7 (999) 123-45-67', email: 'ivan@example.com', city: 'Москва', status: 'Новый' },
    { id: 2, name: 'Мария Сидорова', phone: '+7 (999) 234-56-78', email: 'maria@example.com', city: 'Санкт-Петербург', status: 'Новый' },
    { id: 3, name: 'Алексей Козлов', phone: '+7 (999) 345-67-89', email: 'alex@example.com', city: 'Казань', status: 'Новый' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0].name);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Загрузка участников</h2>
        <p className="text-slate-500">Импортируйте список участников из Excel или CSV файла</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Загрузить файл</h3>
          
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-primary bg-blue-50 scale-[1.02]' 
                : 'border-slate-300 hover:border-primary hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary/10 rounded-full p-4">
                <Icon name="Upload" size={32} className="text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-900">
                  Перетащите файл сюда или нажмите для выбора
                </p>
                <p className="text-xs text-slate-500">
                  Поддерживаются форматы: .xlsx, .xls, .csv
                </p>
              </div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
              />
              <Button asChild variant="outline" className="mt-2">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Icon name="FolderOpen" size={16} className="mr-2" />
                  Выбрать файл
                </label>
              </Button>
            </div>
          </div>

          {uploadedFile && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <Icon name="CheckCircle2" className="text-green-600" size={18} />
              <AlertDescription className="text-green-800">
                Файл загружен: <strong>{uploadedFile}</strong>
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Icon name="Info" size={16} className="text-blue-500" />
              <span>Первая строка должна содержать заголовки столбцов</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Icon name="Info" size={16} className="text-blue-500" />
              <span>Обязательные поля: Имя, Телефон</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Формат данных</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Требуемые столбцы:</p>
              <div className="space-y-2">
                {['Имя', 'Телефон', 'Email (опционально)', 'Город (опционально)', 'Дата регистрации (опционально)'].map((field, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={14} className="text-green-600" />
                    <span className="text-slate-600">{field}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium text-slate-700 mb-3">Пример форматирования:</p>
              <div className="bg-slate-50 rounded-lg p-3 text-xs font-mono overflow-x-auto">
                <div className="whitespace-nowrap">
                  <div className="text-slate-500 mb-1">Имя | Телефон | Email | Город</div>
                  <div className="text-slate-700">Иван Петров | +79991234567 | ivan@mail.ru | Москва</div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              <Icon name="Download" size={16} className="mr-2" />
              Скачать шаблон
            </Button>
          </div>
        </Card>
      </div>

      {uploadedFile && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Предпросмотр данных</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="X" size={16} className="mr-2" />
                Отменить
              </Button>
              <Button size="sm">
                <Icon name="Check" size={16} className="mr-2" />
                Импортировать ({sampleData.length})
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-600 p-3 rounded-tl-lg">#</th>
                  <th className="text-left text-xs font-semibold text-slate-600 p-3">Имя</th>
                  <th className="text-left text-xs font-semibold text-slate-600 p-3">Телефон</th>
                  <th className="text-left text-xs font-semibold text-slate-600 p-3">Email</th>
                  <th className="text-left text-xs font-semibold text-slate-600 p-3">Город</th>
                  <th className="text-left text-xs font-semibold text-slate-600 p-3 rounded-tr-lg">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sampleData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 text-sm text-slate-500">{row.id}</td>
                    <td className="p-3 text-sm font-medium text-slate-900">{row.name}</td>
                    <td className="p-3 text-sm text-slate-600">{row.phone}</td>
                    <td className="p-3 text-sm text-slate-600">{row.email}</td>
                    <td className="p-3 text-sm text-slate-600">{row.city}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UploadView;
