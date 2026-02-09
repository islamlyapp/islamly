// Core Types for Islamly Application
// Salafi/Athari Aligned Islamic Learning Platform

// ==================== USER TYPES ====================

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phone?: string;
  country?: string;
  city?: string;
  timezone?: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'USER',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  SCHOLAR = 'SCHOLAR',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

export interface UserProfile {
  userId: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  occupation?: string;
  education?: string;
  specialization?: string;
  ijazah?: string;
  about?: string;
  website?: string;
  socialLinks?: SocialLinks;
  preferences: UserPreferences;
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  soundcloud?: string;
  website?: string;
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
  learning: LearningPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  prayerReminders: boolean;
  dailyVerse: boolean;
  weeklyDigest: boolean;
  newContent: boolean;
  communityUpdates: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: 'public' | 'private' | 'friends';
  showOnlineStatus: boolean;
  allowMessages: 'everyone' | 'friends' | 'none';
  showProgress: boolean;
  showAchievements: boolean;
}

export interface LearningPreferences {
  dailyGoal: number;
  reminderTime?: string;
  preferredReciter?: string;
  preferredTranslation?: string;
  tajweedEnabled: boolean;
  arabicKeyboard: boolean;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  streak: number;
  longestStreak: number;
  totalStudyHours: number;
  totalLessonsCompleted: number;
  totalQuizzesCompleted: number;
  totalAchievedments: number;
  totalFollowers: number;
  totalFollowing: number;
}

// ==================== QURAN TYPES ====================

export interface Quran {
  id: string;
  surahs: Surah[];
  totalSurahs: number;
  totalAyahs: number;
  revelationType: RevelationType;
  createdAt: Date;
}

export interface Surah {
  id: number;
  number: number;
  name: string;
  arabicName: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: RevelationType;
  numberOfAyahs: number;
  placeOfRevelation: string;
  ayahs: Ayah[];
  bismillahPre: boolean;
  startPage: number;
  endPage: number;
}

export enum RevelationType {
  MAKKI = 'MAKKI',
  MADANI = 'MADANI',
}

export interface Ayah {
  id: string;
  surahId: number;
  number: number;
  numberInSurah: number;
  text: string;
  textIndopak?: string;
  audioUrl?: string;
  audioSecondary?: string[];
  page: number;
  juz: number;
  hizbQuarter: number;
  rubElHizb: number;
  sajdah?: SajdahType;
  translations?: Translation[];
  tafsirs?: Tafsir[];
}

export enum SajdahType {
  WAJIB = 'WAJIB',
  SUNNAH = 'SUNNAH',
}

export interface Translation {
  id: string;
  ayahId: string;
  language: string;
  translator: string;
  text: string;
  source?: string;
}

export interface Tafsir {
  id: string;
  ayahId: string;
  source: string;
  author: string;
  text: string;
  category?: TafsirCategory;
}

export enum TafsirCategory {
  LINGUISTIC = 'LINGUISTIC',
  HISTORICAL = 'HISTORICAL',
  LEGAL = 'LEGAL',
  CREED = 'CREED',
  SPIRITUAL = 'SPIRITUAL',
}

// ==================== HADITH TYPES ====================

export interface HadithCollection {
  id: string;
  name: string;
  arabicName: string;
  englishName: string;
  author: string;
  description?: string;
  numberOfHadiths: number;
  chapters: HadithChapter[];
  createdAt: Date;
}

export interface HadithChapter {
  id: string;
  collectionId: string;
  number: number;
  title: string;
  arabicTitle?: string;
  hadiths: Hadith[];
}

export interface Hadith {
  id: string;
  collectionId: string;
  chapterId: string;
  number: number;
  arabicText: string;
  englishText?: string;
  urduText?: string;
  heading?: string;
  grading: HadithGrading;
  grades?: HadithGrade[];
  explanation?: string;
  tags?: string[];
  topics?: string[];
  references?: HadithReference[];
  isnad?: Isnad[];
  createdAt: Date;
}

export enum HadithGrading {
  SAHIH = 'SAHIH',
  HASAN = 'HASAN',
  DAIF = 'DAIF',
  MAWDU = 'MAWDU',
  MUNKAR = 'MUNKAR',
  MUDALLAS = 'MUDALLAS',
  MURSAL = 'MURSAL',
  MU'DAL = 'MU_DAL',
  MUNQATI = 'MUNQATI',
  SHADH = 'SHADH',
  MAQLUB = 'MAQLUB',
  MUDRAJ = 'MUDRAJ',
  MU'ALLAQ = 'MU_ALLAQ',
  UNKNOWN = 'UNKNOWN',
}

