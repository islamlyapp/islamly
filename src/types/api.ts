// =====================================================
// API Types for Islamly Platform
// Salafi/Athari-Aligned Islamic Learning Platform
// =====================================================

// ==================== API CATEGORY TYPES ====================

/**
 * API Categories for Islamic APIs
 */
export type ApiCategory =
  | 'QURAN'
  | 'HADITH'
  | 'ATHAN'
  | 'QIBLA'
  | 'HIJRI'
  | 'DUA'
  | 'ZAKAT'
  | 'ARABIC';

/**
 * API Source Types
 */
export type ApiSource =
  | 'GITHUB'
  | 'API'
  | 'WEB_SERVICE'
  | 'DATABASE';

/**
 * Authentication Types
 */
export type AuthType =
  | 'NONE'
  | 'API_KEY'
  | 'OAUTH'
  | 'TOKEN'
  | 'BASIC_AUTH';

/**
 * Response Format Types
 */
export type ResponseFormat =
  | 'JSON'
  | 'XML'
  | 'CSV'
  | 'TEXT'
  | 'MULTI';

/**
 * License Types
 */
export type LicenseType =
  | 'OPEN_SOURCE'
  | 'FREE'
  | 'FREEMIUM'
  | 'PAID'
  | 'CONTACT';

// ==================== RELIABILITY SCORE TYPES ====================

/**
 * Reliability Score Interface
 * Scores range from 1-5 for each criterion
 */
export interface ReliabilityScore {
  /** Overall score (1-5) */
  score: number;
  /** Detailed criteria breakdown */
  criteria: {
    /** Scholarly verification of source (1-5) */
    sourceAuthenticity: number;
    /** Accuracy of data provided (1-5) */
    dataAccuracy: number;
    /** Active maintenance and updates (1-5) */
    maintenance: number;
    /** Community trust and usage (1-5) */
    communityTrust: number;
    /** Recognition by scholars (1-5) */
    scholarlyRecognition: number;
  };
}

// ==================== CORE API INTERFACES ====================

/**
 * Core Islamic API Entry Interface
 */
export interface IslamicApiEntry {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Brief description */
  description: string;
  /** API URL or GitHub repository */
  url: string;
  /** Primary category */
  category: ApiCategory;
  /** Sub-category if applicable */
  subCategory?: string;
  /** Source type */
  source: ApiSource;
  /** Authentication requirement */
  authType: AuthType;
  /** Expected response format */
  responseFormat: ResponseFormat;
  /** License type */
  license: LicenseType;
  /** Whether API is currently active */
  isActive: boolean;
  /** Documentation URL */
  documentation?: string;
  /** GitHub repository */
  repository?: string;
  /** Author or maintainer */
  author?: string;
  /** Last update timestamp */
  lastUpdated?: string;
  /** Reliability scoring */
  reliability: ReliabilityScore;
  /** List of features */
  features: string[];
  /** Known limitations */
  limitations?: string[];
  /** Whether aligned with Athari methodology */
  AthariAligned: boolean;
  /** Whether sourced from authentic Islamic sources */
  authenticSource: boolean;
  /** Whether non-sectarian (avoiding Shia/Sufi/Ash'ari bias) */
  nonSectarian: boolean;
  /** Creation timestamp */
  createdAt?: string;
}

// ==================== API ENDPOINT TYPES ====================

/**
 * HTTP Methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * API Endpoint Interface
 */
export interface ApiEndpoint {
  /** Endpoint path */
  path: string;
  /** HTTP method */
  method: HttpMethod;
  /** Description of endpoint */
  description: string;
  /** Parameters */
  parameters?: EndpointParameter[];
  /** Expected response format */
  responseFormat: ResponseFormat;
  /** Whether authentication is required */
  requiresAuth: boolean;
  /** Rate limiting information */
  rateLimit?: string;
  /** Example request and response */
  example?: {
    request?: string;
    response?: string;
  };
}

/**
 * Endpoint Parameter Interface
 */
export interface EndpointParameter {
  /** Parameter name */
  name: string;
  /** Parameter type */
  type: string;
  /** Whether parameter is required */
  required: boolean;
  /** Parameter description */
  description: string;
  /** Default value */
  defaultValue?: string;
  /** Allowed values for enum parameters */
  enumValues?: string[];
}

// ==================== API RESPONSE TYPES ====================

/**
 * Generic API Response Interface
 */
export interface IslamicApiResponse<T> {
  /** Whether request was successful */
  success: boolean;
  /** Response data */
  data: T;
  /** Error information if applicable */
  error?: IslamicApiError;
  /** Pagination and metadata */
  meta?: IslamicResponseMeta;
  /** Response timestamp */
  timestamp: string;
}

/**
 * API Error Interface
 */
export interface IslamicApiError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * Response Metadata Interface
 */
