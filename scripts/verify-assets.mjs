/**
 * Скрипт автоматической валидации статических ресурсов Frontend (ИОС ВУЦ)
 * Защита от:
 * 1. Отсутствующих обязательных изображений и иконок.
 * 2. Несовпадения регистра имён файлов (Linux vs macOS case-sensitivity).
 * 3. Локальных путей разработчика (/Users/<user>/...).
 * 4. Неполной или повреждённой production-сборки (dist).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');

const MANDATORY_SOURCE_FILES = [
  'public/favicon.ico',
  'public/favicon.svg',
  'public/favicon.png',
  'public/images/vuc-emblem.png',
  'public/images/vuc-building.jpg',
  'src/assets/images/vuc-emblem.png',
  'src/assets/images/vuc-building.jpg',
  'src/assets/icons/favicon.ico',
  'src/assets/icons/favicon.svg',
];

const MANDATORY_DIST_FILES = [
  'dist/index.html',
  'dist/favicon.ico',
  'dist/favicon.svg',
  'dist/favicon.png',
];

const errors = [];

function logError(msg) {
  errors.push(msg);
  console.error(`❌ [ASSET ERROR] ${msg}`);
}

function logSuccess(msg) {
  console.log(`✅ [ASSET OK] ${msg}`);
}

// 1. Проверка обязательных исходных файлов
function verifyMandatorySourceFiles() {
  console.log('--- 1. Проверка обязательных статических файлов ---');
  for (const relPath of MANDATORY_SOURCE_FILES) {
    const fullPath = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(fullPath)) {
      logError(`Отсутствует обязательный статический файл: ${relPath}`);
      continue;
    }
    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      logError(`Статический файл пуст (0 байт): ${relPath}`);
      continue;
    }
    logSuccess(`${relPath} (${stat.size} байт)`);
  }
}

// 2. Проверка точного регистра файлов на диске (эмуляция Linux case-sensitivity)
function checkExactCaseExists(targetPath) {
  const normalized = path.normalize(targetPath);
  const segments = normalized.split(path.sep).filter(Boolean);

  let current = path.isAbsolute(normalized) ? path.sep : '';
  for (const segment of segments) {
    const nextPath = path.join(current, segment);
    if (!fs.existsSync(nextPath)) {
      return false;
    }
    try {
      const entries = fs.readdirSync(current);
      if (!entries.includes(segment)) {
        return false;
      }
    } catch {
      return false;
    }
    current = nextPath;
  }
  return true;
}

// 3. Сканирование исходного кода на импорты и пути
function verifySourceCodeImports() {
  console.log('--- 2. Проверка импортов и чувствительности к регистру (Case Sensitivity) ---');
  const importRegex = /(?:import|export)\s+(?:.*?from\s+)?['"](\.[^'"]+)['"]/g;
  const localDevPathRegex = /(?:\/Users\/[a-zA-Z0-9_-]+\/|\/home\/[a-zA-Z0-9_-]+\/|[a-zA-Z]:\\|file:\/\/)/;

  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    if (localDevPathRegex.test(content)) {
      logError(`Обнаружен локальный путь разработчика в файле: ${filePath}`);
    }

    let match;
    const fileDir = path.dirname(filePath);
    while ((match = importRegex.exec(content)) !== null) {
      const relImport = match[1];
      const resolvedBase = path.resolve(fileDir, relImport);

      const candidates = [
        resolvedBase,
        resolvedBase + '.ts',
        resolvedBase + '.tsx',
        resolvedBase + '.d.ts',
        resolvedBase + '.png',
        resolvedBase + '.svg',
        resolvedBase + '.jpg',
        resolvedBase + '.jpeg',
        resolvedBase + '.ico',
        resolvedBase + '.css',
        path.join(resolvedBase, 'index.ts'),
        path.join(resolvedBase, 'index.tsx'),
      ];

      let resolvedFile = null;
      for (const cand of candidates) {
        if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
          resolvedFile = cand;
          break;
        }
      }

      if (!resolvedFile) {
        logError(`Не удалось разрешить импорт "${relImport}" в ${filePath}`);
        continue;
      }

      if (!checkExactCaseExists(resolvedFile)) {
        logError(
          `Несовпадение регистра (case-sensitive) для импорта "${relImport}" в ${filePath} (найден: ${resolvedFile})`
        );
      }
    }
  }

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) {
        continue;
      }
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(tsx?|css|html)$/.test(entry.name)) {
        scanFile(fullPath);
      }
    }
  }

  scanDir(SRC_DIR);
  if (fs.existsSync(INDEX_HTML)) {
    scanFile(INDEX_HTML);
  }
  logSuccess('Все импорты кода и ассетов проверены и точно совпадают по регистру на диске.');
}

// 4. Проверка содержимого production-сборки (dist)
function verifyDistOutput() {
  console.log('--- 3. Проверка собранного каталога dist (Production Output) ---');
  if (!fs.existsSync(DIST_DIR)) {
    logError('Каталог dist отсутствует. Выполните npm run build перед проверкой --dist');
    return;
  }

  for (const relPath of MANDATORY_DIST_FILES) {
    const fullPath = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(fullPath)) {
      logError(`В dist отсутствует обязательный файл: ${relPath}`);
      continue;
    }
    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      logError(`Файл в dist пуст: ${relPath}`);
      continue;
    }
    logSuccess(`${relPath} (${stat.size} байт)`);
  }

  const assetsDir = path.join(DIST_DIR, 'assets');
  if (!fs.existsSync(assetsDir)) {
    logError('Каталог dist/assets отсутствует!');
    return;
  }

  const assetFiles = fs.readdirSync(assetsDir);
  const hasJs = assetFiles.some((f) => f.endsWith('.js'));
  const hasCss = assetFiles.some((f) => f.endsWith('.css'));

  if (!hasJs) logError('В dist/assets отсутствуют JS бандлы!');
  if (!hasCss) logError('В dist/assets отсутствуют CSS файлы стилей!');

  if (hasJs && hasCss) {
    logSuccess(`dist/assets содержит ${assetFiles.length} файлов (JS, CSS, ассеты).`);
  }
}

console.log('=== Запуск аудита статических ресурсов ИОС ВУЦ ===');
verifyMandatorySourceFiles();
verifySourceCodeImports();

if (process.argv.includes('--dist')) {
  verifyDistOutput();
}

console.log('==================================================');
if (errors.length > 0) {
  console.error(`🚨 Найдено ошибок: ${errors.length}. Проверка не пройдена.`);
  process.exit(1);
} else {
  console.log('🎉 Аудит статических ресурсов успешно пройден без ошибок!');
  process.exit(0);
}
