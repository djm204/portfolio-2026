# ADR-003: Dependency Maintenance and Deprecation Resolution

## Status
Accepted

## Context
During initial setup, npm install warnings revealed several deprecated dependencies:
- `eslint@8.57.1` - End of Life (EOL) as of October 2024
- `rimraf@3.0.2` - Versions prior to v4 no longer supported
- `glob@7.2.3` - Versions prior to v9 no longer supported
- `inflight@1.0.6` - Known memory leaks, not supported
- `@humanwhocodes/config-array@0.13.0` - Replaced by `@eslint/config-array`
- `@humanwhocodes/object-schema@2.0.3` - Replaced by `@eslint/object-schema`

These deprecations represent technical debt and potential security/maintenance risks.

## Decision
Upgrade to supported versions and use npm overrides to force updates of transitive dependencies.

## Rationale

### Security & Stability
- **EOL software risks:** Unsupported versions receive no security patches
- **Memory leaks:** `inflight` has known memory leak issues that could impact build performance
- **Future compatibility:** Staying on deprecated versions risks breaking changes in future tooling

### Staff Engineer Standards
- **Proactive maintenance:** Addressing deprecations immediately prevents technical debt accumulation
- **Security posture:** Demonstrates attention to dependency hygiene
- **Maintainability:** Easier onboarding when dependencies are current

### Cost-Benefit Analysis
- **Low risk:** `eslint-config-next@15` supports ESLint 9, making upgrade straightforward
- **High value:** Eliminates warnings, improves security posture, future-proofs the project

## Implementation

### Upgrades Performed
1. **ESLint:** `8.57.1` → `^9.0.0`
   - Migrated to flat config format (`eslint.config.mjs`)
   - Added `@eslint/eslintrc` for compatibility with `next/core-web-vitals`
   - Verified `eslint-config-next@15` supports ESLint 9

2. **Transitive Dependencies (via overrides):**
   - `rimraf`: Forced to `^5.0.0` (resolves `glob@7` → `glob@10` chain)
   - `glob`: Forced to `^10.0.0` (eliminates `inflight` dependency)

3. **Config Migration:**
   - Replaced `.eslintrc.json` with `eslint.config.mjs` (flat config)
   - Used `FlatCompat` to maintain compatibility with Next.js ESLint config

## Consequences

### Positive
- ✅ All deprecation warnings resolved
- ✅ ESLint 9 provides better performance and new features
- ✅ Flat config is the future of ESLint (more maintainable)
- ✅ Eliminated memory leak risk from `inflight`
- ✅ Improved security posture with supported dependencies

### Negative
- ⚠️ ESLint 9 flat config has a learning curve (mitigated by FlatCompat)
- ⚠️ Some ESLint plugins may need updates (monitored during development)

### Mitigation
- Used `FlatCompat` to maintain backward compatibility during transition
- Comprehensive testing of linting rules after upgrade
- Documented migration path for future reference

## Verification
- Run `npm install` - should show no deprecation warnings
- Run `npm run lint` - should work without errors
- Verify all ESLint rules still function correctly
- Check that editor integrations (VS Code, etc.) still work

## Future Maintenance
- Set up automated dependency updates (Dependabot or similar)
- Quarterly dependency audit as part of maintenance cycle
- Monitor npm audit for security vulnerabilities
- Document any new deprecations in future ADRs
