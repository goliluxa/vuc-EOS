import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Search, ArrowLeft, Download, FileText, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { libraryService } from '../../services/libraryService';
import { LibraryBook } from '../../types/cadet';

export const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const books = libraryService.getBooks();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [feedback, setFeedback] = useState<string | null>(null);

  const categories = ['Все', 'Уставы', 'Тактика', 'Огневая подготовка', 'Связь', 'Общевоенная'];

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Все' || b.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleReadOrDownload = (book: LibraryBook) => {
    setFeedback(`Издание «${book.title}» (${book.year} г., ${book.pages} стр.) готово к просмотру.`);
    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-surface-bg text-content-primary">
      <BackgroundPattern showStar={false} />

      {/* Top Header */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-surface-border sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" asLink={false} />
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-military-blue text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Электронная библиотека</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-content-secondary hover:text-navy-deep px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Назад</span>
            </button>
            <Link
              to="/portal"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-white bg-military-blue hover:bg-navy-brand px-3 py-1.5 rounded-md transition-colors"
            >
              <span>В портал</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-navy-deep tracking-tight mb-2">
            Электронный фонд литературы ВУЦ
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary">
            Уставы ВС РФ, наставления по стрелковому делу, учебные пособия и справочники для подготовки курсантов
          </p>
        </div>

        {feedback && (
          <div
            role="status"
            className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs sm:text-sm flex items-center justify-between gap-2 animate-fade-in"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedback}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold"
            >
              Закрыть
            </button>
          </div>
        )}

        {/* Search & Categories */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-content-secondary/60" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию издания, автору или дисциплине..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-content-primary bg-white border border-surface-border rounded-md placeholder:text-content-secondary/50 focus:border-military-blue focus:ring-1 focus:ring-military-blue outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-military-blue text-white border-military-blue'
                    : 'bg-white text-content-secondary border-surface-border hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-surface-border rounded-lg p-5 shadow-xs hover:shadow-card hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-military-red">
                    {book.category}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-50 text-military-red border border-red-200">
                    {book.format}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-navy-deep line-clamp-2 mb-1.5">
                  {book.title}
                </h3>
                <p className="text-xs text-content-secondary font-medium mb-3">
                  {book.author} • {book.year} г. • {book.pages} стр.
                </p>
                <p className="text-xs text-content-secondary leading-relaxed line-clamp-3 mb-5">
                  {book.description}
                </p>
              </div>

              <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleReadOrDownload(book)}
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-military-blue hover:bg-navy-brand rounded transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Читать онлайн</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleReadOrDownload(book)}
                  className="p-2 text-content-secondary hover:text-navy-deep border border-surface-border rounded hover:bg-slate-50 transition-colors shrink-0"
                  title="Скачать PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-content-secondary border-t border-surface-border bg-white/50">
        Электронная библиотека Военного учебного центра ЧувГУ
      </footer>
    </div>
  );
};
