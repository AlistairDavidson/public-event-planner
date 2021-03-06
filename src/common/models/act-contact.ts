import * as SequelizeStatic from 'sequelize';
import { ActModel, ActAttribute, ActInstance, ActDto } from './act';
import { ContactAttribute, ContactModel, ContactInstance, ContactDto } from './contact';

export function actContact(db: SequelizeStatic.Sequelize)  {    
    let ActContact = db.define<ActContactInstance, ActContactAttribute>('ActContact', {
        relationship: SequelizeStatic.STRING(255)               
    }, {
        schema: 'eventplanner'
    });
    
    return ActContact;    
}

export interface ActContactAttribute {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    relationship?: string;
    ActId?: number;
    ContactId?: number;
}

export interface ActContactInstance extends SequelizeStatic.Instance<ActContactAttribute>, ActContactAttribute {
    Act: ActInstance;
    createAct: SequelizeStatic.BelongsToCreateAssociationMixin<ActAttribute>;
    getAct: SequelizeStatic.BelongsToGetAssociationMixin<ActInstance>;
    setAct: SequelizeStatic.BelongsToSetAssociationMixin<ActInstance, number>;

    Contact: ContactInstance;
    createContact: SequelizeStatic.BelongsToCreateAssociationMixin<ContactAttribute>;
    getContact: SequelizeStatic.BelongsToGetAssociationMixin<ContactInstance>;
    setContact: SequelizeStatic.BelongsToSetAssociationMixin<ContactInstance, number>;
}

export interface ActContactDto extends ActContactAttribute {    
    createdAt?: string;
    updatedAt?: string;
    
    Contact?: ContactDto; 
    Act?: ActDto;    
}

export interface ActContactModel extends SequelizeStatic.Model<ActContactInstance, ActContactAttribute> {}