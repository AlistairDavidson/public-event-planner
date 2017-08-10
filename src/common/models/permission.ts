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
    createdAt?: Date;
    updatedAt?: Date;
    
    name?: string;
}

export interface PermissionDto extends PermissionAttribute {    
}

export interface PermissionInstance extends SequelizeStatic.Instance<PermissionAttribute>, PermissionAttribute {}

export interface PermissionModel extends SequelizeStatic.Model<PermissionInstance, PermissionAttribute> {}