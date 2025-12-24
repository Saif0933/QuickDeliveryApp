
// vendor.types.ts

export enum VendorStatus {
  NEW = "NEW", // when created
  PROFILE_COMPLETION_NOT_FILLED = "PROFILE_COMPLETION_NOT_FILLED", // profile not filled
  DOCUMENTS_NOT_VERIFIED = "DOCUMENTS_NOT_VERIFIED", // profile filled, docs not verified
  SHOP_DETAILS_NOT_FILLED = "SHOP_DETAILS_NOT_FILLED", // docs verified
  SHOP_IMAGES_NOT_UPLOADED = "SHOP_IMAGES_NOT_UPLOADED", // shop details filled
  PENDING = "PENDING", // shop images uploaded, waiting for approval
  APPROVED = "APPROVED", // vendor is approved
  REJECTED = "REJECTED", // admin rejected
  BLOCKED = "BLOCKED", // admin blocked
}


// ---------------------
// NESTED RELATIONS
// ---------------------

export interface VendorDocument {
  id: bigint;
  vendorId: bigint;
  aadharFront?: string | null;
  aadharBack?: string | null;
  panCard?: string | null;
  gstNumber?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VendorBankAccount {
  id: bigint;
  vendorId: bigint;
  bankName?: string | null;
  accountNumber?: string | null;
  accountHolderName?: string | null;
  ifscCode?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface VendorWallet {
  id: bigint;
  vendorId: bigint;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
// ---------------------
// MAIN VENDOR MODEL
// ---------------------

export interface Vendor {
  id: bigint;
  ownerName?: string | null;
  companyName?: string | null;
  email?: string | null;
  mobile: string;

  isActive: boolean;
  status: VendorStatus;
  rejectReason?: string | null;
  blockReason?: string | null;

  isApproved: boolean;

  shopName?: string | null;
  mainAddress?: string | null;
  completeAddress?: string | null;
  contactNumber?: string | null;
  floor?: string | null;

  latitude?: number | null;
  longitude?: number | null;

  pincode?: string | null;
  city: string;
  state: string;
  country: string;
  isOpen: boolean;

  images?: any | null;
  fcmToken?: string | null;

  documents?: VendorDocument | null;
  bankAccounts: VendorBankAccount[];
  VendorWallet?: VendorWallet | null;

  createdAt: string;
  updatedAt: string;
}
