export interface OrganizationModel {
    id?: number;
    name: string;
    phoneNumber: number;
    address: string;
    imageUri? : string;
    facebookUrl?: string;
    instagramUrl?: string;
    currency: string;
    businessSectors: string[];
}