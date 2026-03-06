import type { KyInstance } from "ky";

// ============================================================================
// SDK Configuration
// ============================================================================

export interface SpinwheelConfig {
	apiKey: string;
	sandbox?: boolean;
}

// Internal clients passed to API classes
export interface SpinwheelClients {
	client: KyInstance;
	secureClient: KyInstance;
}

// ============================================================================
// Connect API Types
// ============================================================================

export type VerificationType = "SMS" | "PHONE_CALL" | "KYC" | "CREDIT_REPORT";

export interface ConnectPreverifiedPhoneAudit {
	/** The date the user was verified. Formatted as YYYY-MM-DD */
	verificationDate: string;
	/** The date the user consented to verification. Formatted as YYYY-MM-DD */
	userConsentDate: string;
	/** The type of verification performed */
	verificationType: VerificationType;
}

export interface ConnectPreverifiedPhoneInput {
	/** The phone number in E.164 format (e.g., +14155552671) */
	phoneNumber: string;
	/** The date of birth. Formatted as YYYY-MM-DD */
	dateOfBirth: string;
	/** An existing userId to connect with. One of extUserId or userId is required. */
	userId?: string;
	/** A unique external ID for the user. One of extUserId or userId is required. */
	extUserId?: string;
	/** Documentation of your own user verification */
	audit: ConnectPreverifiedPhoneAudit;
}

export interface ConnectNetworkTokenAudit {
	/** The date the user consented to verification. Formatted as YYYY-MM-DD */
	userConsentDate: string;
}

export interface ConnectNetworkTokenInput {
	/** A unique external ID for the user */
	extUserId: string;
	/** Network token */
	networkToken: string;
	/** Last 4 digits of SSN (exactly 4 characters) */
	ssnLastFourDigits: string;
	/** The date of birth. Formatted as YYYY-MM-DD */
	dateOfBirth: string;
	/** Documentation of your own user verification */
	audit: ConnectNetworkTokenAudit;
}

// ============================================================================
// Shared Response Types
// ============================================================================

export type MessageType = "ERROR" | "WARN" | "INFO";

export interface SpinwheelStatusMessage {
	desc: string;
	type?: MessageType;
}

export interface SpinwheelResponseStatus {
	code: number;
	desc: string;
	messages?: SpinwheelStatusMessage[];
}

export interface SpinwheelResponse<T> {
	status: SpinwheelResponseStatus;
	data: T;
}

// ============================================================================
// Shared Enums
// ============================================================================

export type USStateCode =
	| "AL"
	| "AK"
	| "AZ"
	| "AR"
	| "CA"
	| "CO"
	| "CT"
	| "DC"
	| "DE"
	| "FL"
	| "GA"
	| "HI"
	| "ID"
	| "IL"
	| "IN"
	| "IA"
	| "KS"
	| "KY"
	| "LA"
	| "ME"
	| "MD"
	| "MA"
	| "MI"
	| "MN"
	| "MS"
	| "MO"
	| "MT"
	| "NE"
	| "NV"
	| "NH"
	| "NJ"
	| "NM"
	| "NY"
	| "NC"
	| "ND"
	| "OH"
	| "OK"
	| "OR"
	| "PA"
	| "RI"
	| "SC"
	| "SD"
	| "TN"
	| "TX"
	| "UT"
	| "VT"
	| "VA"
	| "WA"
	| "WV"
	| "WI"
	| "WY";

export type CreditBureau = "Equifax" | "Experian" | "TransUnion";
export type CreditReportType = "1_BUREAU.FULL";
export type CreditScoreModel = "VANTAGE_SCORE_3_0";

export type LiabilityStatus = "OPEN" | "CLOSED";
export type DebtType = "SECURED" | "UNSECURED" | "UNKNOWN";
export type AccountType =
	| "CREDIT_LINE"
	| "INSTALLMENT"
	| "MORTGAGE"
	| "OPEN"
	| "REVOLVING"
	| "UNKNOWN";
export type TermsFrequency =
	| "BIWEEKLY"
	| "DEFERRED"
	| "SEMI_MONTHLY"
	| "BI_MONTHLY"
	| "MONTHLY"
	| "SINGLE_PAYMENT_LOAN"
	| "QUARTERLY"
	| "SEMI_ANNUALLY"
	| "TRI_ANNUALLY"
	| "WEEKLY"
	| "ANNUALLY";
