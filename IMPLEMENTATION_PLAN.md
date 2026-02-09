# Islamly API Implementation - Detailed Plan

## Information Gathered

### Project Context
- **Platform**: Islamly - A Salafi/Athari-Aligned Islamic Learning Platform
- **Tech Stack**: Next.js 14, TypeScript 5, Tailwind CSS, Zustand, React Query
- **Existing Types**: Already comprehensive types defined in `src/types/index.ts`
- **Existing TODO**: Basic phases outlined in `TODO.md`

### Task Requirements
Implement all **60 Salafi/Athari-Aligned Islamic APIs** organized by category:
1. **Quran APIs** (12) - API-based and dataset sources
2. **Hadith APIs** (12) - Collections, grading, and chains
3. **Athan/Prayer Times APIs** (10) - Prayer time calculations
4. **Qibla Direction APIs** (4) - Qibla finding
5. **Hijri Calendar APIs** (6) - Islamic calendar conversions
6. **Dua & Dhikr APIs** (6) - Morning/evening remembrances
7. **Zakat & Finance APIs** (4) - Zakat calculations
8. **Arabic/Classical Text APIs** (6) - NLP and text tools

### Quality Requirements
- **Authentic-source**: Only verified, scholarly sources
- **Non-sectarian**: Avoid Shia, Sufi, or Ash'ari-specific content
- **Athari-aligned**: Consistent with Athari aqeedah
- **Developer-ready**: Well-documented with TypeScript types

---

## Implementation Plan

### Phase 1: Type Definitions & Data Layer (Steps 1-4)

#### Step 1: Create Enhanced API Types
**File**: `src/types/api.ts`
- Define `IslamicApiEntry` interface with all metadata fields
- Add reliability scoring system (1-5 scale)
- Add authentication and rate limiting info
- Add category-specific interfaces (QuranApi, HadithApi, etc.)

#### Step 2: Create Central API Registry
**File**: `src/data/islamic-apis.ts`
- Create `ISLAMIC_APIS` constant with all 60 APIs
- Each API includes: id, name, description, url, category, auth type, response format, license, reliability score, features, limitations
- Add scholarly verification flags

#### Step 3: Create JSON Export
**File**: `src/data/apis.json`
- Export all 60 APIs in JSON format for easy consumption
- Include metadata and documentation links

#### Step 4: Create YAML Export
**File**: `src/data/apis.yaml`
- Export all 60 APIs in YAML format for configuration

---

### Phase 2: Service Layer (Steps 5-10)

#### Step 5: API Registry Service
**File**: `src/services/api-registry.ts`
- Create `ApiRegistryService` class
- Methods: `getByCategory()`, `search()`, `filter()`, `getById()`
- Add caching and performance optimizations

#### Step 6: Quran API Service
**File**: `src/services/quran-api.ts`
- `QuranApiService` class
- Methods: `getSurahs()`, `getAyah()`, `search()`, `getTafsir()`
- Integrate with quran.com, alquran.cloud, and other sources

#### Step 7: Hadith API Service
**File**: `src/services/hadith-api.ts`
- `HadithApiService` class
- Methods: `getCollections()`, `getHadith()`, `search()`, `getByGrading()`
- Support major collections (Bukhari, Muslim, etc.)

#### Step 8: Prayer Times Service
**File**: `src/services/prayer-times-api.ts`
- `PrayerTimesService` class
- Methods: `getTimes()`, `getToday()`, `getMonth()`, `getQibla()`
- Support multiple calculation methods

#### Step 9: Hijri Calendar Service
**File**: `src/services/hijri-api.ts`
- `HijriDateService` class
- Methods: `toHijri()`, `toGregorian()`, `getEvents()`
- Support major Islamic events

#### Step 10: Service Index
**File**: `src/services/index.ts`
- Export all service classes
- Create service factory for easy instantiation

---

### Phase 3: Utilities & Helpers (Steps 11-13)

#### Step 11: API Utilities
**File**: `src/lib/api-utils.ts`
- `fetchApi()` - Generic API fetcher with error handling
- `retryRequest()` - Retry logic for failed requests
- `cacheResponse()` - Caching decorator for API calls
- `parseApiResponse()` - Response parsing utilities

#### Step 12: Validators
**File**: `src/lib/api-validators.ts`
- `validateApiEntry()` - Validate API configuration
- `validateApiResponse()` - Validate response structure
- `checkApiHealth()` - Check if API is available

#### Step 13: Update Utils
**File**: `src/lib/utils.ts`
- Export new API utilities
- Add helper functions for common operations

---

### Phase 4: React Components (Steps 14-17)

#### Step 14: API Card Component
**File**: `src/components/api/api-card.tsx`
- Display individual API information
- Show reliability score
- Copy-to-clipboard for URLs
- Link to documentation

#### Step 15: API Categories Component
**File**: `src/components/api/api-categories.tsx`
- Display APIs organized by category
- Filter and search functionality
- Category statistics

#### Step 16: API Documentation Component
**File**: `src/components/api/api-documentation.tsx`
- Full API documentation view
- Endpoint examples
- Request/response samples
- Code snippets

#### Step 17: API Index Export
**File**: `src/components/api/index.ts`
- Export all API-related components

---

### Phase 5: Integration (Steps 18-21)

#### Step 18: Global Store Integration
**File**: `src/store/api-store.ts`
- Add API registry to Zustand store
- Add API cache management
- Add loading and error states

#### Step 19: React Query Hooks
**File**: `src/hooks/useIslamicApis.ts`
- `useApis()` - Fetch all APIs
- `useApisByCategory()` - Fetch by category
- `useApiSearch()` - Search APIs
- `useApiHealth()` - Check API status

#### Step 20: Main Page Integration
**File**: `src/app/page.tsx`
- Add API documentation section
- Display featured APIs
- Show category overview

#### Step 21: API Docs Page
**File**: `src/app/api-docs/page.tsx`
- Dedicated API documentation page
- Full listing of all 60 APIs
- Search and filter functionality

---

### Phase 6: Documentation & README (Steps 22-24)

#### Step 22: API Documentation File
**File**: `docs/ISLAMIC_APIS.md`
- Complete documentation of all APIs
- Usage examples
- Integration guide
- Best practices

#### Step 23: Update Main README
**File**: `README.md`
- Add API section
- Link to API documentation
- Quick start guide

#### Step 24: CHANGELOG
**File**: `CHANGELOG.md`
- Document API implementation
- Track changes and updates

---

## Files to Create

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

## API Categories & Counts

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

---

## Quality Standards

### All APIs Must Meet:
1. ✅ Authentic-source (verified scholarly sources)
2. ✅ Non-sectarian (avoid Shia/Sufi/Ash'ari content)
3. ✅ Athari-aligned (consistent with Athari aqeedah)
4. ✅ Developer-ready (well-documented, TypeScript types)
5. ✅ Actively maintained or historically verified
6. ✅ Open source or free tier available

### Reliability Scoring (1-5):
- **Source Authenticity**: 1-5 (scholarly verification)
- **Data Accuracy**: 1-5 (error rate and corrections)
- **Maintenance**: 1-5 (active development)
- **Community Trust**: 1-5 (usage and reviews)
- **Scholarly Recognition**: 1-5 (academic认可)

---

## Follow-up Steps

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

**Estimated Time**: 2-3 hours for complete implementation
**Dependencies**: None (pure TypeScript/JavaScript)
**Compatibility**: Next.js 14, TypeScript 5

