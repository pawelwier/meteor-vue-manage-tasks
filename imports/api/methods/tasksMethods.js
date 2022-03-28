import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
import {TasksCollection} from '../../db/collections/TasksCollection'

Meteor.methods({
  'tasks.insert'(text, assignedUser) {
    check(text, String)
    if (!this.userId) {
      throw new Meteor.Error('Not authorized')
    }
    let author
    if (assignedUser) {
      author = Meteor.users.findOne({_id: this.userId})
    }
    TasksCollection.insert({
      text,
      complete: false,
      createdAt: new Date(),
      userId: assignedUser ? assignedUser._id : this.userId,
      author: assignedUser ? author : null,
    })
  },

  'tasks.remove'(id) {
    check(id, String)
    const userId = this.userId
    if (!userId) {
      throw new Meteor.Error('Not authorized')
    }
    const task = TasksCollection.findOne({_id: id, userId})
    if (!task) {
      throw new Meteor.Error('Access denied')
    }
    TasksCollection.remove(id)
  },

  'tasks.setIsChecked'(id, complete) {
    check(id, String)
    check(complete, Boolean)
    const userId = this.userId
    if (!userId) {
      throw new Meteor.Error('Not authorized')
    }
    const task = TasksCollection.findOne({_id: id, userId})
    if (!task) {
      throw new Meteor.Error('Access denied')
    }
    TasksCollection.update(id, {
      $set: {
        complete,
      },
    })
  }
})