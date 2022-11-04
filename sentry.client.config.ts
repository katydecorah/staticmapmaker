import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://ae74833be2a747a1a9cf88a53b68434a@o513158.ingest.sentry.io/4503955330957312",
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});