import {Tasks} from '../../api/tasks';
import {ReactiveDict} from 'meteor/reactive-dict';

Template.list.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.list.helpers({
    tasks() {
        const instance = Template.instance();
        const taskSelector = instance.state.get('hideCompleted') ? {checked: {$ne: true}} : {};
        return Tasks.find(taskSelector, {sort: {createdAt: -1}});
    }
});

Template.list.events({
    'submit #newTask'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;
        const text = target.text.value;
        // Insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
        });
        // Clear form
        target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});

Template.task.events({
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Tasks.update(this._id, {
            $set: {checked: !this.checked},
        });
    },
    'click #deleteTask'() {
        Tasks.remove(this._id);
    }
});