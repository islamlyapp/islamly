# Islamly - Development Plan & Architecture

Islamly is a high-fidelity scholarly infrastructure designed to provide authentic Islamic knowledge (Ahlus-Sunnah wal-Jama'ah) to the global Ummah using advanced AI and real-time data services.

## 🏗️ Architecture Overview

- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit 1.x with Google Gemini 2.5 Flash
- **Backend**: Firebase (Authentication & Cloud Firestore)
- **UI System**: Tailwind CSS + Shadcn/UI (Mobile-first, dark-themed)
- **Data Layers**: 
  - Quran.com API (Verses & Translations)
  - Aladhan API (Global Prayer Times)
  - Custom Verified Knowledge Hub (Internal Scholarly Database)

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Completed)
- [x] Unified Authentication (Email, Social, Anonymous)
- [x] Global Language Infrastructure (7,709+ language support)
- [x] High-fidelity Quran Reader with 10 Authentic Qira'at
- [x] GPS-aware Prayer Schedule & Calculation Methods

### Phase 2: Al-Mualim AI Infrastructure (Completed)
- [x] **Quran Hifz Teacher**: Real-time feedback on Tajweed/Accuracy
- [x] **Hadith & Mutoon Support**: Expanded feedback for classical texts
- [x] **Passage Simplifier**: AI-driven explanation of complex scholarly quotes
- [x] **Knowledge Assistant**: RAG-based search over verified scholarly modules

### Phase 3: Scholarly Breadth (Ongoing)
- [x] **Manuscript Archives**: Digitized access to early Mushafs (Topkapi, Sana'a)
- [x] **Scholarly Astronomy**: High-precision Hilal sighting calculations
- [x] **Scholars Directory**: Verified database of classical and modern giants
- [x] **Sunnah Guard**: Proactive refutation of Shirk and Bid'ah in AI responses
- [ ] **Goal**: Expand from 40 to 500+ verified data modules

### Phase 4: Practical & Community (Completed)
- [x] **Family & Youth Hubs**: Specialized portals for different demographics
- [x] **Halal & Masjid Locators**: Real-time discovery services
- [x] **Daily Adhkar**: Authenticated morning/evening supplications
- [x] **Ruqyah Shari'ah**: Authentic healing and protection guide

### Phase 5: Scale & Mobile (Upcoming)
- [ ] **Offline-First Mode**: Local caching of library and Quran
- [ ] **Native Mobile Shell**: Capacitor/React Native integration for App Store deployment
- [ ] **Community Circles**: Secure, moderated scholarly discussion groups

## 🛡️ Scholarly Standards (Strict Policy)
1. **Methodology**: Strictly following the Salaf-us-Salih (Ahlus-Sunnah).
2. **Safety**: Zero tolerance for Shirk, Bid'ah, or extremist ideologies.
3. **Verification**: Every module must be cross-referenced against established biographical and textual dictionaries.

## 📂 Project Structure
- `src/app`: Application routes and views.
- `src/ai/flows`: Genkit AI logic (Mualim, Search, Seerah).
- `src/firebase`: Backend synchronization and Auth.
- `src/lib`: Core metadata (Qira'at, Knowledge Hub, Placeholders).
- `src/services`: External API integration layers.
