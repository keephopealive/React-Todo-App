import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodoText: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleChange(event) {
        const newTodoText = event.target.value;
        this.setState({
            newTodoText
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addTodo(this.state.newTodoText);
        this.handleClear();
    }

    handleClear() {
        const newTodoText = '';
        this.setState({ newTodoText });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' name='text'
                    value={this.state.newTodoText}
                    onChange={this.handleChange}
                />
                <input type='submit' />
            </form>
        );
    }

}


const TodoList = (props) => {
    const list = props.items.map((item, index) => {
        return (
            <li key={index}>
                {item.id} - {item.text} - {item.completed.toString()}
                {
                    item.completed ?
                        <button onClick={() => { props.updateTodo(item.id) }}>Mark Incomplete</button> :
                        <button onClick={() => { props.updateTodo(item.id) }}>Mark Complete</button>
                }
                <button onClick={() => { props.removeTodo(item.id) }}>Remove</button>
            </li>
        );
    });
    return (
        <ul>
            {list}
        </ul>
    );
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { id: 1, text: "Learn React", completed: true },
                { id: 2, text: "Build a todo app", completed: false },
                { id: 3, text: "Profit", completed: false }
            ],
            filter: 'all'
        }

        this.addTodo = this.addTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    addTodo(text) {
        const id = this.state.items[this.state.items.length - 1].id + 1;
        this.setState({
            items: [...this.state.items, { id: id, text: text, completed: false }]
        })
    }

    updateTodo(todoId) {
        console.log("Update", todoId)
        this.state.items.map((item, index) => {
            if (item.id === todoId) {
                this.state.items[index].completed = !this.state.items[index].completed;
                return this.setState({
                    items: [...this.state.items]
                });
            }
        })
    }

    removeTodo(todoId) {
        // index = this.state.items.findIndex( (element) => element.id === todoId)
        this.state.items.map((item, index) => {
            if (item.id === todoId) {
                this.state.items.splice(index, 1);
                return this.setState({
                    items: this.state.items
                });
            }
        })
    }

    updateFilter(filter) {

    }



    render() {
        return (
            <div>

                <TodoCreate
                    addTodo={this.addTodo}
                />

                <TodoList
                    items={this.state.items}
                    updateTodo={this.updateTodo}
                    removeTodo={this.removeTodo}
                />

            </div>
        );
    }
}

export default App;
