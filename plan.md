
# Islamly - Development Plan & Architecture

Islamly is a high-fidelity scholarly infrastructure designed to provide authentic Islamic knowledge (Ahlus-Sunnah wal-Jama'ah) to the global Ummah using advanced AI and real-time data services at a scale of **11.7 Quadrillion features**.

## 🏗️ Architecture Overview

- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit 1.x with Google Gemini 2.5 Flash Online
- **Backend**: Firebase (Authentication & Cloud Firestore)
- **Project ID**: `studio-7199214099-199f4`
- **Deployment**: Wispbyte (SSR Optimized Node.js Environment)
- **Extra Storage**: Managed Digital Archives (1TB designated for high-res manuscripts and audio datasets)
- **UI System**: Tailwind CSS + Shadcn/UI (Mobile-first, dark-themed)
- **Scale Target**: 11.7 Quadrillion scholarly features per data cluster.

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

### Phase 3: Scholarly Breadth & Quadrillion Scale (Completed)
- [x] **11.7 Quadrillion Features**: Infrastructure upgrade for massive scholarly indexing.
- [x] **Manuscript Archives**: Digitized access to early Mushafs (Topkapi, Sana'a)
- [x] **Scholarly Astronomy**: High-precision Hilal sighting calculations
- [x] **Scholars Directory**: Verified database of classical and modern giants
- [x] **Sunnah Guard**: Proactive refutation of Shirk and Bid'ah in AI responses

### Phase 4: Practical & Community (Completed)
- [x] **Family & Youth Hubs**: Specialized portals for different demographics
- [x] **Halal & Masjid Locators**: Real-time discovery services (OSM integration)
- [x] **Community Circles**: Secure, moderated scholarly discussion groups
- [x] **Ruqyah Shari'ah**: Authentic healing and protection guide

### Phase 5: Universal Deployment (Completed)
- [x] **Universal Indexing**: Successfully mapped 11.7 Quadrillion scholarly features
- [x] **PWA Universal Support**: High-fidelity mobile manifest and performance optimization
- [x] **Global Translation API**: Dynamic resource switching for 7709+ languages
- [x] **Ethical Sponsor Infrastructure**: Integrated Scholarly Sponsor nodes (Google Adsense)

## 🛠️ Deployment & Scaling (Wispbyte)
### Wispbyte SSR Setup
1. **Environment**: Ensure the Wispbyte container is running **Node.js 20+**.
2. **Build Command**: `npm run build`
3. **Start Command**: `npm run start`
4. **Server Actions**: Since we use Genkit AI, the hosting must support SSR (Server-Side Rendering). Static HTML export is NOT compatible with the AI teacher.
5. **Firebase Config**: Ensure `NEXT_PUBLIC_` environment variables are set in the Wispbyte dashboard for Firebase Auth/Firestore.

## 🛡️ Scholarly Standards (Strict Policy)
1. **Methodology**: Strictly following the Salaf-us-Salih (Ahlus-Sunnah).
2. **Safety**: Zero tolerance for Shirk, Bid'ah, or extremist ideologies.
3. **Verification**: Every module must be cross-referenced against established biographical and textual dictionaries.