export interface HadithGrade {
  scholar: string;
  grade: HadithGrading;
  notes?: string;
}

export interface HadithReference {
  collectionId: string;
  hadithNumber: string;
  page?: number;
  volume?: number;
}

export interface Isnad {
  narrator: string;
  rank?: NarratorRank;
  reliability?: NarratorReliability;
  deathYear?: number;
  birthYear?: number;
  birthplace?: string;
  category?: string;
}

export enum NarratorRank {
  TRUSTWORTHY = 'TRUSTWORTHY',
  ACCEPTABLE = 'ACCEPTABLE',
  WEAK = 'WEAK',
  LIAR = 'LIAR',
  UNKNOWN = 'UNKNOWN',
}

export enum NarratorReliability {
  THIQA = 'THIQA',
  THIQA_TAB = 'THIQA_TAB',
  SIDDIQ = 'SIDDIQ',
  DABT = 'DABT',
  MATRUK = 'MATRUK',
  KADHAB = 'KADHAB',
  MATNUK = 'MATNUK',
}

// ==================== FIQH TYPES ====================

export interface FiqhRuling {
  id: string;
  topic: string;
  category: FiqhCategory;
  subCategory?: string;
  ruling: RulingType;
  evidence?: Evidence[];
  explanation?: string;
  conditions?: string[];
  requirements?: string[];
  invalidators?: string[];
  notes?: string;
  madhhab?: Madhhab;
  scholar?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum FiqhCategory {
  TAHARAH = 'TAHARAH',
  SALAH = 'SALAH',
  ZAKAT = 'ZAKAT',
  SAWM = 'SAWM',
  HAJJ = 'HAJJ',
  UMRAH = 'UMRAH',
  NIKAH = 'NIKAH',
  TALAQ = 'TALAQ',
  TRADE = 'TRADE',
  FOOD = 'FOOD',
  DRESS = 'DRESS',
  ETIQUETTE = 'ETIQUETTE',
  FAMILY = 'FAMILY',
  INHERITANCE = 'INHERITANCE',
  WILLS = 'WILLS',
  JUDGMENTS = 'JUDGMENTS',
  OATHS = 'OATHS',
  VOWS = 'VOWS',
  ZIHAR = 'ZIHAR',
  LI'AN = 'LI_AN',
  SURRENDER = 'SURRENDER',
  PRISONER = 'PRISONER',
  KILLING = 'KILLING',
  THEFT = 'THEFT',
  DRINKING = 'DRINKING',
  FORNICATION = 'FORNICATION',
  ACCUSATION = 'ACCUSATION',
  THEFT = 'THEFT',
  ROBBERY = 'ROBBERY',
  BOUNDARY = 'BOUNDARY',
  EVIDENCE = 'EVIDENCE',
  JUDGMENT = 'JUDGMENT',
}

export enum RulingType {
  WAJIB = 'WAJIB',
  SUNNAH = 'SUNNAH',
  MUBAH = 'MUBAH',
  MAKRUH = 'MAKRUH',
  HARAM = 'HARAM',
  FARD = 'FARD',
  NAFL = 'NAFL',
  MANDUB = 'MANDUB',
  TAHRIM = 'TAHRIM',
}

export enum Madhhab {
  HANBALI = 'HANBALI',
  HANAFI = 'HANAFI',
  MALIKI = 'MALIKI',
  SHAFI = 'SHAFI',
  SALAFI = 'SALAFI',
}

export interface Evidence {
  type: EvidenceType;
  reference: string;
  text: string;
  explanation?: string;
  authenticity?: string;
}

export enum EvidenceType {
  QURAN = 'QURAN',
  HADITH = 'HADITH',
  IJMA = 'IJMA',
  QIYAS = 'QIYAS',
  ATHAR = 'ATHAR',
  STATEMENT_OF_SAHHAB = 'STATEMENT_OF_SAHHAB',
  STATEMENT_OF_TABIIN = 'STATEMENT_OF_TABIIN',
}

// ==================== AQEEDAH TYPES ====================

export interface Aqeedah {
  id: string;
  name: string;
  category: AqeedahCategory;
  description: string;
  definition?: string;
  proofs?: Evidence[];
  evidences?: AqeedahEvidence[];
  subTopics?: Aqeedah[];
  relatedTopics?: string[];
  scholar?: string;
  source?: string;
  createdAt: Date;
}

export enum AqeedahCategory {
  TAWHEED_RUBUBIYYAH = 'TAWHEED_RUBUBIYYAH',
  TAWHEED_ULUHIYYAH = 'TAWHEED_ULUHIYYAH',
  TAWHEED_ASMA_WA_SIFAT = 'TAWHEED_ASMA_WA_SIFAT',
  BELIEF_IN_ALLAH = 'BELIEF_IN_ALLAH',
  BELIEF_IN_ANGELS = 'BELIEF_IN_ANGELS',
  BELIEF_IN_BOOKS = 'BELIEF_IN_BOOKS',
  BELIEF_IN_PROPHETS = 'BELIEF_IN_PROPHETS',
  BELIEF_IN_LAST_DAY = 'BELIEF_IN_LAST_DAY',
  BELIEF_IN_QADAR = 'BELIEF_IN_QADAR',
  BELIEF_IN_PARADISE = 'BELIEF_IN_PARADISE',
  BELIEF_IN_HELL = 'BELIEF_IN_HELL',
  BELIEF_IN_INTERCESSION = 'BELIEF_IN_INTERCESSION',
  BELIEF_IN_MIRAJ = 'BELIEF_IN_MIRAJ',
  BELIEF_IN_QIYAMAH = 'BELIEF_IN_QIYAMAH',
  BELIEF_IN_HASHIR = 'BELIEF_IN_HASHIR',
  BELIEF_IN_NABUWWAH = 'BELIEF_IN_NABUWWAH',
  BELIEF_IN_WILAYAH = 'BELIEF_IN_WILAYAH',
  EMIGRATION = 'EMIGRATION',
  JIHAD = 'JIHAD',
  COMMANDING_RIGHT = 'COMMANDING_RIGHT',
  FORBIDDING_WRONG = 'FORBIDDING_WRONG',
  LOYALTY_AND_DISSOCIATION = 'LOYALTY_AND_DISSOCIATION',
  LISTENING_TO_RULERS = 'LISTENING_TO_RULERS',
  JOINING_AHL_AL-SUNNAH = 'JOINING_AHL_AL-SUNNAH',
}

export interface AqeedahEvidence {
  type: EvidenceType;
  reference: string;
  text: string;
  explanation?: string;
}

// ==================== LEARNING TYPES ====================

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  category: CourseCategory;
  subCategory?: string;
  level: CourseLevel;
  thumbnail?: string;
  trailer?: string;
  duration: number;
  totalLessons: number;
  prerequisites?: string[];
  learningObjectives?: string[];
  instructor: Instructor;
  modules: CourseModule[];
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  price?: number;
  currency?: string;
  status: CourseStatus;
  language: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum CourseCategory {
  QURAN = 'QURAN',
  HADITH = 'HADITH',
  FIQH = 'FIQH',
  AQEEDAH = 'AQEEDAH',
  TAFSIR = 'TAFSIR',
  SEERAH = 'SEERAH',
  ARABIC = 'ARABIC',
  TAJWEED = 'TAJWEED',
  DUA = 'DUA',
  ETHICS = 'ETHICS',
  Dawah = 'Dawah',
  FIQH_OF_WORSHIP = 'FIQH_OF_WORSHIP',
  FIQH_OF_FAMILY = 'FIQH_OF_FAMILY',
  FIQH_OF_TRANSACTIONS = 'FIQH_OF_TRANSACTIONS',
  ISLAMIC_HISTORY = 'ISLAMIC_HISTORY',
  ISLAMIC_CIVILIZATION = 'ISLAMIC_CIVILIZATION',
  COMPARATIVE_RELIGION = 'COMPARATIVE_RELIGION',
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  SCHOLAR = 'SCHOLAR',
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export interface Instructor {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  avatar?: string;
  specialization?: string[];
  qualification?: string[];
  ijazah?: string;
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

export interface CourseModule {
  id: string;
  courseId: string;
  number: number;
  title: string;
  description?: string;
  lessons: Lesson[];
  duration: number;
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  number: number;
  title: string;
  description?: string;
  type: LessonType;
  content: LessonContent;
  duration: number;
  order: number;
  isPreview: boolean;
}

export enum LessonType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  TEXT = 'TEXT',
  QUIZ = 'QUIZ',
  INTERACTIVE = 'INTERACTIVE',
  DOCUMENT = 'DOCUMENT',
  LIVE_SESSION = 'LIVE_SESSION',
}

export interface LessonContent {
  videoUrl?: string;
  audioUrl?: string;
  text?: string;
  htmlContent?: string;
  attachments?: Attachment[];
  resources?: Resource[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: ResourceType;
  url: string;
}

export enum ResourceType {
  PDF = 'PDF',
  DOCUMENT = 'DOCUMENT',
  SPREADSHEET = 'SPREADSHEET',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  LINK = 'LINK',
}

// ==================== ASSESSMENT TYPES ====================

export interface Quiz {
  id: string;
  courseId?: string;
  lessonId?: string;
  title: string;
  description?: string;
  type: QuizType;
  questions: Question[];
  totalPoints: number;
  passingScore: number;
  timeLimit?: number;
  attempts: number;
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
  showCorrectAnswers: boolean;
  createdAt: Date;
}

export enum QuizType {
  PRACTICE = 'PRACTICE',
  UNIT = 'UNIT',
  FINAL = 'FINAL',
  DIAGNOSTIC = 'DIAGNOSTIC',
  CUSTOM = 'CUSTOM',
}

export interface Question {
  id: string;
  quizId: string;
  number: number;
  type: QuestionType;
  text: string;
  explanation?: string;
  points: number;
  options?: QuestionOption[];
  correctAnswer?: string | string[];
  matchedWords?: string[];
  correctOptionIds?: string[];
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  MULTIPLE_SELECT = 'MULTIPLE_SELECT',
  FILL_BLANK = 'FILL_BLANK',
  SHORT_ANSWER = 'SHORT_ANSWER',
  MATCHING = 'MATCHING',
  ORDERING = 'ORDERING',
  ESSAY = 'ESSAY',
  PRONUNCIATION = 'PRONUNCIATION',
  RECITATION = 'RECITATION',
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// ==================== COMMUNITY TYPES ====================

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: User;
  category: DiscussionCategory;
  tags?: string[];
  isPinned: boolean;
  isLocked: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  lastActivityAt: Date;
  createdAt: Date;
}

export enum DiscussionCategory {
  GENERAL = 'GENERAL',
  QURAN = 'QURAN',
  HADITH = 'HADITH',
  FIQH = 'FIQH',
  AQEEDAH = 'AQEEDAH',
  DUA = 'DUA',
  SEERAH = 'SEERAH',
  ARABIC = 'ARABIC',
  ISLAMIC_NEWS = 'ISLAMIC_NEWS',
  DAWAH = 'DAWAH',
  SISTERS_ONLY = 'SISTERS_ONLY',
  BROTHERS_ONLY = 'BROTHERS_ONLY',
}

export interface Comment {
  id: string;
  discussionId: string;
  parentId?: string;
  author: User;
  content: string;
  likeCount: number;
  replyCount: number;
  isAccepted: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyCircle {
  id: string;
  name: string;
  description: string;
  topic: string;
  schedule: StudyCircleSchedule;
  organizer: User;
  members: StudyCircleMember[];
  maxMembers?: number;
  isPublic: boolean;
  language: string;
  status: StudyCircleStatus;
  currentProgress?: string;
  nextMeeting?: Date;
  createdAt: Date;
}

export interface StudyCircleSchedule {
  dayOfWeek: number;
  time: string;
  timezone: string;
  duration: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
}

export interface StudyCircleMember {
  userId: string;
  role: StudyCircleRole;
  joinedAt: Date;
}

export enum StudyCircleRole {
  ORGANIZER = 'ORGANIZER',
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}

export enum StudyCircleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  COMPLETED = 'COMPLETED',
  SCHEDULED = 'SCHEDULED',
}

// ==================== SPIRITUAL TYPES ====================

export interface Dua {
  id: string;
  arabicText: string;
  transliteration?: string;
  translation?: string;
  source?: string;
  category: DuaCategory;
  subCategory?: string;
  occasions?: string[];
  benefits?: string[];
  recurring?: boolean;
  recommendedTimes?: string[];
}

export enum DuaCategory {
  MORNING_EVENING = 'MORNING_EVENING',
  PRAYER = 'PRAYER',
  FORGIVENESS = 'FORGIVENESS',
  PROVISION = 'PROVISION',
  HEALTH = 'HEALTH',
  PROTECTION = 'PROTECTION',
  GUIDANCE = 'GUIDANCE',
  GRATITUDE = 'GRATITUDE',
  PATIENCE = 'PATIENCE',
  REPENTANCE = 'REPENTANCE',
  HAJJ = 'HAJJ',
  UMRAH = 'UMRAH',
  TRAVEL = 'TRAVEL',
  FAMILY = 'FAMILY',
  BUSINESS = 'BUSINESS',
  STUDY = 'STUDY',
  GENERAL = 'GENERAL',
}

export interface Adhkar {
  id: string;
  arabicText: string;
  transliteration?: string;
  translation?: string;
  source?: string;
  category: AdhkarCategory;
  count?: number;
  virtue?: string;
  time?: string;
  conditions?: string[];
}

export enum AdhkarCategory {
  MORNING = 'MORNING',
  EVENING = 'EVENING',
  AFTER_PRAYER = 'AFTER_PRAYER',
  SLEEPING = 'SLEEPING',
  WAKING = 'WAKING',
  ENTERING_HOME = 'ENTERING_HOME',
  LEAVING_HOME = 'LEAVING_HOME',
  EATING = 'EATING',
  DRINKING = 'DRINKING',
  TOILET = 'TOILET',
  DRESSING = 'DRESSING',
  TRAVEL = 'TRAVEL',
  THUNDER = 'THUNDER',
  SNEEZING = 'SNEEZING',
  FREEDOM_FROM_SHIRK = 'FREEDOM_FROM_SHIRK',
}

export interface PrayerReminder {
  id: string;
  userId: string;
  prayerType: PrayerType;
  reminderTime: string;
  isEnabled: boolean;
  notificationType: 'azan' | 'notification' | 'both';
}

export enum PrayerType {
  FAJR = 'FAJR',
  SUNRISE = 'SUNRISE',
  DHUHR = 'DHUHR',
  ASR = 'ASR',
  MAGHRIB = 'MAGHRIB',
  ISHA = 'ISHA',
  JUMUAH = 'JUMUAH',
}

// ==================== CALENDAR TYPES ====================

export interface IslamicDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  hijri: string;
  gregorian: string;
  isRamadan: boolean;
  isEid: boolean;
  events?: IslamicEvent[];
}

export interface IslamicEvent {
  id: string;
  name: string;
  nameAr: string;
  type: EventType;
  date: IslamicDate;
  description?: string;
  ruling?: string;
  practices?: string[];
  warnings?: string[];
}

export enum EventType {
  EID = 'EID',
  RAMADAN = 'RAMADAN',
  HAJJ = 'HAJJ',
  UMRAH = 'UMRAH',
  ASHURA = 'ASHURA',
  ISRA_MIRAJ = 'ISRA_MIRAJ',
  MAWLID = 'MAWLID',
  PROPHET_BIRTHDAY = 'PROPHET_BIRTHDAY',
  BATTLE = 'BATTLE',
  CONQUEST = 'CONQUEST',
  REVELATION = 'REVELATION',
  OTHER = 'OTHER',
}

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Jummah?: string;
  date: string;
  location: PrayerLocation;
}

export interface PrayerLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  timezone: string;
}

