---
name: GitHub publishing
description: Constraints encountered when publishing this workspace through Replit GitHub connections.
---

Prefer the standard GitHub connector and Git Data API when the local Git credential helper selects an incompatible GitHub App credential. Empty repositories need an initialization commit before Git-object uploads, and connector writes should stay below 10 requests per second with retry handling.

**Why:** The GitHub App could create neither a user repository nor a valid CLI session, and the local HTTPS push selected an invalid credential even after standard GitHub authorization. API uploads also returned errors until the repository was initialized and request concurrency was reduced.

**How to apply:** For future publishing, try a normal authenticated Git push once. If it fails from credential selection, use the existing standard GitHub connector rather than exposing tokens or repeatedly reauthorizing. Pace API writes below the connector limit.