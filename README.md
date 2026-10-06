# kvet.io

Лендинг Kvetio — новый дизайн, перенесённый из Figma (фрейм **«New site»**, 1259 px).

- Next.js 16 (App Router) + React 19 + TypeScript
- CSS Modules + дизайн-токены (`styles/tokens.css`), без UI-библиотек
- Шрифты `Inter` и `JetBrains Mono` через `next/font`
- ESLint + Prettier + Husky + lint-staged, тесты на Vitest

Предыдущая версия сайта (Pages Router + Chakra UI) осталась в ветке `main`.

## Запуск

```bash
npm install
npm run dev      # http://localhost:4000
```

Если `npm install` падает на `Cannot read properties of null (reading 'edgesOut')` — это баг npm 10 при резолве зависимостей без lock-файла. Используйте npm 11 (`npx npm@11 install`); с готовым `package-lock.json` проблемы нет.

## Скрипты

| Команда            | Что делает                     |
| ------------------ | ------------------------------ |
| `npm run dev`      | разработка                     |
| `npm run build`    | production-сборка              |
| `npm run start`    | запуск собранного сайта        |
| `npm run lint`     | ESLint                         |
| `npm run tc`       | проверка типов                 |
| `npm run test`     | Vitest                         |
| `npm run format`   | Prettier                       |
| `npm run validate` | `tc` + `lint` + `format:check` |

## Структура

```
app/                      маршруты, layout, metadata, robots, sitemap, favicon
  layout.tsx              шрифты, <html>, метаданные, аналитика
  page.tsx                страница: секции по порядку из макета
  v2/                     альтернативный дизайн по адресу /v2 (отдельный layout и страница)
  globals.css             reset + подключение токенов
components/
  sections/               по одной папке на секцию макета (tsx + module.css)
    hero/                 Hero («Oddly specific training data»)
    statements/           три карточки: Proprietary capture / Any format / Rights-ready
    data-types/           «Data types»
    team/                 «Production-first data team»
    mission/              баннер «Too specific to find…»
    accuracy/             «Data for Final AI Accuracy» + график
    linkedin/             «Connect with us on LinkedIn»
    footer/
  ui/                     LogoMark, BrandTile, Photo
  v2/                     экран альтернативного дизайна (SplitHero)
  analytics/              Microsoft Clarity (по env-переменной)
lib/
  content.ts              весь текст сайта (как в макете)
  site.ts                 URL, контакты, соцсети, SEO
styles/tokens.css         цвета, тени, радиусы, шрифты, трекинг — из Figma
public/images/            фото секций (см. «Ассеты»)
__tests__/                тесты контента и разметки
docs/figma-mapping.md     соответствие узлов Figma → компонентам
```

## Страницы

- `/` — основной дизайн (Figma «New site v1»)
- `/v2` — альтернативный дизайн (Figma «New site v2»), закрыт от индексации

## Переменные окружения

См. `.env.example`.

- `NEXT_PUBLIC_SITE_URL` — канонический URL (по умолчанию `https://kvet.io`)
- `NEXT_PUBLIC_CLARITY_ID` — id Microsoft Clarity; без него скрипт не подключается

## Ассеты

- `statement-field.webp`, `statement-sunflowers.webp`, `team-daisy.webp` — оригинальные фото. Эффекты слоёв из Figma
  (multiply, saturation, opacity) воспроизведены в CSS через `components/ui/Photo`, так что файл можно просто заменить.
- `hero-meadow.webp`, `mission-meadow.webp`, `linkedin-banner.webp`, `avatar-dzmitry.webp` — оригиналов нет,
  поэтому это **рендеры слоёв из Figma** (эффекты уже «запечены» в файл); в CSS остались только градиенты поверх фото.

Подробности и список узлов — в `docs/figma-mapping.md`.

## Адаптив

Макет нарисован только для десктопа (1259 px). На ширине 1259 px вёрстка совпадает с макетом;
для планшета (< 1024 px) и телефона (< 720 px) секции перестраиваются в одну колонку, размеры
заголовков масштабируются. На экранах шире 1280 px контент центрируется, фоны остаются на всю ширину.
