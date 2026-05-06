# Project8X Platform Data Model (draft)

## Overview

This document defines the core entities for user management, licensing, payments, and compliance. It is intentionally minimal (MVP-first) but extensible.

Important: **Newsletter subscribers are not a product role**. They live in a marketing list table and may or may not correspond to a Customer account.

## Core entities

### User (authentication identity)

- `id` (UUID, PK)
- `email` (string, unique, indexed)
- `passwordHash` (string) *(or provider-managed if Cognito/Auth0)*
- `emailVerifiedAt` (timestamp, nullable)
- `status` (enum: ACTIVE, DISABLED, SUSPENDED, LOCKED)
- `createdAt`, `updatedAt`
- `lastLoginAt` (timestamp, nullable)
- `profile` (JSONB: firstName, lastName, company, phone, avatarUrl, preferences)

### Customer (account container)

Customers represent individuals or companies that own entitlements/licenses.

- `id` (UUID, PK)
- `primaryUserId` (FK → User)
- `displayName` (string)
- `createdAt`, `updatedAt`

### Employee

- `id` (UUID, PK)
- `userId` (FK → User, unique)
- `department` (string, nullable)
- `employeeId` (string, nullable)
- `createdAt`, `updatedAt`

### Roles / permissions (RBAC)

Prefer permissions over multiplying “roles.”

- `Role` (`id`, `name`)
- `Permission` (`id`, `slug`)
- `UserRole` (`userId`, `roleId`)
- `RolePermission` (`roleId`, `permissionId`)

### NewsletterSubscriber (marketing list)

- `id` (UUID, PK)
- `email` (string, unique, indexed)
- `consentedAt` (timestamp)
- `consentSource` (string: e.g., "footer", "registration", "contact-form")
- `privacyNoticeVersion` (string)
- `unsubscribedAt` (timestamp, nullable)
- `preferences` (JSONB: topics array, frequency, etc.)

### Entitlement

Entitlements are the “rights” granted by payment (or manual issuance).

- `id` (UUID, PK)
- `customerId` (FK → Customer)
- `sku` (string, indexed; e.g., `P8X-CCT-ENTERPRISE`)
- `status` (enum: ACTIVE, EXPIRED, REVOKED, PENDING)
- `startsAt` (timestamp)
- `endsAt` (timestamp, nullable)
- `maxDevices` (integer)
- `metadata` (JSONB: feature flags, limits)
- `createdAt`, `updatedAt`

### LicenseKey

Store **hashed** license keys; never log or persist raw values beyond issuance/display.

- `id` (UUID, PK)
- `entitlementId` (FK → Entitlement)
- `licenseKeyHash` (string, indexed)
- `displayKeyLast4` (string)
- `status` (enum: ACTIVE, REVOKED, EXPIRED)
- `createdAt`, `updatedAt`

### LicenseActivation (device activation)

- `id` (UUID, PK)
- `licenseKeyId` (FK → LicenseKey)
- `deviceId` (string, indexed; opaque stable per device/instance)
- `activatedAt` (timestamp)
- `revokedAt` (timestamp, nullable)
- `lastValidatedAt` (timestamp, nullable)
- `ipAddress` (string, nullable)
- `appVersion` (string, nullable)
- `metadata` (JSONB, nullable)

### PaymentRecord

Holds the billing facts + idempotency keys for webhook processing.

- `id` (UUID, PK)
- `customerId` (FK → Customer)
- `provider` (enum: PAYPAL)
- `paypalOrderId` (string, nullable)
- `paypalSubscriptionId` (string, nullable)
- `amount` (integer or decimal)
- `currency` (string)
- `status` (string/enum)
- `webhookEventId` (string, unique) *(for idempotency)*
- `linkedEntitlementId` (FK → Entitlement, nullable)
- `createdAt`, `updatedAt`

### AuditLog (append-only)

- `id` (UUID, PK)
- `actorUserId` (FK → User, nullable)
- `action` (string, e.g., `LOGIN`, `LICENSE_ACTIVATE`, `PROFILE_UPDATE`)
- `resourceType` (string)
- `resourceId` (string)
- `details` (JSONB)
- `ipAddress` (string, nullable)
- `createdAt` (timestamp)

## Relationships (MVP)

- One **User** → zero/one **Customer** association (via `Customer.primaryUserId`) and/or one **Employee**
- One **Customer** → many **Entitlements**
- One **Entitlement** → many **LicenseKeys**
- One **LicenseKey** → many **LicenseActivations**
- One **Customer** → many **PaymentRecords**
- Sensitive actions → **AuditLog**

## Key design constraints

- UUID primary keys across the board
- Timestamps in UTC
- Avoid storing raw secrets (license keys, MFA codes). Hash + TTL where applicable.
- Indexes on: `User.email`, `NewsletterSubscriber.email`, `Entitlement.sku`, `LicenseKey.licenseKeyHash`, `LicenseActivation.deviceId`, `PaymentRecord.webhookEventId`

## Future extensions

- Multi-user customers (team accounts) with multiple portal users per Customer
- Seat-based licenses and delegated device revocation
- Invoices / receipts and downloadable billing artifacts
- Usage analytics per entitlement/license
