import * as SequelizeStatic from 'sequelize';

export function user(db: SequelizeStatic.Sequelize)  {    
    let User = db.define<UserInstance, UserAttribute>('User', {
        email: SequelizeStatic.STRING(255),
        password: SequelizeStatic.STRING(255),
        uuid: SequelizeStatic.STRING(36)
    }, {
        schema: 'eventplanner'
    });

    return User;    
}

export interface UserAttribute {
    email: string;
    password: string;
    uuid: string;
}

export interface UserInstance extends SequelizeStatic.Instance<UserAttribute> {}

export interface UserModel extends SequelizeStatic.Model<UserInstance, UserAttribute> {}