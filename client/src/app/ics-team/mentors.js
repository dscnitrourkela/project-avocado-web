import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const GET_MENTORS = gql
`{
  mentor(rollNumber: "119CS0143"){
    name
    contact
    email
  }
}`
class Mentors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Name", field: "name",sortable: true,filter: true,resizable:true
      }, {
        headerName: "Mobile", field: "contact",sortable: true,filter: true,resizable:true
      },{
        headerName: "Email", field: "email",sortable: true,filter: true,resizable:true
      }],
    }
  }


  /*componentDidMount(){
      console.log("Executed after the component is mounted ");
      this.GetMentors();
  }*/

  render() {
    const GetMentors=()=> {
      const { data, loading, error } = useQuery(GET_MENTORS);
      return(
        <AgGridReact
        columnDefs={this.state.columnDefs}
        rowData={(loading || error)?data:data.coordinators}
        enableCellTextSelection={true}
        ensureDomOrder={true}
        >
      </AgGridReact>
      )  
    }
    return(
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Mentors
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>ICS Team</a></li>
              <li className="breadcrumb-item active" aria-current="page">Mentors</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <div style={{ height: '420px  ', width: '100%' }} className="ag-theme-alpine">
              <GetMentors/>
              </div>
              </div>
              </div>
          </div>
          </div>
          <label>
        Roll No :&nbsp;&nbsp;
      <input type="text"/>
    </label>&nbsp;&nbsp;&nbsp;&nbsp;
    <button>Search Mentor</button>
      </div>
    );
  }
}

export default Mentors