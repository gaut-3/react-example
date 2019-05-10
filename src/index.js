import "./styles.css";

const React = require("react");
const ReactDOM = require("react-dom");
const axios = require("axios");

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { employees: [] };
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/todos`).then(res => {
      const employees = res.data;
      this.setState({ employees });
    });
  }

  render() {
    return <EmployeeList employees={this.state.employees} />;
  }
}

class EmployeeList extends React.Component {
  render() {
    const employees = this.props.employees.map(employee => (
      <Employee employee={employee} />
    ));
    return (
      <table>
        <tbody>
          <tr>
            <th>First Names</th>
            <th>Last Name</th>
            <th>Description</th>
          </tr>
          {employees}
        </tbody>
      </table>
    );
  }
}

class Employee extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.employee.userId}</td>
        <td>{this.props.employee.title}</td>
        <td>{this.props.employee.completed ? "true" : "false"}</td>
      </tr>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