// ==================== PROGRESS TYPES ====================

export interface LearningProgress {
  id: string;
  userId: string;
  courseId: string;
  currentLessonId?: string;
  completedLessons: string[];
  progressPercentage: number;
  startedAt: Date;
  lastActivityAt: Date;
  completedAt?: Date;
  quizScores?: QuizScore[];
  timeSpent: number;
}

export interface QuizScore {
  quizId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  attempts: number;
  passed: boolean;
  completedAt: Date;
  timeSpent: number;
}

export interface MemorizationProgress {
  id: string;
  userId: string;
  surahId: number;
  ayahStart: number;
  ayahEnd: number;
  memorizationLevel: MemorizationLevel;
  reviewDate?: Date;
  lastReviewedAt?: Date;
  accuracy: number;
  repetitions: number;
}

export enum MemorizationLevel {
  NEW = 'NEW',
  LEARNING = 'LEARNING',
  REVIEWING = 'REVIEWING',
  MASTERED = 'MASTERED',
}

export interface Streak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  lastActivityDate: Date;
  milestones: StreakMilestone[];
}

export interface StreakMilestone {
  days: number;
  achievedAt: Date;
  reward?: string;
}

// ==================== AI TYPES ====================

export interface AIPersona {
  id: string;
  name: string;
  description: string;
  role: AIPersonaRole;
  personality: string;
  knowledgeBase: string[];
  systemPrompt: string;
  avatar?: string;
  capabilities: string[];
  limitations: string[];
  createdAt: Date;
}