export type AccountOwnershipType =
	| "AUTHORIZED_USER"
	| "COMAKER"
	| "INDIVIDUAL"
	| "JOINT_CONTRACTUAL_LIABILITY"
	| "JOINT_PARTICIPATING"
	| "MAKER"
	| "ON_BEHALF_OF"
	| "TERMINATED"
	| "UNDESIGNATED"
	| "DECEASED";
export type EcoaCode = "I" | "J" | "A" | "C" | "M" | "T" | "X";
export type ConsumerDisputeStatus = "DISPUTED" | "NOT_DISPUTED";
export type DerogatoryDataStatus = "DEROGATORY" | "NOT_DEROGATORY";
export type CollectionStatus = "IN_COLLECTION" | "NOT_IN_COLLECTION";
export type ChargeOffStatus = "CHARGED_OFF" | "NOT_CHARGED_OFF";
export type OverduePeriod =
	| "LATE_30_DAYS"
	| "LATE_60_DAYS"
	| "LATE_90_DAYS"
	| "LATE_120_DAYS"
	| "NOT_OVERDUE";
export type AdverseRating =
	| "0"
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "G"
	| "H"
	| "J"
	| "R"
	| "L"
	| "E"
	| "B"
	| "D";
export type InquiryPurposeType = "HARD" | "SOFT" | "OTHER";
export type BankruptcyType = "INDIVIDUAL" | "BUSINESS";
export type BankruptcyFiler = "INDIVIDUAL" | "JOINT";
export type BankruptcyDisposition =
	| "FILED_CH_7"
	| "FILED_CH_11"
	| "FILED_CH_12"
	| "FILED_CH_13"
	| "DISCHARGED_CH_7"
	| "DISCHARGED_CH_11"
	| "DISCHARGED_CH_12"
	| "DISCHARGED_CH_13"
	| "DISMISSED_OR_CLOSED_CH_7"
	| "DISMISSED_OR_CLOSED_CH_11"
	| "DISMISSED_OR_CLOSED_CH_12"
	| "DISMISSED_OR_CLOSED_CH_13"
	| "INVOLUNTARY_CH_7"
	| "VOLUNTARY_CH_7"
	| "WAGE_EARNER";
export type AprType =
	| "PURCHASE"
	| "BALANCE_TRANSFER"
	| "PENALTY"
	| "CASH_ADVANCE"
	| "INTRO";
export type DataStatusType = "IN_PROGRESS" | "COMPLETED" | "ERROR";
export type CapabilityStatus =
	| "SUPPORTED"
	| "NOT_SUPPORTED"
	| "INSTITUTION_NOT_SUPPORTED"
	| "INSTITUTION_DISABLED"
	| "REFRESH_EXHAUSTED"
	| "NOT_PRIMARY_ACCOUNT_HOLDER"
	| "ACCOUNT_TERMINATED"
	| "CLOSED_ACCOUNT_NO_BALANCE"
	| "CLOSED_ACCOUNT"
	| "ACCOUNT_NUMBER_VERIFICATION_FAILED"
	| "FIELD_ERROR";
export type NarrativeCode =
	| "UNPAID"
	| "FINANCIAL_COUNSELOR"
	| "ADJUSTMENT"
	| "WAGE_EARNER"
	| "NEW_LISTING"
	| "PAID"
	| "ACCOUNT_DISPUTED"
	| "PAYMENT"
	| "UNKNOWN"
	| "CHECKED"
	| "IN_BANKRUPTCY";
export type CollectionAccountStatus = NarrativeCode;
export type LimitType = "FLEXIBLE" | "REGULAR";
export type StudentLoanType = "PUBLIC" | "PRIVATE" | "UNVERIFIED";
export type ResidencyType = "CURRENT" | "PREVIOUS";
export type AddressOwnership = "OWN" | "RENT" | "BUY";
export type AddressSource =
	| "EQUIFAX"
	| "TRANSUNION"
	| "OTHER"
	| "AUTOMATED_UPDATE";
export type EmploymentStatusType = "CURRENT" | "PREVIOUS";
export type LiabilityType =
	| "STUDENT_LOAN"
	| "CREDIT_CARD"
	| "HOME_LOAN"
	| "AUTO_LOAN"
	| "PERSONAL_LOAN"
	| "MISCELLANEOUS_LIABILITY";

// ============================================================================
// Shared Structural Types
// ============================================================================

export interface DateWithFormat {
	value: string;
	format: string;
}

export interface SpinwheelAddress {
	addressLine1: string;
	addressLine2?: string;
	city: string;
	state: USStateCode;
	zip: string;
	zipExtension?: string;
}

