const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")
const bcrypt = require("bcrypt")

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        linkedinURL: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            },
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        industry: {
            type: DataTypes.STRING,
            allowNull: true
        },
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        aboutMe: {
            type: DataTypes.STRING,
            allowNull: true
        },
        headshotImage: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
)

module.exports = User