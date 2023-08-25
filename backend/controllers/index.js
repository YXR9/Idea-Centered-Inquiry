const User = require('./user.controller');
const Activity = require('./activity.controller');
const groups = require('./group.controller');
const Part = require('./part.controller');
const SubPart = require('./subPart.controller');
const Node = require('./node.controller');

module.exports = {
  User,
  Activity,
  groups,
  Part,
  SubPart,
  Node
};