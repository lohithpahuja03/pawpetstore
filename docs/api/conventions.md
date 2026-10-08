# API Conventions & Standards

## 1. Base URL
All internal API endpoints are accessible via `/api/*`.

## 2. Standard Response Envelope
All API endpoints return JSON conforming to the `ApiResponse<T>` contract:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  timestamp: string;
}
```

## 3. Status Codes
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Input validation failed (Zod schema rejection).
- `401 Unauthorized`: Authentication required or invalid session token.
- `403 Forbidden`: Authenticated user lacks permission (e.g. non-admin accessing admin route).
- `404 Not Found`: Resource does not exist.
- `500 Internal Server Error`: Unhandled server exception.

## 4. Input Validation
All request payloads MUST be validated using Zod schemas located in `backend/validators/`.
Client-side prices are never trusted; price calculation is always performed server-side.
