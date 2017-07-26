import * as SequelizeStatic from 'sequelize';

export function contactDetail(db: SequelizeStatic.Sequelize)  {    
    let ContactDetail = db.define<ContactDetailInstance, ContactDetailAttribute>('ContactDetail', {
        data: SequelizeStatic.JSON,
        type: SequelizeStatic.STRING(255)      
    }, {
        schema: 'eventplanner'
    });

    return ContactDetail;
}

export interface ContactDetailAttribute {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;

    data?: ContactDetailDataDto;
    type?: ContactDetailType;
}

export type ContactDetailDataDto = AddressDto | EmailDto | FacebookPageDto | TwitterDto | PhoneDto | WebsiteDto;
export type ContactDetailType = 'Address' | 'Email' | 'FacebookPage' | 'Twitter' | 'Phone' | 'Website';

export interface AddressDto {
    address?: string;
    postcode?: string;    
}

export interface EmailDto {
    email?: string;
}

export interface FacebookPageDto {
    facebook?: string;
}

export interface TwitterDto {
    twitter?: string;
}

export interface PhoneDto {
    phone?: string;
}

export interface WebsiteDto {
    website?: string;
}

export interface ContactDetailInstance extends SequelizeStatic.Instance<ContactDetailAttribute>, ContactDetailAttribute {}

export interface ContactDetailDto extends ContactDetailAttribute {}

export interface ContactDetailModel extends SequelizeStatic.Model<ContactDetailInstance, ContactDetailAttribute> {}