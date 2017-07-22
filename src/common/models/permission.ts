import * as SequelizeStatic from 'sequelize';
import { UserInstance } from './user';

export function permission(db: SequelizeStatic.Sequelize)  {    
    let Permission = db.define<PermissionInstance, PermissionAttribute>('Permission', {
        name: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });

    Permission.findOrCreate({
        where: {
            name: 'view_profile'
        }
    });

    return Permission;
}

export interface PermissionAttribute {
    name: string;
}

export interface PermissionInstance extends SequelizeStatic.Instance<PermissionAttribute>, PermissionAttribute {
    getUser: SequelizeStatic.BelongsToGetAssociationMixin<UserInstance>;
    setUser: SequelizeStatic.BelongsToSetAssociationMixin<UserInstance, string>;
    createUser: SequelizeStatic.BelongsToCreateAssociationMixin<UserInstance>;
}

export interface PermissionModel extends SequelizeStatic.Model<PermissionInstance, PermissionAttribute> {}