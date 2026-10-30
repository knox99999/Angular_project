# Architecture

Angular 21 standalone UI -> versioned Express 4 REST API -> MongoDB via Mongoose. An optional Gemini endpoint is only enabled when an API key is explicitly configured. FAQ fallback remains available with no provider.

## Trust boundaries

- Browser stores the auth token only as an HTTP-only SameSite cookie; Express verifies JWT and applies user ID filters on private queries.
- Passwords are bcrypt-hashed. API payloads are limited to 32 KB, and auth/assistant endpoints are rate limited.
- Medicine and dose documents carry user references. Occurrence uniqueness is per user and scheduled instance.
- Database can be local MongoDB Community or externally hosted MongoDB Atlas Free. No AWS resources are provisioned.

## Known architectural gaps

Cookie auth is not yet paired with a synchronizer CSRF token. Cross-site deployment, refresh/revocation, IANA time-zone/DST scheduling, worker-based reminders, formal logging/audit retention, and comprehensive test coverage require further engineering before any real medical or production use. Schedule generation currently uses the Node process local timezone.