export interface UserProfile {
	firstName: string;
	middleName?: string;
	lastName: string;
	phoneNumber?: string;
	emailAddress?: string;
	ssnLastFourDigits?: string;
	dob?: string;
	ssn?: string;
	creditScore?: number;
	model?: CreditScoreModel;
	addresses?: SpinwheelAddress[];
}

// ============================================================================
// Liability Summary Types
// ============================================================================

export interface LoanSummary {
	noOfLoans: number;
	currentOutstandingBalance: number;
	minimumPaymentAmount: number;
	interestRate?: number;
	interestRateDerived?: number;
	updatedOn?: number;
	createdOn?: number;
}

export interface CreditCardSummary {
	noOfCreditCards: number;
	currentOutstandingBalance: number;
	availableCredit: number;
	creditUtilization: number;
	updatedOn: number;
}

export interface LiabilityGroupPayoffQuote {
	studentLoanIds: string[];
	liabilityGroupId: string;
	payoffAmount: number;
	payoffGoodThroughDate: string;
	updatedOn: number;
}

export interface StudentLoanSummary extends LoanSummary {
	liabilityGroupPayoffQuotes?: LiabilityGroupPayoffQuote[];
}

// ============================================================================
// Liability Profile Types
// ============================================================================

export interface Narrative {
	code: NarrativeCode;
	description: string;
}

export interface LiabilityTransfers {
	transferredFrom?: { creditorName: string };
	transferredTo?: { creditorName: string };
}

export interface PaymentHistoryDetail {
	date: string;
	description: string;
	code: string;
}

export interface PaymentHistory {
	lastAssessedStatementDate?: string;
	details?: PaymentHistoryDetail[];
}

export interface LiabilityProfile {
	accountOriginationDate?: string;
	status?: LiabilityStatus;
	interestRateDerived?: number;
	loanOriginationAmount?: number;
	highCreditAmount?: number;
	accountRating?: string;
	liabilitySubtype?: string;
	debtType?: DebtType;
	pendingLoanTermInMonthsDerived?: number;
	loanTermInMonths?: number;
	termsFrequency?: TermsFrequency;
	accountOwnershipType?: AccountOwnershipType;
	ecoaCode?: EcoaCode;
	reviewedInMonths?: number;
	accountType?: AccountType;
	consumerDisputeStatus?: ConsumerDisputeStatus;
	derogatoryDataStatus?: DerogatoryDataStatus;
	collectionStatus?: CollectionStatus;
	chargeOffStatus?: ChargeOffStatus;
	chargeOffAmount?: number;
	accountTypeCode?: string;
	accountNumberLastFour?: string;
	adverseRatingCount?: number;
	highestAdverseRating?: AdverseRating;
	mostRecentAdverseRating?: AdverseRating;
	secondMostRecentAdverseRating?: AdverseRating;
	closedDateWithFormat?: DateWithFormat;
	reportedDateWithFormat?: DateWithFormat;
	chargeOffDateWithFormat?: DateWithFormat;
	firstDelinquencyDateWithFormat?: DateWithFormat;
	lastActivityDateWithFormat?: DateWithFormat;
	highestAdverseRatingDateWithFormat?: DateWithFormat;
	mostRecentAdverseRatingDateWithFormat?: DateWithFormat;
	secondMostRecentAdverseRatingDateWithFormat?: DateWithFormat;
	liabilityTransfers?: LiabilityTransfers;
	narratives?: Narrative[];
	paymentHistory?: PaymentHistory;
	loanType?: StudentLoanType;
	collectionAccountStatus?: CollectionAccountStatus;
}

export interface CardProfile extends Omit<LiabilityProfile, "loanTermInMonths"> {
	creditLimit?: number;
	creditUtilization?: number;
	creditCardNumberMasked?: string;
	availableCreditDerived?: number;
	limitType?: LimitType;
}

// ============================================================================
// Balance, Statement & Creditor Types
// ============================================================================

export interface BalanceDetails {
	outstandingBalance: number;
	updatedOn?: number;
}

export interface StatementSummary {
	statementBalance?: number;
	principalBalance?: number;
	minimumPaymentAmount?: number;
	dueDate?: string;
	overduePeriod?: OverduePeriod;
	amountPastDue?: number;
	updatedOn?: number;
	statementDateWithFormat?: DateWithFormat;
	lastPaymentDateWithFormat?: DateWithFormat;
	refreshedFields?: {
		lastPaymentDate?: DateWithFormat & { updatedOn: number };
		dueDay?: DateWithFormat & { updatedOn: number };
		lastPaymentAmount?: { value: number; updatedOn: number };
	};
}

