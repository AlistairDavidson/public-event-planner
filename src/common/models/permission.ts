import * as SequelizeStatic from 'sequelize';
import { UserInstance } from './user';

export function permission(db: SequelizeStatic.Sequelize)  {    
    let Permission = db.define<PermissionInstance, PermissionAttribute>('Permission', {
        name: SequelizeStatic.STRING(255)
    }, {
        schema: 'eventplanner'
    });

    return Permission;
}

export interface PermissionAttribute {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    
    name?: string;
}

export interface PermissionDto extends PermissionAttribute {    
    createdAt?: string;
    updatedAt?: string;
}

export interface PermissionInstance extends SequelizeStatic.Instance<PermissionAttribute>, PermissionAttribute {}

export interface PermissionModel extends SequelizeStatic.Model<PermissionInstance, PermissionAttribute> {}