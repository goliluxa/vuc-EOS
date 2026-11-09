import React, { useState, useEffect, useRef } from 'react';
import { Folder, Download, Search, HardDrive, Upload, FolderPlus, Trash2, ArrowUp, ChevronRight } from 'lucide-react';
import { storageService, ApiStorageFolder, ApiStorageFile } from '../../../services/storageService';

import { cadetAuthService } from '../../../services/cadetAuthService';

export const CadetStorageSection: React.FC = () => {
  const currentUser = cadetAuthService.getCurrentUser();
  const isCadet = currentUser?.role === 'cadet';
  const [folders, setFolders] = useState<ApiStorageFolder[]>([]);
  const [files, setFiles] = useState<ApiStorageFile[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [breadcrumbStack, setBreadcrumbStack] = useState<{ id: string; name: string }[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadContent = async (folderId: string | null = currentFolderId) => {
    try {
      const data = await storageService.getContent(folderId);
      setFolders(data.folders);
      setFiles(data.files);
    } catch {}
  };

  useEffect(() => {
    loadContent(currentFolderId);
  }, [currentFolderId]);

  const handleOpenFolder = (folder: ApiStorageFolder) => {
    setCurrentFolderId(folder.id);
    setBreadcrumbStack((prev) => [...prev, { id: folder.id, name: folder.name }]);
  };

  const handleNavigateToBreadcrumb = (index: number) => {
    if (index === -1) {
      setCurrentFolderId(null);
      setBreadcrumbStack([]);
    } else {
      const target = breadcrumbStack[index];
      setCurrentFolderId(target.id);
      setBreadcrumbStack((prev) => prev.slice(0, index + 1));
    }
  };

  const handleNavigateUp = () => {
    if (breadcrumbStack.length === 0) return;
    if (breadcrumbStack.length === 1) {
      handleNavigateToBreadcrumb(-1);
    } else {
      handleNavigateToBreadcrumb(breadcrumbStack.length - 2);
    }
  };
  const handleCreateFolder = async () => {
    const name = window.prompt('Введите название новой папки:');
    if (name && name.trim()) {
      await storageService.createFolder(name.trim(), currentFolderId);
      await loadContent(currentFolderId);
      setNotice(`Папка «${name.trim()}» создана.`);
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleFileUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNotice(`Загрузка файла «${file.name}»...`);
    const uploaded = await storageService.uploadFile(file, currentFolderId);
    if (uploaded) {
      await loadContent(currentFolderId);
      setNotice(`Файл «${file.name}» сохранен в облако.`);
    } else {
      setNotice('Файл сохранен.');
    }
    setTimeout(() => setNotice(null), 3000);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteFile = async (id: string, name: string) => {
    if (window.confirm(`Удалить файл «${name}»?`)) {
      await storageService.deleteFile(id);
      await loadContent(currentFolderId);
      setNotice(`«${name}» удален.`);
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleDeleteFolder = async (id: string, name: string) => {
    if (window.confirm(`Удалить папку «${name}»?`)) {
      await storageService.deleteFolder(id);
      await loadContent(currentFolderId);
      setNotice(`Папка «${name}» удалена.`);
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const filteredFolders = folders.filter((f) =>
    search ? f.name.toLowerCase().includes(search.toLowerCase()) : true
  );
  const filteredFiles = files.filter((f) => {
    const matchesSearch = search ? f.original_name.toLowerCase().includes(search.toLowerCase()) : true;
    if (!matchesSearch) return false;
    if (filterType === 'all') return true;
    if (filterType === 'pdf') return f.extension === 'PDF';
    if (filterType === 'docs') return ['DOCX', 'DOC', 'TXT'].includes(f.extension);
    if (filterType === 'media') return ['PPTX', 'PPT', 'PNG', 'JPG'].includes(f.extension);
    return true;
  });

  return (
    <div className="space-y-4 animate-fade-in pb-12">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileUploadChange}
      />
      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center justify-between">
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

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Все файлы' },
            { id: 'pdf', label: 'PDF' },
            { id: 'docs', label: 'Документы' },
            { id: 'media', label: 'Презентации' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                filterType === tab.id
                  ? 'bg-military-blue text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {!isCadet && (
            <button
              type="button"
              onClick={handleCreateFolder}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
            >
              <FolderPlus className="w-4 h-4 text-amber-600" />
              <span>Создать папку</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-military-blue hover:bg-navy-deep rounded-lg transition-colors shadow-2xs"
          >
            <Upload className="w-4 h-4" />
            <span>Загрузить файл</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div className="flex items-center gap-1.5 font-medium flex-wrap">
          {breadcrumbStack.length > 0 && (
            <button
              type="button"
              onClick={handleNavigateUp}
              className="p-1 rounded hover:bg-slate-200/70 text-slate-600 transition-colors mr-1 cursor-pointer"
              title="На уровень вверх"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}
          <HardDrive className="w-4 h-4 text-slate-400" />
          <button
            type="button"
            onClick={() => handleNavigateToBreadcrumb(-1)}
            className={`hover:text-military-blue hover:underline cursor-pointer ${breadcrumbStack.length === 0 ? 'text-navy-deep font-bold' : ''}`}
          >
            Хранилище (Корень)
          </button>
          {breadcrumbStack.map((crumb, idx) => {
            const isLast = idx === breadcrumbStack.length - 1;
            return (
              <React.Fragment key={crumb.id}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                {isLast ? (
                  <span className="text-navy-deep font-bold">{crumb.name}</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavigateToBreadcrumb(idx)}
                    className="hover:text-military-blue hover:underline cursor-pointer"
                  >
                    {crumb.name}
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <span className="text-[11px] text-slate-400">
          Папок: {filteredFolders.length} • Файлов: {filteredFiles.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredFolders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => handleOpenFolder(folder)}
            className="p-4 rounded-xl border bg-amber-50/40 hover:bg-amber-50 border-amber-200/60 hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Folder className="w-5 h-5 fill-amber-600 text-amber-600" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-navy-deep truncate" title={folder.name}>
                  {folder.name}
                </h4>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Папка каталога
                </span>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-amber-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px] uppercase font-mono">Папка</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFolder(folder.id, folder.name);
                }}
                className="p-1 hover:text-military-red rounded"
                title="Удалить папку"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="p-4 rounded-xl border bg-white hover:bg-slate-50 border-surface-border hover:border-slate-300 shadow-2xs transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-military-blue flex items-center justify-center shrink-0 font-bold text-xs font-mono uppercase">
                {file.extension || 'FILE'}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-navy-deep truncate" title={file.original_name}>
                  {file.original_name}
                </h4>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {(file.file_size / (1024 * 1024)).toFixed(1)} МБ
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px] uppercase font-mono">{file.extension}</span>
              <div className="flex items-center gap-1">
                <a
                  href={storageService.getDownloadUrl(file.id)}
                  download={file.original_name}
                  className="p-1 text-slate-400 hover:text-military-blue rounded"
                  title="Скачать файл"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => handleDeleteFile(file.id, file.original_name)}
                  className="p-1 text-slate-400 hover:text-military-red rounded"
                  title="Удалить"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
