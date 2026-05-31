# GuildHub Frontend — SPEC: Loot Council Experience

Purpose
-------

This document defines the first frontend iteration for GuildHub, focused on building a React-based user experience for loot distribution, raid item tracking, and loot council decision workflows.

Goals
-----

- Present guild loot, raid drops, and loot requests in a clear interface.
- Support council members and raid officers with fast access to request status and item assignments.
- Make the frontend compatible with the backend loot council API from the backend project.

Scope (Iteration 1)
-------------------

- A dashboard for item catalog and current raid loot.
- Request visualization for open loot requests.
- Interfaces for council sessions, votes, and final distribution review.
- Models and types aligned with backend objects: `Item`, `LootRequest`, `CouncilVote`, `DistributionRecord`.

User journeys
-------------

1. A raid officer opens the frontend and reviews the latest loot drop catalog.
2. Members submit loot requests and the request status is displayed.
3. Loot council members view active council sessions and cast votes.
4. Officers finalize distribution decisions and review the resulting assignment.

Acceptance Criteria
-------------------

- The app loads in modern browsers via Vite.
- Item metadata and loot requests render in a responsive dashboard.
- Frontend models are typed with TypeScript and support future API integration.
- Setup instructions are included in `README.md`.

Feature notes
-------------

- `Item` cards display item name, item level, and patch metadata.
- Request cards show requester, item, priority, and status.
- The frontend exists as a lightweight Vite application ready for backend API integration.

Business purpose
----------------

GuildHub is built for looter coordination and fair distribution of raid rewards. This frontend targets the same loot council use case as the backend, enabling guild officers and council members to manage requests and finalize item assignments in a web UI.
