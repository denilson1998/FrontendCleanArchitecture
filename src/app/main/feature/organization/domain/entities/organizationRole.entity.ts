export interface OrganizationRole {
    role : string,
    organizationId: number,
    clientId: number,
    currentlyInUse: boolean,
    createdAt: string,
    createdBy: string,
    lastModified?: string,
    lastModifiedBy?: string,
    id: number,
    domainEvents?: []
}