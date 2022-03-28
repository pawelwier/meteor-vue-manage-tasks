import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import {TasksCollection} from '../imports/db/collections/TasksCollection'
import '../imports/api/methods/tasksMethods'
import '../imports/api/publications/tasksPublications'
import '../imports/api/publications/usersPublications'

const insertTask = (text, user) => TasksCollection.insert({
  text,
  complete: false,
  userId: user._id,
  createdAt: new Date(),
})

const USERNAMES = [
  'pawel', 
  'olga',
  'robert',
]
const PASSWORD = 'pass'
const TASKS = [
  'do it',
  'do that',
  'do this'
]

Meteor.startup(() => {
  for (const username of USERNAMES) {
    const user = Accounts.findUserByUsername(username)
    if (!user) {
      Accounts.createUser({
        username,
        password: PASSWORD,
      })
    }
  }
  for (const username of USERNAMES) {
    const user = Accounts.findUserByUsername(username)
    if (!TasksCollection.find({userId: user._id}).count()) {
      for (const task of TASKS) {
        insertTask(task, user)
      }
    }
  }
})