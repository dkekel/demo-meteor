import {Tasks} from '../../api/tasks';

Template.list.helpers({
    tasks() {
        return Tasks.find({}, {sort: {createdAt: -1}});
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
    }
});