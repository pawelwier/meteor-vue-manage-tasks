import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import {TasksCollection} from '../imports/db/collections/TasksCollection'
import '../imports/api/methods/tasksMethods'
import '../imports/api/publications/tasksPublications'

const insertTask = (text, user) => TasksCollection.insert({
  text,
  complete: false,
  userId: user._id,
  createdAt: new Date(),
})

const USERNAME = 'pawel'
const PASSWORD = 'pass'

Meteor.startup(() => {
  const user = Accounts.findUserByUsername(USERNAME)
  if (!user) {
    Accounts.createUser({
      username: USERNAME,
      password: PASSWORD,
    })
  }
  
  if (!TasksCollection.find().count()) {
    for (const task of [
      'do it',
      'do that',
      'do this'
    ]) {
      insertTask(task, user)
    }
  }
})