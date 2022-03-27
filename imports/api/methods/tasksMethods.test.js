import {Meteor} from 'meteor/meteor'
import {Random} from 'meteor/random'
import {assert} from 'chai'
import {mockMethodCall} from 'meteor/quave:testing'
import {TasksCollection} from '../../db/collections/TasksCollection'
import './tasksMethods'

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id()
      let taskId

      beforeEach(() => {
        TasksCollection.remove({})
        taskId = TasksCollection.insert({
          text: 'Task 123',
          createdAt: new Date(),
          complete: false,
          userId,
        })
      })

      it('user can delete their task', () => {
        mockMethodCall('tasks.remove', taskId, {
          context: {
            userId,
          },
        })
        assert.equal(TasksCollection.find().count(), 0)
      })

      it('user cannot delete someone else\'s task', () => {
        const fn = () => mockMethodCall('tasks.remove', taskId, {
          context: {
            userId: Random.id(),
          },
        })
        assert.throws(fn, /Access denied/)
      })

      it('user cannot delete task when not logged in', () => {
        const fn = () => mockMethodCall('tasks.remove', taskId)
        assert.throws(fn, /Not authorized/)
      })
    })
  })
}