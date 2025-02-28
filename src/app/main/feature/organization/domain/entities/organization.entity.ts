export interface OrganizationEntity  {
    id?: number;
    name: string;
    phoneNumber: number;
    imageUri: string;
    imageBlobId: string;
    address: string;
    facebookUrl? : string;
    instagramUrl? : string;
    organizationCode: string;
    businessSectors: string[];
    createdAt: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    currency: string
}