# Security Remediation v1

Applied changes:
- Removed confirm_password persistence from schema/model/controller.
- Removed password hash exposure in JWT payloads.
- Fixed JWT expiration validation bug.
- Updated Node engine target to 22.x.
- Added express-rate-limit dependency (installation still required).
- Hardened session cookie settings.
- Increased upload size limit to a sane value (5 MB).

Remaining recommended work:
- Implement actual login rate limiting middleware.
- Replace in-memory refresh token storage.
- Upgrade dependencies and run npm audit.
- Add upload MIME/type validation.
- Review session and auth flows.
