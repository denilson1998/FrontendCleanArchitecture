import { OrganizationEntity } from 'src/app/main/feature/organization/domain/entities/organization.entity';
import { Mapper } from 'src/app/shared/infrastructure/helpers/maps/mapper';
import { OrganizationModel } from '../../models/organization.model';

export class OrganizationMapper extends Mapper<
  OrganizationEntity,
  OrganizationModel
> {
  mapFrom(param: OrganizationEntity): OrganizationModel {
    return {
      id: param.id,
      name: param.name,
      phoneNumber: param.phoneNumber,
      address: param.address,
      imageUri: param.imageUri,
      facebookUrl: param.facebookUrl,
      instagramUrl: param.instagramUrl,
      currency: param.currency,
      businessSectors: param.businessSectors,
    };
  }
  mapTo(param: OrganizationModel): OrganizationEntity {
    throw new Error('Method not implemented.');
  }
}