export enum AIPersonaRole {
  TUTOR = 'TUTOR',
  SCHOLAR = 'SCHOLAR',
  COUNSELOR = 'COUNSELOR',
  RECITER = 'RECITER',
  MOTIVATOR = 'MOTIVATOR',
  HISTORIAN = 'HISTORIAN',
  LINGUIST = 'LINGUIST',
}

export interface AIConversation {
  id: string;
  userId: string;
  personaId: string;
  messages: AIMessage[];
  context?: AIContext;
  startedAt: Date;
  endedAt?: Date;
}

export interface AIMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: AIFeedback;
}

export interface AIFeedback {
  helpful: boolean;
  accurate: boolean;
  appropriate: boolean;
  comments?: string;
}

export interface AIContext {
  currentLesson?: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  language?: string;
  preferences?: Record<string, unknown>;
}

// ==================== NOTIFICATION TYPES ====================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

export enum NotificationType {
  SYSTEM = 'SYSTEM',
  ACHIEVEMENT = 'ACHIEVEMENT',
  REMINDER = 'REMINDER',
  COURSE_UPDATE = 'COURSE_UPDATE',
  DISCUSSION_REPLY = 'DISCUSSION_REPLY',
  STUDY_CIRCLE = 'STUDY_CIRCLE',
  PRAYER_TIME = 'PRAYER_TIME',
  DAILY_VERSE = 'DAILY_VERSE',
  RAMADAN = 'RAMADAN',
  EID = 'EID',
  COMMUNITY = 'COMMUNITY',
  MARKETPLACE = 'MARKETPLACE',
}

