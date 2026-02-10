# Islamly - Comprehensive Project Plan

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [TODO List](#todo-list)
3. [Implementation Plan](#implementation-plan)
4. [Feature Index](#feature-index)
5. [API Documentation](#api-documentation)
6. [Progress Tracking](#progress-tracking)

---

## Project Overview

### Platform Information
- **Platform**: Islamly - A Salafi/Athari-Aligned Islamic Learning Platform
- **Tech Stack**: Next.js 14, TypeScript 5, Tailwind CSS, Zustand, React Query
- **Mission**: Provide authentic Islamic knowledge grounded in Quran, Sunnah, and the understanding of the Salaf

### Quality Standards

#### All Content Must Meet:
1. ✅ Authentic-source (verified scholarly sources)
2. ✅ Non-sectarian (avoid Shia/Sufi/Ash'ari content)
3. ✅ Athari-aligned (consistent with Athari aqeedah)
4. ✅ Developer-ready (well-documented, TypeScript types)
5. ✅ Actively maintained or historically verified
6. ✅ Open source or free tier available

#### Reliability Scoring (1-5):
- **Source Authenticity**: 1-5 (scholarly verification)
- **Data Accuracy**: 1-5 (error rate and corrections)
- **Maintenance**: 1-5 (active development)
- **Community Trust**: 1-5 (usage and reviews)
- **Scholarly Recognition**: 1-5 (academic认可)

---

## TODO List

### Phase 1: Type Definitions & Data Layer ✅ COMPLETED
- [x] Create IMPLEMENTATION_PLAN.md - Comprehensive implementation plan
- [x] Create `src/types/api.ts` - Enhanced API type definitions
- [ ] Create `src/data/islamic-apis.ts` - Central API registry (60 APIs)
- [ ] Create `src/data/apis.json` - JSON export of all APIs
- [ ] Create `src/data/apis.yaml` - YAML export of all APIs

### Phase 2: Service Layer
- [ ] Create `src/services/index.ts` - Service exports
- [ ] Create `src/services/api-registry.ts` - API registry service class
- [ ] Create `src/services/quran-api.ts` - Quran API service
- [ ] Create `src/services/hadith-api.ts` - Hadith API service
- [ ] Create `src/services/prayer-times-api.ts` - Prayer times service
- [ ] Create `src/services/hijri-api.ts` - Hijri calendar service
- [ ] Create `src/services/dua-api.ts` - Dua & Dhikr service
- [ ] Create `src/services/qibla-api.ts` - Qibla direction service
- [ ] Create `src/services/zakat-api.ts` - Zakat & finance service
- [ ] Create `src/services/arabic-api.ts` - Arabic/Classical text service

### Phase 3: Utilities & Helpers
- [ ] Create `src/lib/api-utils.ts` - API utilities
- [ ] Create `src/lib/api-validators.ts` - API validators
- [ ] Update `src/lib/utils.ts` - Export API utilities

### Phase 4: React Components
- [ ] Create `src/components/api/index.ts` - Component exports
- [ ] Create `src/components/api/api-card.tsx` - API card component
- [ ] Create `src/components/api/api-categories.tsx` - Categories component
- [ ] Create `src/components/api/api-documentation.tsx` - Documentation component

### Phase 5: Integration
- [ ] Create `src/store/api-store.ts` - Zustand API store
- [ ] Create `src/hooks/useIslamicApis.ts` - React Query hooks
- [ ] Create `src/app/api-docs/page.tsx` - Dedicated API docs page

### Phase 6: Documentation
- [ ] Create `docs/ISLAMIC_APIS.md` - Complete API documentation
- [ ] Update `README.md` - Add API section
- [ ] Create `CHANGELOG.md` - Document changes

---

## Implementation Plan

### Information Gathered

#### Project Context
- **Platform**: Islamly - A Salafi/Athari-Aligned Islamic Learning Platform
- **Tech Stack**: Next.js 14, TypeScript 5, Tailwind CSS, Zustand, React Query
- **Existing Types**: Already comprehensive types defined in `src/types/index.ts`
- **Existing TODO**: Basic phases outlined in `TODO.md`

#### Task Requirements
Implement all **60 Salafi/Athari-Aligned Islamic APIs** organized by category:
1. **Quran APIs** (12) - API-based and dataset sources
2. **Hadith APIs** (12) - Collections, grading, and chains
3. **Athan/Prayer Times APIs** (10) - Prayer time calculations
4. **Qibla Direction APIs** (4) - Qibla finding
5. **Hijri Calendar APIs** (6) - Islamic calendar conversions
6. **Dua & Dhikr APIs** (6) - Morning/evening remembrances
7. **Zakat & Finance APIs** (4) - Zakat calculations
8. **Arabic/Classical Text APIs** (6) - NLP and text tools

### Implementation Steps

#### Phase 1: Type Definitions & Data Layer (Steps 1-4)

##### Step 1: Create Enhanced API Types
**File**: `src/types/api.ts`
- Define `IslamicApiEntry` interface with all metadata fields
- Add reliability scoring system (1-5 scale)
- Add authentication and rate limiting info
- Add category-specific interfaces (QuranApi, HadithApi, etc.)

##### Step 2: Create Central API Registry
**File**: `src/data/islamic-apis.ts`
- Create `ISLAMIC_APIS` constant with all 60 APIs
- Each API includes: id, name, description, url, category, auth type, response format, license, reliability score, features, limitations
- Add scholarly verification flags

##### Step 3: Create JSON Export
**File**: `src/data/apis.json`
- Export all 60 APIs in JSON format for easy consumption
- Include metadata and documentation links

##### Step 4: Create YAML Export
**File**: `src/data/apis.yaml`
- Export all 60 APIs in YAML format for configuration

#### Phase 2: Service Layer (Steps 5-10)

##### Step 5: API Registry Service
**File**: `src/services/api-registry.ts`
- Create `ApiRegistryService` class
- Methods: `getByCategory()`, `search()`, `filter()`, `getById()`
- Add caching and performance optimizations

##### Step 6: Quran API Service
**File**: `src/services/quran-api.ts`
- `QuranApiService` class
- Methods: `getSurahs()`, `getAyah()`, `search()`, `getTafsir()`
- Integrate with quran.com, alquran.cloud, and other sources

##### Step 7: Hadith API Service
**File**: `src/services/hadith-api.ts`
- `HadithApiService` class
- Methods: `getCollections()`, `getHadith()`, `search()`, `getByGrading()`
- Support major collections (Bukhari, Muslim, etc.)

##### Step 8: Prayer Times Service
**File**: `src/services/prayer-times-api.ts`
- `PrayerTimesService` class
- Methods: `getTimes()`, `getToday()`, `getMonth()`, `getQibla()`
- Support multiple calculation methods

##### Step 9: Hijri Calendar Service
**File**: `src/services/hijri-api.ts`
- `HijriDateService` class
- Methods: `toHijri()`, `toGregorian()`, `getEvents()`
- Support major Islamic events

##### Step 10: Service Index
**File**: `src/services/index.ts`
- Export all service classes
- Create service factory for easy instantiation

#### Phase 3: Utilities & Helpers (Steps 11-13)

##### Step 11: API Utilities
**File**: `src/lib/api-utils.ts`
- `fetchApi()` - Generic API fetcher with error handling
- `retryRequest()` - Retry logic for failed requests
- `cacheResponse()` - Caching decorator for API calls
- `parseApiResponse()` - Response parsing utilities

##### Step 12: Validators
**File**: `src/lib/api-validators.ts`
- `validateApiEntry()` - Validate API configuration
- `validateApiResponse()` - Validate response structure
- `checkApiHealth()` - Check if API is available

##### Step 13: Update Utils
**File**: `src/lib/utils.ts`
- Export new API utilities
- Add helper functions for common operations

#### Phase 4: React Components (Steps 14-17)

##### Step 14: API Card Component
**File**: `src/components/api/api-card.tsx`
- Display individual API information
- Show reliability score
- Copy-to-clipboard for URLs
- Link to documentation

##### Step 15: API Categories Component
**File**: `src/components/api/api-categories.tsx`
- Display APIs organized by category
- Filter and search functionality
- Category statistics

##### Step 16: API Documentation Component
**File**: `src/components/api/api-documentation.tsx`
- Full API documentation view
- Endpoint examples
- Request/response samples
- Code snippets

##### Step 17: API Index Export
**File**: `src/components/api/index.ts`
- Export all API-related components

#### Phase 5: Integration (Steps 18-21)

##### Step 18: Global Store Integration
**File**: `src/store/api-store.ts`
- Add API registry to Zustand store
- Add API cache management
- Add loading and error states

##### Step 19: React Query Hooks
**File**: `src/hooks/useIslamicApis.ts`
- `useApis()` - Fetch all APIs
- `useApisByCategory()` - Fetch by category
- `useApiSearch()` - Search APIs
- `useApiHealth()` - Check API status

##### Step 20: Main Page Integration
**File**: `src/app/page.tsx`
- Add API documentation section
- Display featured APIs
- Show category overview

##### Step 21: API Docs Page
**File**: `src/app/api-docs/page.tsx`
- Dedicated API documentation page
- Full listing of all 60 APIs
- Search and filter functionality

#### Phase 6: Documentation & README (Steps 22-24)

##### Step 22: API Documentation File
**File**: `docs/ISLAMIC_APIS.md`
- Complete documentation of all APIs
- Usage examples
- Integration guide
- Best practices

##### Step 23: Update Main README
**File**: `README.md`
- Add API section
- Link to API documentation
- Quick start guide

##### Step 24: CHANGELOG
**File**: `CHANGELOG.md`
- Document API implementation
- Track changes and updates

---

## Feature Index

### Core Modules

#### 1. Core Aqeedah & Methodology
- Tawheed (531–600)
- Salafi/Athari Principles (546–600)
- Refutation of Deviant Sects (554–600)
- Expanded: Add micro features for each aspect of Tawheed, refutation, and Salafi methodology

#### 2. Fiqh & Worship
- Usul al-Fiqh (601–630)
- Purification (631–650)
- Prayer (651–680)
- Zakat (681–700)
- Expanded: Add micro features for each fiqh topic

#### 3. AI Tools & Learning
- AI Islamic Learning (701–730)
- AI Content Creation (731–760)
- AI Personal Development (761–800)
- Expanded: Add micro features for AI-powered Islamic learning

#### 4. Learning Systems
- Curriculum Design (801–830)
- Assessment Systems (831–860)
- Progress Tracking (861–900)
- Expanded: Add micro features for curriculum modules

#### 5. Community & Social
- Study Circles (901–930)
- Islamic Social Network (931–960)
- Community Support (961–1000)
- Expanded: Add micro features for community engagement

#### 6. Advanced AI & Admin
- AI Quran Analysis (1001–1050)
- AI Hadith Intelligence (1051–1100)
- AI Learning Assistant (1101–1150)
- AI Community Intelligence (1151–1200)
- User Management (1201–1250)
- Content Moderation (1251–1300)
- Community Moderation (1301–1350)
- Analytics & Reporting (1351–1400)

#### 7. Media & Streaming
- Islamic Video Streaming (1401–1450)
- Video Content Management (1451–1500)
- Streaming Technology (1501–1550)

#### 8. Ethics & Morality
- Spiritual Morality (1551–1600)
- Business Ethics (1601–1700)
- Family Ethics (1701–1800)
- Community Ethics (1801–1900)
- Global Ethics (1901–2000)
- Advanced Ethics (2001–2100)
- Spiritual Ethics (2101–2200)
- Practical Ethics (2201–2300)
- Ultimate Ethics (2301–2400)

### Missing & Suggested Modules

1. **Seerah & History**
   - Timeline, battles, companions, maps
   - Interactive biographies

2. **Arabic Language & Linguistics**
   - Grammar, morphology, vocabulary
   - Qur'anic Arabic curriculum

3. **Worship & Spirituality**
   - Duas, ruqyah, tazkiyah, reminders

4. **Islamic Calendar & Events**
   - Hijri, prayer times, Qibla, Ramadan, Hajj/Umrah

5. **Children & Family Learning**
   - Kids' stories, games, family plans

6. **Marketplace & Economy**
   - Islamic marketplace, finance, zakat, charity

7. **Masjid & Local Community**
   - Masjid finder, events, khutbah, volunteers

8. **Scholar & Teacher Ecosystem**
   - Scholar profiles, live Q&A, fatwa, courses

9. **Security, Privacy & Compliance**
   - Privacy, moderation, shariah compliance

10. **Infrastructure & Performance**
    - Caching, multi-tenant, offline, sync, API

11. **Dawah & Outreach**
    - Convert support, intro to Islam, comparative religion

12. **Mental Health & Wellbeing**
    - Counseling, stress, marriage/family guidance

13. **Global Ummah**
    - News, crisis response, research, fatwa clustering, analytics

---

## API Documentation

### API Categories & Counts

| Category | Count | Description |
|----------|-------|-------------|
| Quran | 12 | Quran APIs and datasets |
| Hadith | 12 | Hadith collections and APIs |
| Athan/Prayer Times | 10 | Prayer time calculations |
| Qibla Direction | 4 | Qibla finding APIs |
| Hijri Calendar | 6 | Islamic calendar conversions |
| Dua & Dhikr | 6 | Morning/evening remembrances |
| Zakat & Finance | 4 | Zakat calculation tools |
| Arabic/Classical | 6 | Arabic NLP and text tools |
| **Total** | **60** | All APIs |

### Detailed API List

#### Quran APIs (12)
1. [ ] api.quran.com/v4
2. [ ] alquran.cloud/api
3. [ ] github.com/semarketir/quranjson
4. [ ] github.com/quran/quran.com-api
5. [ ] github.com/quran/quran.com-data
6. [ ] github.com/quran/quran.com-images
7. [ ] github.com/quran/quran.com-frontend
8. [ ] github.com/TarteelAI
9. [ ] github.com/TarteelAI/quranic-universal-library
10. [ ] github.com/alquran-foundation/quran-api
11. [ ] github.com/risan/quran-api
12. [ ] github.com/GlobalQuran/api

#### Hadith APIs (12)
13. [ ] api.sunnah.com/v1
14. [ ] github.com/sunnah-com/api
15. [ ] github.com/sunnah-com/data
16. [ ] github.com/fawazahmed0/hadith-api
17. [ ] github.com/risan/hadith
18. [ ] github.com/ahmedhamdi96/hadith-json
19. [ ] github.com/sunnah-com/hadith-api
20. [ ] github.com/sunnah-com/hadith-json
21. [ ] github.com/sunnah-com/hadith-data
22. [ ] github.com/abuisa/hadith-resources
23. [ ] github.com/abdurrahman/hadith
24. [ ] github.com/abdurrahman/hadith-encyclopedia

#### Athan/Prayer Times APIs (10)
25. [ ] github.com/batoulapps/adhan-api
26. [ ] github.com/batoulapps/adhan-js
27. [ ] github.com/batoulapps/adhan-dart
28. [ ] github.com/batoulapps/adhan-java
29. [ ] github.com/batoulapps/adhan-swift
30. [ ] aladhan.com/prayer-times-api
31. [ ] muslimsalat.com/api
32. [ ] github.com/itmuslim/prayer-times
33. [ ] github.com/abodehq/prayertimes
34. [ ] github.com/itmuslim/ITL

#### Qibla Direction APIs (4)
35. [ ] aladhan.com/qibla
36. [ ] muslimsalat.com/qibla
37. [ ] github.com/itmuslim/ITL-Python (Qibla module)
38. [ ] github.com/itmuslim/ITL-Java (Qibla module)

#### Hijri Calendar APIs (6)
39. [ ] api.aladhan.com/v1/gToH
40. [ ] api.aladhan.com/v1/hToG
41. [ ] github.com/kbariotis/hijri-date
42. [ ] github.com/itmuslim/ITL (Hijri module)
43. [ ] github.com/itmuslim/ITL-Python
44. [ ] github.com/itmuslim/ITL-Java

#### Dua & Dhikr APIs (6)
45. [ ] github.com/mnadeem/azkar
46. [ ] github.com/abodehq/azkar-db
47. [ ] github.com/abdurrahman/dua
48. [ ] github.com/abuisa/adhkar-resources
49. [ ] github.com/abdurrahman/adhkar
50. [ ] github.com/abdurrahman/hisn-al-muslim

#### Zakat & Finance APIs (4)
51. [ ] github.com/abodehq/zakat
52. [ ] github.com/itmuslim/ITL (Zakat module)
53. [ ] github.com/abuisa/fiqh-resources
54. [ ] github.com/abdurrahman/fiqh

#### Arabic/Classical Text APIs (6)
55. [ ] github.com/Barqawiz/Arabic-NLP
56. [ ] github.com/mush42/ara-ocr
57. [ ] github.com/linuxscout/arabic-text-tools
58. [ ] github.com/Barqawiz/Arabic-OCR
59. [ ] github.com/abdurrahman/arabic-books
60. [ ] github.com/abuisa/arabic-resources

---

## Progress Tracking

### Progress Summary

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Type Definitions & Data Layer | 🔄 In Progress | 20% |
| Phase 2: Service Layer | ⏳ Pending | 0% |
| Phase 3: Utilities & Helpers | ⏳ Pending | 0% |
| Phase 4: React Components | ⏳ Pending | 0% |
| Phase 5: Integration | ⏳ Pending | 0% |
| Phase 6: Documentation | ⏳ Pending | 0% |

**Overall Progress**: 5%
**Total APIs**: 60
**Implemented APIs**: 0

### Follow-up Steps

1. ✅ Review and approve this plan
2. ⬜ Phase 1: Create types and data layer
3. ⬜ Phase 2: Create service layer
4. ⬜ Phase 3: Create utilities
5. ⬜ Phase 4: Create React components
6. ⬜ Phase 5: Integration
7. ⬜ Phase 6: Documentation
8. ⬜ Test all implementations
9. ⬜ Update TODO.md with progress

---

## Files Structure

```
src/
├── data/
│   ├── islamic-apis.ts      (Main API registry - 60 entries)
│   └── apis.json            (JSON export)
├── types/
│   └── api.ts               (Enhanced API types)
├── services/
│   ├── index.ts             (Service exports)
│   ├── api-registry.ts      (Registry service)
│   ├── quran-api.ts         (Quran service)
│   ├── hadith-api.ts        (Hadith service)
│   ├── prayer-times-api.ts  (Prayer times service)
│   └── hijri-api.ts         (Hijri calendar service)
├── lib/
│   ├── api-utils.ts         (API utilities)
│   └── api-validators.ts    (Validators)
├── components/
│   └── api/
│       ├── index.ts
│       ├── api-card.tsx
│       ├── api-categories.tsx
│       └── api-documentation.tsx
├── hooks/
│   └── useIslamicApis.ts
├── store/
│   └── api-store.ts
└── app/
    └── api-docs/
        └── page.tsx

docs/
└── ISLAMIC_APIS.md

CHANGELOG.md
```

---

## Quick Start Commands

```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Type check
npm run type-check

# Build project
npm run build
```

---

## Additional Notes

### Estimated Time
- **Complete Implementation**: 2-3 hours
- **Dependencies**: None (pure TypeScript/JavaScript)
- **Compatibility**: Next.js 14, TypeScript 5

### API Categories & Progress

#### Quran APIs (12)
Progress: 0/12 implemented

#### Hadith APIs (12)
Progress: 0/12 implemented

#### Athan/Prayer Times APIs (10)
Progress: 0/10 implemented

#### Qibla Direction APIs (4)
Progress: 0/4 implemented

#### Hijri Calendar APIs (6)
Progress: 0/6 implemented

#### Dua & Dhikr APIs (6)
Progress: 0/6 implemented

#### Zakat & Finance APIs (4)
Progress: 0/4 implemented

#### Arabic/Classical Text APIs (6)
Progress: 0/6 implemented

---

## Version Information

**Last Updated**: 2026
**Plan Version**: 3.0 - Merged Documentation
**Source Files**: TODO.md, IMPLEMENTATION_PLAN.md, README.md

---

*This document is maintained as a single source of truth for all project planning and tracking.*

