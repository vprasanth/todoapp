import React from 'react';
import './Todo.css';

class TodoObject extends React.Component {
  state = {
    thingsToDo: [],
    task: '',
    say: 'hello, world!',
  };
  id = 3;

  constructor(props) {
    super(props);

    this.state.thingsToDo = [
      {id: 0, name: 'Clean the room', done: false},
      {id: 1, name: 'Take out the trash', done: false},
      {id: 2, name: 'Wash the car', done: false},
    ];

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask() {
    function updater(oldState) {
      return {
        task: '',
        thingsToDo: oldState.thingsToDo.concat([
          {id: this.id++, name: oldState.task, done: false},
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
    let updatedThingsToDo = this.state.thingsToDo.map(thing => {
      if (thing.id === taskId) {
        thing.done = !thing.done;
      }
      return thing;
    });
    // update the state
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
        <h1>Todo App React</h1>
        <div>
          <div>
            <input
              type="text"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button onClick={this.addTask}>Add</button>
          </div>
          <ul>
            {this.state.thingsToDo.map((item, index) => (
              <li key={index} className={item.done ? 'done' : ''}>
                <input
                  type="checkbox"
                  defaultChecked={item.done}
                  onClick={this.markDone.bind(this, item.id)}
                />{' '}
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