// ==================== ACHIEVEMENT TYPES ====================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  tier: AchievementTier;
  criteria: AchievementCriteria;
  points: number;
  isSecret: boolean;
  createdAt: Date;
}

export enum AchievementCategory {
  QURAN = 'QURAN',
  HADITH = 'HADITH',
  FIQH = 'FIQH',
  AQEEDAH = 'AQEEDAH',
  STUDY = 'STUDY',
  STREAK = 'STREAK',
  COMMUNITY = 'COMMUNITY',
  SPECIAL = 'SPECIAL',
}

export enum AchievementTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
  LEGENDARY = 'LEGENDARY',
}

export interface AchievementCriteria {
  type: string;
  target: number;
  current?: number;
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'allTime';
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  progress: number;
  completed: boolean;
  completedAt?: Date;
  earnedPoints: number;
}

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  validationErrors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

// ==================== PAGINATION TYPES ====================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ==================== SEARCH TYPES ====================

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  relevance: number;
  highlights?: string[];
}

export enum SearchResultType {
  QURAN = 'QURAN',
  HADITH = 'HADITH',
  FIQH = 'FIQH',
  AQEEDAH = 'AQEEDAH',
  COURSE = 'COURSE',
  DISCUSSION = 'DISCUSSION',
  USER = 'USER',
  SCHOLAR = 'SCHOLAR',
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DUA = 'DUA',
  ADHKAR = 'ADHKAR',
}

