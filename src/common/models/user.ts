import * as SequelizeStatic from 'sequelize';
import { PermissionModel, PermissionAttribute } from './permission';

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
    username: string;
    password: string;
    uuid: string;
}

export interface UserInstance extends SequelizeStatic.Instance<UserAttribute>, UserAttribute {
    getPermissions: SequelizeStatic.HasManyGetAssociationsMixin<PermissionAttribute>;
    setPermissions: SequelizeStatic.HasManySetAssociationsMixin<PermissionAttribute, string>;
    addPermissions: SequelizeStatic.HasManyAddAssociationsMixin<PermissionAttribute, string>;
    addPermission: SequelizeStatic.HasManyAddAssociationMixin<PermissionAttribute, string>;
    createPermission: SequelizeStatic.HasManyCreateAssociationMixin<PermissionAttribute>;
    removePermission: SequelizeStatic.HasManyRemoveAssociationMixin<PermissionAttribute, string>;
    removePermissions: SequelizeStatic.HasManyRemoveAssociationsMixin<PermissionAttribute, string>;
    hasPermission: SequelizeStatic.HasManyHasAssociationMixin<PermissionAttribute, string>;
    hasPermissions: SequelizeStatic.HasManyHasAssociationsMixin<PermissionAttribute, string>;
    countPermissions: SequelizeStatic.HasManyCountAssociationsMixin;
}

export interface UserModel extends SequelizeStatic.Model<UserInstance, UserAttribute> {}