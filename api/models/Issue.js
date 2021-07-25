/**
 * Issue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require("moment");

module.exports = {
  attributes: {
    projectName: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
      allowNull: true,
    },
    priority: {
      type: "number",
    },
  },
  customToJSON: function () {
    this.added = moment(this.createdAt).format("YYYY-MM-DD HH:mm:ss");
    this.lastUpdated = moment(this.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    return this;
  },
};
