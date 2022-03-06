"use strict";

const {DataTypes, Model} = require(`sequelize`);

class Comment extends Model {}

const define = (sequelize) =>
  Comment.init(
      {
        text: {
        // eslint-disable-next-line new-cap
          type: DataTypes.STRING(255),
        },
      },
      {
        sequelize,
        modelName: `Comment`,
        tableName: `comments`,
        underscored: true,
      }
  );

module.exports = define;
