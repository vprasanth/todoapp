import React from 'react';
import './Todo.css';

class TodoObject extends React.Component {
  state = {
    thingsToDo: [],
    task: '',
    say: 'hello, world!',
  };

  constructor(props) {
    super(props);
    // sample list
    //this.state.thingsToDo = [
    //  {id: 0, name: 'Clean the room', done: false},
    //  {id: 1, name: 'Take out the trash', done: false},
    //  {id: 2, name: 'Wash the car', done: false},
    //];

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask() {
    function updater(oldState) {
      return {
        task: '',
        thingsToDo: oldState.thingsToDo.concat([
          {name: oldState.task, done: false},
        ]),
      };
    }

    if (this.state.task.length > 0) {
      if (!(this.state.task.trim() === '')) {
        this.setState(updater);
      } else {
        this.setState(oldState => {
          return {
            task: '',
            thingsToDo: oldState.thingsToDo,
          };
        });
      }
    }
  }

  handleChange(event) {
    this.setState({task: event.target.value});
  }

  markDone = (taskId, event) => {
    let updatedThingsToDo = this.state.thingsToDo;
    updatedThingsToDo[taskId].done = !updatedThingsToDo[taskId].done;

    this.setState(oldState => {
      return {
        task: oldState.task,
        thingsToDo: updatedThingsToDo,
      };
    });
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <h3>Add task</h3>
            <input
              type="text"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button onClick={this.addTask}>Add</button>
          </div>
          <h2>
            Todo ({this.state.thingsToDo.filter(things => !things.done).length})
          </h2>
          <ul>
            {this.state.thingsToDo.map((item, index) => (
              <li
                key={index}
                className={item.done ? 'done' : ''}
                onClick={this.markDone.bind(this, index)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoObject;
