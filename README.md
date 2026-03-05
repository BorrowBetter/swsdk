# @borrowbetter/swsdk

TypeScript SDK for the [Spinwheel](https://spinwheel.io) credit data and debt profile API. Provides type-safe access to user connection, debt profile fetching, and hydrated user data.

## Installation

```bash
npm install @borrowbetter/swsdk
```

## Requirements

- Node.js >= 18
- Spinwheel API key (provided by your Spinwheel account manager)

## Quick Start

```typescript
import { SpinwheelSDK } from "@borrowbetter/swsdk";

const spinwheel = new SpinwheelSDK({
  apiKey: process.env.SPINWHEEL_API_KEY,
  sandbox: process.env.NODE_ENV !== "production",
});
```

## API

### Connect

Connect a user to Spinwheel via preverified phone or network token.

```typescript
// Preverified phone (requires Spinwheel support approval)
const result = await spinwheel.connect.preverifiedPhone({
  phoneNumber: "+14155552671",
  dateOfBirth: "1990-01-15",
  extUserId: "your-internal-user-id",
  audit: {
    verificationDate: "2025-01-01",
    userConsentDate: "2025-01-01",
    verificationType: "SMS",
  },
});

const { userId } = result.data;

// Network token
const result = await spinwheel.connect.networkToken({
  extUserId: "your-internal-user-id",
  networkToken: "token-from-verification",
  ssnLastFourDigits: "1234",
  dateOfBirth: "1990-01-15",
  audit: { userConsentDate: "2025-01-01" },
});
```

### Debt Profile

Trigger an asynchronous credit pull. Results are retrieved via `userManagement.get()` once processing completes.

```typescript
await spinwheel.debtProfile.fetch(userId, {
  creditReport: {
    sourceBureau: "TransUnion",
    type: "1_BUREAU.FULL",
  },
  creditScore: {
    sourceBureau: "TransUnion",
    model: "VANTAGE_SCORE_3_0",
  },
});
```

> Note: Your implementation must display the Spinwheel End User Agreement before calling this method.

### User Management

Retrieve a user's full hydrated profile including all liabilities and credit reports. Always uses the secure endpoint with unmasked account number and SSN.

```typescript
// By Spinwheel user ID
const { data } = await spinwheel.userManagement.get({ userId });

// By your external user ID
const { data } = await spinwheel.userManagement.get({ extUserId: "your-id" });

// Available on the hydrated user
data.profile?.creditScore;
data.creditCardSummary;
data.personalLoanSummary;
data.autoLoanSummary;
data.homeLoanSummary;
data.studentLoanSummary;
data.creditReports;
data.creditCards;
data.personalLoans;
data.autoLoans;
data.homeLoans;
data.studentLoans;
data.miscellaneousLiabilities;
```

## Configuration

```typescript
new SpinwheelSDK({
  apiKey: string;    // Required — your Spinwheel API key
  sandbox?: boolean; // Optional — defaults to false (production)
});
```

## Response Shape

All methods return Spinwheel's standard response envelope:

```typescript
interface SpinwheelResponse<T> {
  status: {
    code: number;
    desc: string;
    messages?: Array<{ desc: string; type?: "ERROR" | "WARN" | "INFO" }>;
  };
  data: T;
}
```

```typescript
const result = await spinwheel.connect.preverifiedPhone({ ... });

if (result.status.code >= 400) {
  console.error(result.status.messages);
  return;
}

const { userId } = result.data;
```

## Type Exports

All types are exported directly from the package:

```typescript
import type {
  SpinwheelConfig,
  HydratedUserData,
  UserData,
  CreditReport,
  CreditCard,
  PersonalLoan,
  AutoLoan,
  HomeLoan,
  StudentLoan,
  LiabilityType,
  CreditBureau,
  // ...and more
} from "@borrowbetter/swsdk";
```

## Development

```bash
npm install
npm run dev        # tsup watch mode
npm run build      # compile to dist/
npm run typecheck  # TypeScript check
npm run lint       # Biome lint
npm run format     # Biome format + auto-fix
npm run smoke      # Run smoke test against sandbox
```

### Smoke Test

```bash
cp .env.example .env.local
# Add SPINWHEEL_API_KEY to .env.local
npm run smoke
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile to `dist/` |
| `npm run dev` | Watch mode |
| `npm run smoke` | End-to-end test against sandbox |
| `npm run lint` | Biome lint check |
| `npm run format` | Biome format + auto-fix |
| `npm run typecheck` | TypeScript type check |
