export interface GroupedQrDetailModel{
    id:                number;
    qrId:              string;
    clientName:        string;
    description:       string;
    amount:            number;
    bankAccountNumber: number;
    currency:          string;
    bankAccountType:   string;
    isPaid:            boolean;
    qrType:            string;
    encryptedQrString: string;
    createdAt:         string;
    expirationDate:    string;
    organizationId:    number;
    paidNumber:        number;
}