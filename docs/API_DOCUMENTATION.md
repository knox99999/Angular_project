# API documentation

Base path: `/api/v1`; JSON errors use `{ "error": "..." }`. Private endpoints require the HTTP-only `meditrack` cookie. OpenAPI source: `server/src/openapi.ts`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/health`, `/ready` | Liveness and MongoDB readiness |
| POST | `/auth/register`, `/auth/login`, `/auth/logout` | Account/session |
| GET | `/auth/me` | Current account |
| PATCH / DELETE | `/profile` | Update profile / delete personal data |
| GET / POST | `/medicines` | List/create medicines |
| PATCH / DELETE | `/medicines/:id` | Update/discontinue owned medicine |
| GET | `/schedule?from=ISO&to=ISO` | Generate/read due occurrences |
| PATCH | `/doses/:id` | Mark `taken` or `skipped` |
| GET | `/history?from=&to=&medicine=&status=` | History and adherence |
| GET | `/dashboard` | Active count and today's doses |
| POST | `/assistant` | FAQ fallback or optional AI answer |

Registration requires `name`, `email`, and password length 10–128. Medicine create expects `name`, `doseQuantity`, `frequency` (`once_daily`, `twice_daily`, `custom`), `times` in 24-hour `HH:mm`, `startDate`, optional `endDate` / `durationDays`. Current API update validation is not yet as strict as create validation. Do not expose this API publicly before completing validation and CSRF review.