export interface IslamicResponseMeta {
  /** Current page number */
  page?: number;
  /** Items per page */
  limit?: number;
  /** Total items count */
  total?: number;
  /** Total pages */
  totalPages?: number;
  /** Whether next page exists */
  hasNext?: boolean;
  /** Whether previous page exists */
  hasPrev?: boolean;
}

// ==================== COLLECTION TYPES ====================

/**
 * API Collection Interface (Group of related APIs)
 */
export interface ApiCollection {
  /** Unique identifier */
  id: string;
  /** Collection name */
  name: string;
  /** Collection description */
  description: string;
  /** Category */
  category: ApiCategory;
  /** APIs in collection */
  apis: IslamicApiEntry[];
  /** Total APIs count */
  totalApis: number;
  /** Documentation URL */
  documentation?: string;
  /** Use cases */
  useCases: string[];
  /** Whether aligned with Athari methodology */
  AthariAligned: boolean;
}

/**
 * API Registry Interface
 */
export interface ApiRegistry {
  /** Registry version */
  version: string;
  /** Last update timestamp */
  lastUpdated: string;
  /** Total APIs count */
  totalApis: number;
  /** Collections */
  collections: ApiCollection[];
  /** APIs grouped by category */
  byCategory: Record<ApiCategory, IslamicApiEntry[]>;
  /** APIs grouped by source */
  bySource: Record<ApiSource, IslamicApiEntry[]>;
}

// ==================== CATEGORY-SPECIFIC TYPES ====================

/**
 * Prayer Time API Specific Interface
 */
export interface PrayerTimeApi extends IslamicApiEntry {
  /** Available calculation methods */
  methods: string[];
  /** Available juristic methods */
  juristicMethods?: string[];
  /** Available time formats */
  timeFormats?: string[];
}

/**
 * Quran API Specific Interface
 */
export interface QuranApi extends IslamicApiEntry {
  /** Available languages */
  languages: string[];
  /** Number of available recitations */
  recitations: number;
  /** Number of available translations */
  translations: number;
  /** Number of available tafsirs */
  tafsirs: number;
  /** Additional features */
  features: string[];
}

/**
 * Hadith API Specific Interface
 */
export interface HadithApi extends IslamicApiEntry {
  /** Available collections */
  collections: string[];
  /** Available languages */
  languages: string[];
  /** Whether grading system is included */
  hasGrading: boolean;
  /** Whether chain of narration (isnad) is included */
  hasChain: boolean;
}

/**
 * Zakat API Specific Interface
 */
export interface ZakatApi extends IslamicApiEntry {
  /** Available calculation methods */
  calculationMethods: string[];
  /** Supported asset types */
  assets: string[];
  /** Supported deductions */
  deductions: string[];
}

// ==================== SEARCH & FILTER TYPES ====================

/**
 * API Search Parameters
 */
export interface ApiSearchParams {
  /** Search query */
  query?: string;
  /** Filter by category */
  category?: ApiCategory;
  /** Filter by source */
  source?: ApiSource;
  /** Filter by license */
  license?: LicenseType;
  /** Filter by Athari alignment */
  AthariAligned?: boolean;
  /** Minimum reliability score */
  minReliability?: number;
  /** Pagination - page number */
  page?: number;
  /** Pagination - items per page */
  limit?: number;
  /** Sort field */
  sortBy?: 'name' | 'reliability' | 'updated';
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
}

/**
 * API Filter Interface
 */
export interface ApiFilter {
  /** Categories to include */
  categories?: ApiCategory[];
  /** Sources to include */
  sources?: ApiSource[];
  /** Licenses to include */
  licenses?: LicenseType[];
  /** Athari alignment requirement */
  AthariAligned?: boolean;
  /** Authentic source requirement */
  authenticSource?: boolean;
  /** Non-sectarian requirement */
  nonSectarian?: boolean;
  /** Minimum reliability score */
  minReliabilityScore?: number;
}

// ==================== USAGE STATISTICS TYPES ====================

/**
 * API Usage Statistics
 */
export interface ApiUsageStats {
  /** Total calls made */
  totalCalls: number;
  /** Successful calls */
  successfulCalls: number;
  /** Failed calls */
  failedCalls: number;
  /** Average response time (ms) */
  avgResponseTime: number;
  /** Last used timestamp */
  lastUsed?: string;
  /** Cache hit rate */
  cacheHitRate: number;
}

/**
 * API Health Status
 */
export interface ApiHealthStatus {
  /** API ID */
  apiId: string;
  /** Whether API is healthy */
  isHealthy: boolean;
  /** Response time in ms */
  responseTime?: number;
  /** Last check timestamp */
  lastChecked: string;
  /** Error message if not healthy */
  error?: string;
}

// ==================== TYPE EXPORTS ====================
// Note: All types above are already exported via their interface/type declarations
// No additional exports needed here

