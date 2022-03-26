import {Meteor} from 'meteor/meteor'
import {TasksCollection} from '../imports/api/collections/TasksCollection'

const insertTask = text => TasksCollection.insert({text})

Meteor.startup(() => {
  if (!TasksCollection.find().count()) {
    for (const task of ['asdf', 'xcvb', 'erty']) {
      insertTask(task)
    }
  }
})