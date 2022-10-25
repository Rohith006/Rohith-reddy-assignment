import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import Pagination from "./pagination"
import Search from "./search.js"
import { Navbar, Nav } from 'react-bootstrap';
import moment from 'moment';
class Auditpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            dataPerPage: 10,
            usersData: []
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.paginate = this.paginate.bind(this);
    }
    componentDidMount() {
        this.props.getUsers();
        
    }

    componentWillReceiveProps(props) {
        const {users} = props
        let data = users.items
        this.setState({
            usersData: data
        })
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    handleSearch(data) {
        this.setState({
            usersData:data
        })
    }

    paginate (pageNumber) {
        this.setState({currentPage: pageNumber})
    }

    render() {
        const { user, users } = this.props;
        const {currentPage, dataPerPage, usersData} = this.state;
        const lastIndex = currentPage * dataPerPage;
        const firstIndex = lastIndex - dataPerPage
        let currentData = usersData && usersData.slice(firstIndex, lastIndex)
        const time = moment().format('DD/MM/YYYY, HH:mm:ss' )
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link href="#features">Auditor</Nav.Link>
                        <Nav.Link> <Link to="/login">Logout</Link></Nav.Link>
                    </Nav>
                </Navbar>
                <div >
                    <h1>Hi {user.firstName}!</h1>
                    <p>You're logged in with React!!</p>
                    <h3>All login audit :</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    <label>Search:</label>
                    <Search data = {users.items} 
                    searchResults = {this.handleSearch} 
                    />
                    <table  class="table table-striped">
                        
                            <thead>
                                <tr>
                                    <th scope="col" >ID</th><br></br>
                                    <th scope="col" >Role</th><br></br>
                                    <th scope="col" >First Name</th><br></br>
                                    <th scope="col" >Last Name</th><br></br>
                                    <th scope="col" >Date</th><br></br>
                                    </tr>
                                
                            </thead>
                            <tbody>
                            {users.items && currentData.map((user, index) =>
                                <tr key = {index}>
                                    <td>{user.id }</td><br></br><br></br><br></br>
                                    <td>{user.role }</td><br></br><br></br><br></br>
                                    <td>{user.firstName }</td><br></br>
                                    <td>{user.lastName }</td><br></br>
                                    <td>{user.createdDate }</td><br></br>
                                </tr>
                            )}

                            </tbody>
                    </table>

                    <Pagination
                        dataPerPage={dataPerPage}
                        totalData={users.items && users.items.length}
                        paginate={this.paginate}
                    />
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };