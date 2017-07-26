import * as SequelizeStatic from 'sequelize';
import { ActContactModel, ActContactInstance } from './act-contact';
import { ContactDetailModel, ContactDetailInstance, ContactDetailDto } from './contact-detail';

export function contact(db: SequelizeStatic.Sequelize, ActContact: ActContactModel, ContactDetail: ContactDetailModel)  {    
    let Contact = db.define<ContactInstance, ContactAttribute>('Contact', {
        name: SequelizeStatic.STRING(255)        
    }, {
        schema: 'eventplanner'
    });
    
    Contact.hasMany(ActContact);
    ActContact.belongsTo(Contact);

    Contact.hasMany(ContactDetail);
    ContactDetail.belongsTo(Contact);

    return Contact;    
}

export interface ContactAttribute {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
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

    getContactDetails: SequelizeStatic.HasManyGetAssociationsMixin<ContactDetailInstance>;
    setContactDetails: SequelizeStatic.HasManySetAssociationsMixin<ContactDetailInstance, number>;
    addContactDetails: SequelizeStatic.HasManyAddAssociationsMixin<ContactDetailInstance, number>;
    addContactDetail: SequelizeStatic.HasManyAddAssociationMixin<ContactDetailInstance, number>;
    createContactDetail: SequelizeStatic.HasManyCreateAssociationMixin<ContactDetailInstance>;
    removeContactDetail: SequelizeStatic.HasManyRemoveAssociationMixin<ContactDetailInstance, number>;
    removeContactDetails: SequelizeStatic.HasManyRemoveAssociationsMixin<ContactDetailInstance, number>;
    hasContactDetail: SequelizeStatic.HasManyHasAssociationMixin<ContactDetailInstance, number>;
    hasContactDetails: SequelizeStatic.HasManyHasAssociationsMixin<ContactDetailInstance, number>;
    countContactDetails: SequelizeStatic.HasManyCountAssociationsMixin;
}

export interface ContactDto extends ContactAttribute {
    contactDetails?: ContactDetailDto[];
}

export interface ContactModel extends SequelizeStatic.Model<ContactInstance, ContactAttribute> {}