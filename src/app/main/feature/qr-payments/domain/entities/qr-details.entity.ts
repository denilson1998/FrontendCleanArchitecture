



export interface QrDetail {
    qrId: string;
    clientName: string;
    description: string;
    amount: number;
    bankAccountNumber: number;
    currency: string;
    bankAccountType: string;
    qrType: string;
    isPaid: boolean;
    isExpired: boolean;
    encryptedQrString: string;
    createdAt: Date;
    expirationDate: Date;
    organizationId: number;
}