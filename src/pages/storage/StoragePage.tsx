import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, Download, Search, HardDrive, LogOut, Upload, FolderPlus, User, Trash2 } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { cadetAuthService } from '../../services/cadetAuthService';

interface StorageItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  updatedAt: string;
  extension?: string;
  parentFolderId?: string | null;
}

const INITIAL_ITEMS: StorageItem[] = [
  { id: 'f-1', name: 'Учебные пособия и уставы', type: 'folder', updatedAt: '02.11.2026', parentFolderId: null },
  { id: 'f-2', name: 'Служебная документация', type: 'folder', updatedAt: '06.11.2026', parentFolderId: null },
  { id: 'f-3', name: 'Приказы и директивы начальника ВУЦ', type: 'folder', updatedAt: '01.11.2026', parentFolderId: null },
  { id: 'f-4', name: 'Бланки рапортов и заявлений', type: 'folder', updatedAt: '15.10.2026', parentFolderId: null },
  { id: 'doc-1', name: 'Боевой_устав_СВ_Часть_3.pdf', type: 'file', size: '14.8 МБ', updatedAt: '03.11.2026', extension: 'PDF', parentFolderId: null },
  { id: 'doc-2', name: 'Строевой_устав_ВС_РФ_2024.pdf', type: 'file', size: '6.2 МБ', updatedAt: '28.10.2026', extension: 'PDF', parentFolderId: null },
  { id: 'doc-3', name: 'Памятка_по_требованиям_безопасности.docx', type: 'file', size: '840 КБ', updatedAt: '05.11.2026', extension: 'DOCX', parentFolderId: null },
  { id: 'doc-4', name: 'Рапорт_на_освобождение_образец.docx', type: 'file', size: '240 КБ', updatedAt: '12.10.2026', extension: 'DOCX', parentFolderId: null },
];

export const StoragePage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = cadetAuthService.getCurrentUser();
  const [items, setItems] = useState<StorageItem[]>(INITIAL_ITEMS);
  const [search, setSearch] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleLogout = () => {
    cadetAuthService.logout();
    navigate('/');
  };

  const handleCreateFolder = () => {
    const name = window.prompt('Введите название новой папки:');
    if (name && name.trim()) {
      const newFolder: StorageItem = {
          id: `f-${Date.now()}`,
          name: name.trim(),
          type: 'folder',
          updatedAt: 'Сегодня',
          parentFolderId: currentFolderId,
      };
      setItems((prev) => [newFolder, ...prev]);
      setNotice(`Папка «${name.trim()}» создана.`);
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleUploadFile = () => {
    const name = window.prompt('Имя загружаемого файла (например, Методичка.pdf):', 'Новый_документ.pdf');
    if (name && name.trim()) {
      const ext = name.split('.').pop()?.toUpperCase() || 'FILE';
      const newFile: StorageItem = {
        id: `doc-${Date.now()}`,
        name: name.trim(),
        type: 'file',
        size: '2.4 МБ',
        updatedAt: 'Сегодня',
        extension: ext,
        parentFolderId: currentFolderId,
      };
      setItems((prev) => [newFile, ...prev]);
      setNotice(`Файл «${name.trim()}» сохранен в облако.`);
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`Удалить «${name}»?`)) {
      setItems((prev) => prev.filter((i) => i.id !== id && i.parentFolderId !== id));
      setNotice(`«${name}» удален.`);
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const filteredItems = items.filter((item) =>
    (search ? item.name.toLowerCase().includes(search.toLowerCase()) : item.parentFolderId === currentFolderId)
  );

  const currentFolderObj = items.find((i) => i.id === currentFolderId);

  return (
    <div className="min-h-screen flex flex-col bg-surface-bg text-content-primary">
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-surface-border sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" asLink={false} />
            <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              Облачное хранилище ВУЦ
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/portal"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-navy-deep bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>В навигацию</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-surface-border text-xs">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-military-blue flex items-center justify-center font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-navy-deep truncate max-w-[160px]">
                {currentUser?.fullName || 'Пользователь'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-military-red hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {notice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center justify-between animate-fade-in">
            <span>{notice}</span>
            <button onClick={() => setNotice(null)} className="text-emerald-600 font-bold">✕</button>
          </div>
        )}

        <div className="bg-white border border-surface-border rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск файлов и папок..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-military-blue"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleCreateFolder}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-2xs"
            >
              <FolderPlus className="w-4 h-4 text-amber-600" />
              <span>Создать папку</span>
            </button>

            <button
              type="button"
              onClick={handleUploadFile}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-military-blue hover:bg-navy-deep rounded-lg transition-colors shadow-2xs"
            >
              <Upload className="w-4 h-4" />
              <span>Загрузить файл</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div className="flex items-center gap-1.5 font-medium">
            <HardDrive className="w-4 h-4 text-slate-400" />
            <button
              type="button"
              onClick={() => setCurrentFolderId(null)}
              className="hover:text-military-blue hover:underline"
            >
              Хранилище (Корень)
            </button>
            {currentFolderObj && (
              <>
            <span>/</span>
            <span className="text-navy-deep font-bold">
                  {currentFolderObj.name}
            </span>
              </>
            )}
          </div>
          <span className="text-[11px] text-slate-400">
            Элементов: {filteredItems.length} • Свободно 42.8 ГБ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'folder') {
                  setCurrentFolderId(item.id);
                }
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                item.type === 'folder'
                  ? 'bg-amber-50/40 hover:bg-amber-50 border-amber-200/60 hover:border-amber-300'
                  : 'bg-white hover:bg-slate-50 border-surface-border hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3">
                {item.type === 'folder' ? (
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Folder className="w-5 h-5 fill-amber-600 text-amber-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-military-blue flex items-center justify-center shrink-0 font-bold text-xs font-mono">
                    {item.extension || 'FILE'}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-navy-deep truncate" title={item.name}>
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {item.size ? `${item.size} • ` : ''}{item.updatedAt}
                  </span>
                </div>
              </div>

              {item.type === 'file' && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNotice(`Файл «${item.name}» скачан.`);
                      setTimeout(() => setNotice(null), 3000);
                    }}
                    className="p-1 text-slate-400 hover:text-military-blue rounded"
                    title="Скачать файл"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id, item.name)}
                    className="p-1 text-slate-400 hover:text-military-red rounded"
                    title="Удалить"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
