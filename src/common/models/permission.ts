import * as SequelizeStatic from 'sequelize';
import { UserInstance } from './user';

export function permission(db: SequelizeStatic.Sequelize)  {    
    let Permission = db.define<PermissionInstance, PermissionAttribute>('Permission', {
        name: SequelizeStatic.STRING(255),
        uuid: SequelizeStatic.STRING(36)
    }, {
        schema: 'eventplanner'
    });

    return Permission;    
}

export interface PermissionAttribute {
    name: string;
    uuid: string;
}

export interface PermissionInstance extends SequelizeStatic.Instance<PermissionAttribute>, PermissionAttribute {
    getUser: SequelizeStatic.BelongsToGetAssociationMixin<UserInstance>;
    setUser: SequelizeStatic.BelongsToSetAssociationMixin<UserInstance, string>;
    createUser: SequelizeStatic.BelongsToCreateAssociationMixin<UserInstance>;
}

export interface PermissionModel extends SequelizeStatic.Model<PermissionInstance, PermissionAttribute> {}