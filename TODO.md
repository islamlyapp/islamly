# Islamly - Implementation TODO

## Overview
This TODO file tracks the remaining implementation tasks based on the comprehensive plan in `plan.md`.

## Progress Summary
- **Plan Status**: ✅ Finalized
- **Overall Progress**: 5%
- **Total APIs**: 60
- **Implemented APIs**: 0

---

## TODO Items by Phase

### Phase 1: Type Definitions & Data Layer
- [ ] Create `src/types/api.ts` - Enhanced API type definitions
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
- [ ] Update `src/app/page.tsx` - Add API documentation section

### Phase 6: Documentation
- [ ] Create `docs/ISLAMIC_APIS.md` - Complete API documentation
- [ ] Update `README.md` - Add API section
- [ ] Create `CHANGELOG.md` - Document changes

---

## API Implementation by Category

### Quran APIs (12)
- [ ] api.quran.com/v4
- [ ] alquran.cloud/api
- [ ] github.com/semarketir/quranjson
- [ ] github.com/quran/quran.com-api
- [ ] github.com/quran/quran.com-data
- [ ] github.com/quran/quran.com-images
- [ ] github.com/quran/quran.com-frontend
- [ ] github.com/TarteelAI
- [ ] github.com/TarteelAI/quranic-universal-library
- [ ] github.com/alquran-foundation/quran-api
- [ ] github.com/risan/quran-api
- [ ] github.com/GlobalQuran/api

### Hadith APIs (12)
- [ ] api.sunnah.com/v1
- [ ] github.com/sunnah-com/api
- [ ] github.com/sunnah-com/data
- [ ] github.com/fawazahmed0/hadith-api
- [ ] github.com/risan/hadith
- [ ] github.com/ahmedhamdi96/hadith-json
- [ ] github.com/sunnah-com/hadith-api
- [ ] github.com/sunnah-com/hadith-json
- [ ] github.com/sunnah-com/hadith-data
- [ ] github.com/abuisa/hadith-resources
- [ ] github.com/abdurrahman/hadith
- [ ] github.com/abdurrahman/hadith-encyclopedia

### Athan/Prayer Times APIs (10)
- [ ] github.com/batoulapps/adhan-api
- [ ] github.com/batoulapps/adhan-js
- [ ] github.com/batoulapps/adhan-dart
- [ ] github.com/batoulapps/adhan-java
- [ ] github.com/batoulapps/adhan-swift
- [ ] aladhan.com/prayer-times-api
- [ ] muslimsalat.com/api
- [ ] github.com/itmuslim/prayer-times
- [ ] github.com/abodehq/prayertimes
- [ ] github.com/itmuslim/ITL

### Qibla Direction APIs (4)
- [ ] aladhan.com/qibla
- [ ] muslimsalat.com/qibla
- [ ] github.com/itmuslim/ITL-Python (Qibla module)
- [ ] github.com/itmuslim/ITL-Java (Qibla module)

### Hijri Calendar APIs (6)
- [ ] api.aladhan.com/v1/gToH
- [ ] api.aladhan.com/v1/hToG
- [ ] github.com/kbariotis/hijri-date
- [ ] github.com/itmuslim/ITL (Hijri module)
- [ ] github.com/itmuslim/ITL-Python
- [ ] github.com/itmuslim/ITL-Java

### Dua & Dhikr APIs (6)
- [ ] github.com/mnadeem/azkar
- [ ] github.com/abodehq/azkar-db
- [ ] github.com/abdurrahman/dua
- [ ] github.com/abuisa/adhkar-resources
- [ ] github.com/abdurrahman/adhkar
- [ ] github.com/abdurrahman/hisn-al-muslim

### Zakat & Finance APIs (4)
- [ ] github.com/abodehq/zakat
- [ ] github.com/itmuslim/ITL (Zakat module)
- [ ] github.com/abuisa/fiqh-resources
- [ ] github.com/abdurrahman/fiqh

### Arabic/Classical Text APIs (6)
- [ ] github.com/Barqawiz/Arabic-NLP
- [ ] github.com/mush42/ara-ocr
- [ ] github.com/linuxscout/arabic-text-tools
- [ ] github.com/Barqawiz/Arabic-OCR
- [ ] github.com/abdurrahman/arabic-books
- [ ] github.com/abuisa/arabic-resources

---

## Quick Start

### Run Development Server
```bash
npm run dev
```

### Type Check
```bash
npm run type-check
```

### Build Project
```bash
npm run build
```

---

## Estimated Time
- **Complete Implementation**: 2-3 hours
- **Dependencies**: None (pure TypeScript/JavaScript)
- **Compatibility**: Next.js 14, TypeScript 5

---

## Last Updated
2025 - Plan Finalized

