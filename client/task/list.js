import { Tasks } from '../../api/tasks';

Template.list.helpers({
    tasks() {
        return Tasks.find({});
    }
});