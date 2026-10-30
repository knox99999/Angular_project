# AWS and zero-cost deployment guide

**Status as checked 28 October 2026:** A complete, persistent, always-available AWS-hosted MEAN application cannot be promised for ₹0. AWS says the new-customer Free plan expires after six months or when its credits are exhausted, whichever happens first; eligibility is restricted to new AWS customers. After Free-plan expiry the account and resources are suspended, with a limited recovery period. Credits are temporary, not a permanent free tier. This guide prepares a demo; it does not create AWS resources.

## Recommended no-bill demonstration

Run Angular, Express, and MongoDB Community Server locally on Windows. Keep the chatbot on its deterministic FAQ fallback. This is the only option here that avoids hosted-service terms changing and avoids outbound database/API traffic. For a temporary public demo, consider free static hosting plus a free backend and Atlas Free only after reviewing the providers' current limits. That configuration is third-party hosted, sleeps, may be suspended, and must not contain real patient data.

## AWS eligibility and cost gate

1. Sign in only if you already have an account. Check account creation date, plan type, Free-plan eligibility, remaining promotional credits, and expiry in Billing/Cost Management. Existing AWS customers may not qualify for new-customer credits.
2. If the requirement is an ongoing zero bill or preserving access past six months, stop: AWS's current Free plan cannot guarantee it. Do not rely on free credits as a budget.
3. If proceeding with a temporary class demo, secure the root account with MFA, use a least-privilege IAM identity, and enable billing notifications before creating anything.
4. Billing alerts/CloudWatch alarms may have service-specific pricing or free quotas. Verify the current pricing for every alert, metric, log, and dashboard before enabling it; a budget notification is not a hard spend cap on a Paid account.
5. Check current AWS Free Tier eligibility/pricing in the account and service pricing pages immediately before any manual provisioning. S3 static hosting does not run Express. Amplify/hosting, API compute, egress, public IP addresses, DNS, and logs may be chargeable or use expiring credits.

## AWS-compatible build preparation (no deployment)

From PowerShell in `C:\mean_project`:

```powershell
Copy-Item server\.env.example server\.env
# Set MONGODB_URI and JWT_SECRET in server\.env; never commit it.
npm --prefix server install
npm --prefix server run build
npm --prefix client install
npm --prefix client run build
```

Angular output is under `client/dist/client/browser`. Before any hosting, set the API base URL to the chosen HTTPS backend and rebuild. Set Express `CLIENT_ORIGIN` to the exact HTTPS frontend origin, `COOKIE_SECURE=true`, a long random `JWT_SECRET`, and a restricted MongoDB URI. The current cross-origin cookie design needs a reviewed CSRF strategy and deployment-mode cookie settings before public use.

## MongoDB

For local demo use MongoDB Community Server and `mongodb://127.0.0.1:27017/meditrack`. MongoDB Atlas Free clusters (formerly M0) currently allow 0.5 GB total storage and at most 500 concurrent connections; limited regions and commands apply. Configure a database user and restrict the project IP access list to the backend's stable trusted egress IP. Never set `0.0.0.0/0` for real health records. Some free backend hosts have dynamic egress, making secure Atlas allowlisting difficult; do not solve this by opening the database to all IPs. Atlas is hosted by MongoDB, not an AWS-managed database even when its cluster is placed on AWS infrastructure.

## AI settings

Leave `GEMINI_API_KEY` blank for a deterministic FAQ fallback. Gemini's currently listed free API tier has model-specific limits, and Google's pricing page discloses that free-tier content may be used to improve products. Do not send real identifying/medical details without appropriate informed disclosure and a privacy review. Never enable grounding or paid-tier features automatically.

## Temporary external free demo (not guaranteed permanent)

Render currently lists free static sites and web services. Free web services sleep after 15 minutes without inbound activity, take about a minute to wake, have ephemeral filesystems, share 750 free instance hours per workspace per month, and may be suspended at limits. Exceeded bandwidth/build usage can bill when a payment method is present. Keep the database external and secured; Render warns that service-initiated traffic to external APIs/databases can trigger suspension. Cloudflare Pages/Workers free allowances can host static content and limited functions, but the Express API would need adaptation and strict quotas; usage beyond included limits may require a paid plan. Verify account dashboard terms before use.

## Verification and cleanup

For a local demo, open the frontend, register, add a test medicine, view today's schedule, record a dose, inspect history, and ask a FAQ question. Do not enter real patient data in a class demo.

If you manually created cloud resources, inventory each service and delete the app/backend, static site, IP addresses, load balancers, NAT gateways, disks, snapshots, databases, logs, DNS records, security groups, and test data as applicable. Removing a frontend does not automatically delete related resources. Re-check every region and the Billing console for remaining resources/charges. If using a temporary AWS Free plan, download any material needed before expiry; after expiry access may be suspended. Do not upgrade to a Paid plan to preserve the project without a separate decision.

## Sources checked

- [AWS Free plan FAQs](https://aws.amazon.com/free/free-tier-faqs/): eligibility, six-month/credit expiry, credits, post-expiry access.
- [AWS Free Tier Terms](https://aws.amazon.com/free/terms/): time-limited plan and offer conditions.
- [MongoDB Atlas Free cluster limits](https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/): 0.5 GB, 500 connections, regional/feature constraints.
- [Atlas IP access list](https://www.mongodb.com/docs/atlas/security/ip-access-list/): access restricted to allowlisted IPs.
- [Render free services](https://render.com/docs/free): sleep, instance hours, ephemeral filesystem, usage limits.
- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/): current free request limits and paid plan pricing.
- [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing): model-specific free/paid allowance and data use disclosure.