export interface PayoffSummary {
	payoffAmount: number;
	payoffGoodThroughDate: string;
	updatedOn: number;
}

export interface CreditorAddress extends SpinwheelAddress {
	addressType?: ResidencyType;
	reportedDate?: string;
	reportedDateWithFormat?: DateWithFormat;
}

export interface Creditor {
	originalName?: string;
	industryType?: string;
	industryCode?: string;
	phoneNumber?: string;
	bureauSubscriberCode?: string;
	address?: SpinwheelAddress;
	billingAddresses?: CreditorAddress[];
}

// ============================================================================
// Capabilities Types
// ============================================================================

export interface CapabilityAvailability {
	availability: CapabilityStatus;
	description?: string;
	liabilityGroupId?: string;
	fieldErrors?: {
		field: string;
		error: CapabilityStatus;
		description?: string;
	}[];
}

export interface Capabilities {
	payments?: { billPayment?: CapabilityAvailability };
	data?: {
		realtimeBalance?: CapabilityAvailability;
		statementSummary?: CapabilityAvailability;
		payoffSummary?: CapabilityAvailability;
		liabilityGroupPayoffQuote?: CapabilityAvailability;
	};
}

// ============================================================================
// Liability Types
// ============================================================================

interface BaseLiability {
	displayName?: string;
	logoUrl: string;
	balanceDetails: BalanceDetails;
	statementSummary: StatementSummary;
	creditor?: Creditor;
	capabilities: Capabilities;
	updatedOn?: number;
	createdOn?: number;
}

export interface HomeLoan extends BaseLiability {
	homeLoanId: string;
	liabilityProfile: LiabilityProfile;
}

export interface AutoLoan extends BaseLiability {
	autoLoanId: string;
	liabilityProfile: LiabilityProfile;
	payoffSummary?: PayoffSummary;
}

export interface PersonalLoan extends BaseLiability {
	personalLoanId: string;
	liabilityProfile: LiabilityProfile;
}

export interface StudentLoan extends BaseLiability {
	studentLoanId: string;
	liabilityProfile: LiabilityProfile;
}

export interface MiscellaneousLiability extends BaseLiability {
	miscellaneousLiabilityId: string;
	liabilityProfile: LiabilityProfile;
}

export interface Apr {
	rate: number;
	type: AprType;
	applicableBalance?: number;
	expirationDate?: string;
	updatedOn: number;
}

export interface CreditCard extends BaseLiability {
	creditCardId: string;
	cardProfile: CardProfile;
	aprs?: Apr[];
}

// ============================================================================
// Credit Report Types
// ============================================================================

export interface CreditReportAddress extends SpinwheelAddress {
	residencyType?: ResidencyType;
	addressOwnership?: AddressOwnership;
	addressSource?: AddressSource;
	residencyDurationInMonths?: number;
	reportedDate?: string;
	reportedDateWithFormat?: DateWithFormat;
	firstReportedDateWithFormat?: DateWithFormat;
}

export interface FormerName {
	firstName?: string;
	middleName?: string;
	lastName?: string;
}

export interface EmploymentHistory {
	employerName?: string;
	position?: string;
	startDateWithFormat?: DateWithFormat;
	reportedDateWithFormat?: DateWithFormat;
	employmentStatus?: EmploymentStatusType;
}

export interface CreditReportProfile {
	firstName?: string;
	middleName?: string;
	lastName?: string;
	creditScore?: number;
	model?: CreditScoreModel;
	dateOfBirth?: string;
	ssn?: string;
	formerNames?: FormerName[];
	addresses?: CreditReportAddress[];
	employmentHistory?: EmploymentHistory[];
	updatedOn?: number;
	createdOn?: number;
}

export interface Inquiry {
	inquirerName?: string;
	phoneNumber?: string;
	inquiryDate?: string;
	inquirerIndustryCode?: string;
	purposeType?: InquiryPurposeType;
	sourceBureau?: CreditBureau;
	bureauSubscriberCode?: string;
	address?: SpinwheelAddress;
}

export interface BankruptcyCourt {
	industryType?: string;
	industryCode?: string;
	bureauSubscriberCode?: string;
}

