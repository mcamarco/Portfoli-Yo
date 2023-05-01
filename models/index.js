const User = require("./User")
const Comment = require("./Comment")
const Event = require("./Event")

User.hasMany(Comment, {
    foreignKey: "userId"
})

Comment.belongsTo(User)

User.hasMany(Event, {
    foreignKey: "userId"
})

Event.belongsTo(User)

Event.hasMany(Comment, {
    foreignKey: "eventId"
})

Comment.belongsTo(Event)

module.exports = {
    User, 
    Comment,
    Event
}