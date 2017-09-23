import * as SequelizeStatic from 'sequelize';
import { PermissionModel, PermissionInstance } from './permission';

export function user(db: SequelizeStatic.Sequelize, Permission: PermissionModel)  {    
    let User = db.define<UserInstance, UserAttribute>('User', {
        username: SequelizeStatic.STRING(255),
        password: SequelizeStatic.STRING(255),
        uuid: SequelizeStatic.STRING(36)
    }, {
        schema: 'eventplanner'
    });

    Permission.belongsToMany(User, { through: 'UserPermission' });
    User.belongsToMany(Permission, { through: 'UserPermission' });

    return User;    
}

export interface UserAttribute {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    username?: string;
    password?: string;
    uuid?: string;
}

export interface UserInstance extends SequelizeStatic.Instance<UserAttribute>, UserAttribute {
    getPermissions: SequelizeStatic.HasManyGetAssociationsMixin<PermissionInstance>;
    setPermissions: SequelizeStatic.HasManySetAssociationsMixin<PermissionInstance, number>;
    addPermissions: SequelizeStatic.HasManyAddAssociationsMixin<PermissionInstance, number>;
    addPermission: SequelizeStatic.HasManyAddAssociationMixin<PermissionInstance, number>;
    createPermission: SequelizeStatic.HasManyCreateAssociationMixin<PermissionInstance>;
    removePermission: SequelizeStatic.HasManyRemoveAssociationMixin<PermissionInstance, number>;
    removePermissions: SequelizeStatic.HasManyRemoveAssociationsMixin<PermissionInstance, number>;
    hasPermission: SequelizeStatic.HasManyHasAssociationMixin<PermissionInstance, number>;
    hasPermissions: SequelizeStatic.HasManyHasAssociationsMixin<PermissionInstance, number>;
    countPermissions: SequelizeStatic.HasManyCountAssociationsMixin;
}

export interface UserDto extends UserAttribute {    
    createdAt?: string;
    updatedAt?: string;
}

export interface UsersDto {
    count: number;
    rows: UserDto[];
}


export interface UserModel extends SequelizeStatic.Model<UserInstance, UserAttribute> {}