export interface Bankruptcy {
	caseNumber?: string;
	type?: BankruptcyType;
	filer?: BankruptcyFiler;
	disposition?: BankruptcyDisposition;
	priorDisposition?: BankruptcyDisposition;
	liabilityAmount?: number;
	assetAmount?: number;
	exemptAmount?: number;
	court?: BankruptcyCourt;
	narratives?: Narrative[];
	filedDateWithFormat?: DateWithFormat;
	dispositionDateWithFormat?: DateWithFormat;
	verifiedDateWithFormat?: DateWithFormat;
	reportedDateWithFormat?: DateWithFormat;
}

export interface CreditScoreFactor {
	code: string;
	description: string;
}

export interface CreditScoreDetail {
	reportedDate?: string;
	creditScore?: number;
	model?: CreditScoreModel;
	sourceBureau?: CreditBureau;
	riskBasedPricingPercentage?: number;
	riskBasedPricingMin?: number;
	riskBasedPricingMax?: number;
	factors?: CreditScoreFactor[];
}

export interface CreditAttribute {
	description: string;
	value: string;
}

export interface CreditReportSummary {
	totalSecuredDebtAmount?: number;
	securedDebtLiabilitiesCount?: number;
	totalUnsecuredDebtAmount?: number;
	unsecuredDebtLiabilitiesCount?: number;
	totalUnsecuredDebtExcludingStudent?: number;
	unsecuredDebtExcludingStudentCount?: number;
	totalUnknownDebtAmount?: number;
	unknownDebtLiabilitiesCount?: number;
}

export interface DataStatus {
	status: DataStatusType;
	updatedOn: number;
}

export interface ConnectionStatus {
	statusCode: number;
	description: string;
	lastAuthAttemptOn?: number;
	isAuthSuccessful?: boolean;
	isValid?: boolean;
	isSecurityStepPending?: boolean;
	lastSuccessfulAuthOn?: number;
	dataStatus?: DataStatus;
}

export interface CreditReport {
	id: string;
	sourceBureau: CreditBureau;
	type: CreditReportType;
	profile?: CreditReportProfile;
	inquiries?: Inquiry[];
	bankruptcies?: Bankruptcy[];
	creditScoreDetails?: CreditScoreDetail[];
	creditAttributes?: CreditAttribute[];
	summary?: CreditReportSummary;
	connectionStatus?: ConnectionStatus;
	updatedOn?: number;
	createdOn?: number;
}

// ============================================================================
// User Data Types
// ============================================================================

export interface UserData {
	userId: string;
	extUserId?: string;
	connectionId?: string;
	connectionStatus?: string;
	networkToken?: string;
	profile?: UserProfile;
}

export interface HydratedUserData {
	userId: string;
	extUserId?: string;
	isBorrower?: boolean;
	isChampion?: boolean;
	networkToken?: string;
	updatedOn: number;
	createdOn: number;
	profile?: UserProfile;
	autoLoanSummary?: LoanSummary;
	homeLoanSummary?: LoanSummary;
	personalLoanSummary?: LoanSummary;
	miscellaneousLiabilitySummary?: LoanSummary;
	creditCardSummary?: CreditCardSummary;
	studentLoanSummary?: StudentLoanSummary;
	creditReports?: CreditReport[];
	homeLoans?: HomeLoan[];
	autoLoans?: AutoLoan[];
	personalLoans?: PersonalLoan[];
	studentLoans?: StudentLoan[];
	miscellaneousLiabilities?: MiscellaneousLiability[];
	creditCards?: CreditCard[];
}

// ============================================================================
// Response Convenience Types
// ============================================================================

export type ConnectPreverifiedPhoneResponse = SpinwheelResponse<UserData>;
export type ConnectNetworkTokenResponse = SpinwheelResponse<UserData>;
export type GetUserResponse = SpinwheelResponse<HydratedUserData>;

// ============================================================================
// Debt Profile API Types
// ============================================================================

export interface FetchDebtProfileOptions {
	/** Filter by liability type */
	liabilityType?: LiabilityType;
	/** Credit report configuration */
	creditReport?: {
		/** Credit bureau source. Defaults to bureau configured during onboarding. */
		sourceBureau?: CreditBureau;
		/** Type of credit report requested */
		type: CreditReportType;
	};
	/** Credit score configuration */
	creditScore?: {
		/** Credit bureau source. Defaults to bureau configured during onboarding. */
		sourceBureau?: CreditBureau;
		/** Scoring model to use */
		model: CreditScoreModel;
	};
}
