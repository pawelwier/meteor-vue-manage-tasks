import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
import {TasksCollection} from '../../db/collections/TasksCollection'

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String)
    if (!this.userId) {
      throw new Meteor.Error('Not authorized')
    }
    TasksCollection.insert({
      text,
      complete: false,
      createdAt: new Date(),
      userId: this.userId,
    })
  },

  'tasks.remove'(id) {
    check(id, String)
    if (!this.userId) {
      throw new Meteor.Error('Not authorized')
    }
    TasksCollection.remove(id)
  },

  'tasks.setIsChecked'(id, complete) {
    check(id, String)
    check(complete, Boolean)
    if (!this.userId) {
      throw new Meteor.Error('Not authorized')
    }
    TasksCollection.update(id, {
      $set: {
        complete,
      },
    })
  }
})