# Pahlawan Matematik

Private development/testing repository for Pahlawan Matematik.

## Safety rule
- Production/live site must not be modified from this repository until testing is approved.
- Never commit passwords, API secrets, service-role keys, or private credentials.
- User-generated HTML/scripts are not trusted.
- Uploads, if added later, must use strict authentication, MIME/type validation, size limits, randomized filenames, and private storage by default.

## Product specification
Based on the supplied Pahlawan Matematik documentation:
- Parent account with email registration and 7-day account-based trial.
- Child profiles with four-digit PIN.
- Addition, subtraction, multiplication and division practice.
- Easy, Medium and Pro levels.
- Performance records including score, accuracy and time.
- Division scoring uses final quotient and remainder; working boxes must not determine correctness.

## Development plan
1. Rebuild a separate testing version from the documented product behaviour.
2. Implement arithmetic engine and automated tests first.
3. Add parent/child flows and performance tracking.
4. Add security controls before any public deployment.
5. Test and approve before replacing or modifying the live site.
