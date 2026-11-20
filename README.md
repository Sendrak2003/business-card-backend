# business-card-backend

NestJS GraphQL-бэкенд для цифровой визитки: один профиль со списком навыков, опытом работы и проектами, отданный через GraphQL API с Apollo Sandbox.

## Архитектура и почему так

Слои разделены по направлению зависимостей внутрь (domain ничего не знает о фреймворках и БД):

- `src/domain` — чистые TypeScript-интерфейсы (`Profile`, `Link`, `Skill`, `Experience`, `Project`). Никаких зависимостей от NestJS, Prisma или GraphQL — это модель предметной области сама по себе.
- `src/application` — use case (`GetProfileUseCase`) и порт репозитория (`ProfileRepositoryPort` — абстрактный класс, через который слой зависит от *интерфейса*, а не от конкретной реализации на Prisma).
- `src/infrastructure` — `ProfilePrismaRepository`, единственное место, где знают о Prisma, и `PrismaService` для подключения к БД.
- `src/presentation` — GraphQL-модели (`@ObjectType`) и резолвер, который дергает use case и ничего не знает о базе данных.

Такое разделение позволяет, например, заменить Prisma на другой ORM или добавить REST-контроллер поверх того же `GetProfileUseCase`, не трогая бизнес-логику.

### Почему один `findFirst` с `include`, а не вложенные резолверы

У профиля ровно одна запись, и GraphQL-схема не предполагает полей, которые можно запрашивать для разных профилей по отдельности (`skills`, `experience`, `projects` — не самостоятельные top-level типы со своими полями-резолверами). Поэтому вместо `@ResolveField` с отдельными запросами на каждое вложенное поле (что и дало бы классический N+1) `ProfilePrismaRepository.findProfile()` делает один запрос:

```ts
prisma.profile.findFirst({ include: { links, skills, experience, projects } })
```

и маппит результат в доменную модель. На один GraphQL-запрос — один SQL-запрос с JOIN'ами от Prisma, независимо от того, сколько навыков или проектов в профиле.

### Инициализация и заполнение БД

`Dockerfile` запускает контейнер приложения командой `npm run db:migrate && npm run db:seed && npm run start:prod` — при каждом старте схема накатывается (`prisma migrate deploy`), а `prisma/seed.ts` заполняет профиль данными, если он ещё не создан (идемпотентная проверка `findFirst()` в начале сидера). Это значит, что `docker compose up` на чистой машине поднимает полностью рабочее приложение без ручных шагов.

### Apollo Sandbox

`ApolloServerPluginLandingPageLocalDefault({ embed: true })` подключен безусловно (а `introspection: true` всегда включён), потому что большинство хостингов (Render/Railway) сами выставляют `NODE_ENV=production`, при котором Apollo по умолчанию отключает Sandbox. Здесь он форсирован, чтобы страница `/graphql` открывалась одинаково и локально, и в проде.

## Технологии

TypeScript, Node.js, NestJS, GraphQL (Apollo), Prisma, PostgreSQL, Docker.

## Запуск локально

```bash
docker compose up -d postgres
npm install
npm run db:migrate
npm run db:seed
npm run start:dev
```

GraphQL endpoint: `http://localhost:3000/graphql`

## Запуск полностью в Docker

```bash
docker compose up --build
```

Поднимает Postgres и приложение; база мигрирует и заполняется автоматически при старте контейнера `app`.

## Пример запроса

```graphql
query {
  profile {
    name
    description
    skills {
      name
    }
    experience {
      company
      position
    }
    projects {
      name
    }
  }
}
```
