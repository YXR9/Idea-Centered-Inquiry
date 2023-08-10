const users = require('./user.controller');
const activities = require('./activity.controller');
const groups = require('./group.controller');
const levels = require('./level.controller');

module.exports = {
  users,
  activities,
  activity_users,
  groups,
  levels
};