export interface SearchParams {
  query: string;
  type?: SearchResultType[];
  filters?: Record<string, unknown>;
  page?: number;
  limit?: number;
}

// Export all types from index.ts
export type {
  User,
  UserProfile,
  UserPreferences,
  UserStats,
  Quran,
  Surah,
  Ayah,
  Translation,
  Tafsir,
  HadithCollection,
  HadithChapter,
  Hadith,
  HadithGrade,
  FiqhRuling,
  Aqeedah,
  Course,
  CourseModule,
  Lesson,
  Quiz,
  Question,
  Discussion,
  Comment,
  StudyCircle,
  StudyCircleMember,
  Dua,
  Adhkar,
  PrayerReminder,
  IslamicDate,
  IslamicEvent,
  PrayerTimes,
  LearningProgress,
  QuizScore,
  MemorizationProgress,
  Streak,
  AIPersona,
  AIConversation,
  AIContext,
  Notification,
  Achievement,
  UserAchievement,
  SearchResult,
  SearchParams,
};

// =====================================================
// API Types for Islamly Platform
// Salafi/Athari-Aligned Islamic Learning Platform
// =====================================================

// API Category Types
export type ApiCategory = 
  | 'QURAN'
  | 'HADITH'
  | 'ATHAN'
  | 'QIBLA'
  | 'HIJRI'
  | 'DUA'
  | 'ZAKAT'
  | 'ARABIC';

