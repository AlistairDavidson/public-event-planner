import * as SequelizeStatic from 'sequelize';
import { ActContactModel, ActContactInstance, ActContactDto } from './act-contact';

export function contact(db: SequelizeStatic.Sequelize, ActContact: ActContactModel)  {    
    let Contact = db.define<ContactInstance, ContactAttribute>('Contact', {
        firstName: SequelizeStatic.STRING(255),
        lastName: SequelizeStatic.STRING(255),
        details: SequelizeStatic.JSON
    }, {
        schema: 'eventplanner'
    });
    
    Contact.hasMany(ActContact);
    ActContact.belongsTo(Contact);

    return Contact;    
}

export interface ContactAttribute {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;

    firstName?: string;
    lastName?: string;
    details?: ContactDetailsDto;
}

export interface ContactInstance extends SequelizeStatic.Instance<ContactAttribute>, ContactAttribute {
    getActContacts: SequelizeStatic.HasManyGetAssociationsMixin<ActContactInstance>;
    setActContacts: SequelizeStatic.HasManySetAssociationsMixin<ActContactInstance, number>;
    addActContacts: SequelizeStatic.HasManyAddAssociationsMixin<ActContactInstance, number>;
    addActContact: SequelizeStatic.HasManyAddAssociationMixin<ActContactInstance, number>;
    createActContact: SequelizeStatic.HasManyCreateAssociationMixin<ActContactInstance>;
    removeActContact: SequelizeStatic.HasManyRemoveAssociationMixin<ActContactInstance, number>;
    removeActContacts: SequelizeStatic.HasManyRemoveAssociationsMixin<ActContactInstance, number>;
    hasActContact: SequelizeStatic.HasManyHasAssociationMixin<ActContactInstance, number>;
    hasActContacts: SequelizeStatic.HasManyHasAssociationsMixin<ActContactInstance, number>;
    countActContacts: SequelizeStatic.HasManyCountAssociationsMixin;
}

export interface ContactDto extends ContactAttribute {
    createdAt?: string;
    updatedAt?: string;

    ActContacts?: ActContactDto[];
}

export interface ContactsDto {
    count: number;
    rows: ContactDto[];
}

export interface ContactModel extends SequelizeStatic.Model<ContactInstance, ContactAttribute> {}

export interface ContactDetailsDto {
    [key: string]: AddressDto[] | EmailDto[] | PhoneDto[] | WebsiteDto[] | ImageDto[];

    addresses?: AddressDto[];
    emails?: EmailDto[];
    phones?: PhoneDto[];
    websites?: WebsiteDto[];
    images?: ImageDto[];
}

export interface AddressDto {
    address?: string;
    town?: string;
    postcode?: string;    
}

export interface EmailDto {
    email?: string;
}

export interface PhoneDto {
    phone?: string;
}

export interface WebsiteDto {
    url?: string;
}

export interface ImageDto {
    image?: string;
}