// API Source Types
export type ApiSource = 
  | 'GITHUB'
  | 'API'
  | 'WEB_SERVICE'
  | 'DATABASE';

// Authentication Types
export type AuthType = 
  | 'NONE'
  | 'API_KEY'
  | 'OAUTH'
  | 'TOKEN'
  | 'BASIC_AUTH';

// Response Format Types
export type ResponseFormat = 
  | 'JSON'
  | 'XML'
  | 'CSV'
  | 'TEXT'
  | 'MULTI';

// License Types
export type LicenseType = 
  | 'OPEN_SOURCE'
  | 'FREE'
  | 'FREEMIUM'
  | 'PAID'
  | 'CONTACT';

// Core API Interface
export interface IslamicApiEntry {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ApiCategory;
  subCategory?: string;
  source: ApiSource;
  authType: AuthType;
  responseFormat: ResponseFormat;
  license: LicenseType;
  isActive: boolean;
  documentation?: string;
  repository?: string;
  author?: string;
  lastUpdated?: string;
  reliability: ReliabilityScore;
  features: string[];
  limitations?: string[];
  AthariAligned: boolean;
  authenticSource: boolean;
  nonSectarian: boolean;
  createdAt?: string;
}

// Reliability Score (1-5)
export interface ReliabilityScore {
  score: number; // 1-5
  criteria: {
    sourceAuthenticity: number; // 1-5
    dataAccuracy: number; // 1-5
    maintenance: number; // 1-5
    communityTrust: number; // 1-5
    scholarlyRecognition: number; // 1-5
  };
}

// API Response Interface for Islamic APIs
export interface IslamicApiResponse<T> {
  success: boolean;
  data: T;
  error?: IslamicApiError;
  meta?: IslamicResponseMeta;
  timestamp: string;
}

// API Error Interface
export interface IslamicApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Response Meta Interface
export interface IslamicResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

// API Endpoint Interface
export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  parameters?: EndpointParameter[];
  responseFormat: ResponseFormat;
  requiresAuth: boolean;
  rateLimit?: string;
  example?: {
    request?: string;
    response?: string;
  };
}

// Endpoint Parameter Interface
export interface EndpointParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
  enumValues?: string[];
}

// API Collection Interface (Group of related APIs)
export interface ApiCollection {
  id: string;
  name: string;
  description: string;
  category: ApiCategory;
  apis: IslamicApiEntry[];
  totalApis: number;
  documentation?: string;
  useCases: string[];
  AthariAligned: boolean;
}

// API Registry Interface
export interface ApiRegistry {
  version: string;
  lastUpdated: string;
  totalApis: number;
  collections: ApiCollection[];
  byCategory: Record<ApiCategory, IslamicApiEntry[]>;
  bySource: Record<ApiSource, IslamicApiEntry[]>;
}

// Prayer Time Specific Types
export interface PrayerTimeApi extends IslamicApiEntry {
  methods: string[];
  juristicMethods?: string[];
  timeFormats?: string[];
}

// Quran Specific Types
export interface QuranApi extends IslamicApiEntry {
  languages: string[];
  recitations: number;
  translations: number;
  tafsirs: number;
  features: string[];
}

// Hadith Specific Types
export interface HadithApi extends IslamicApiEntry {
  collections: string[];
  languages: string[];
  hasGrading: boolean;
  hasChain: boolean;
}

// Zakat Specific Types
export interface ZakatApi extends IslamicApiEntry {
  calculationMethods: string[];
  assets: string[];
  deductions: string[];
}

// Search Types
export interface ApiSearchParams {
  query?: string;
  category?: ApiCategory;
  source?: ApiSource;
  license?: LicenseType;
  AthariAligned?: boolean;
  minReliability?: number;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'reliability' | 'updated';
  sortOrder?: 'asc' | 'desc';
}

// Filter Types
export interface ApiFilter {
  categories?: ApiCategory[];
  sources?: ApiSource[];
  licenses?: LicenseType[];
  AthariAligned?: boolean;
  authenticSource?: boolean;
  nonSectarian?: boolean;
  minReliabilityScore?: number;
}
