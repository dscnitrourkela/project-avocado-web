import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const GET_COORDINATORS = gql
`{
  coordinators{
    name
    contact
    email
    designation
  }
}`
class Coordinators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Name", field: "name",sortable: true,filter:true,resizable:true
      }, {
        headerName: "Mobile", field: "contact",sortable: true,filter:true,resizable:true
      },{
        headerName: "Email", field: "email",sortable: true,filter:true,resizable:true
      },
      {
        headerName: "Designation", field: "designation",sortable: true,filter:true,resizable:true
      }],
    }
  }
  render () {
    const GetCoordinators=()=> {
      const { data, loading, error } = useQuery(GET_COORDINATORS);
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
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Coordinators
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>ICS Team</a></li>
              <li className="breadcrumb-item active" aria-current="page">Coordinators</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <div style={{ height: '420px  ', width: '100%' }} className="ag-theme-alpine">
                <GetCoordinators/>
        </div>
              </div>
              </div>
          </div>
          </div>
      </div>
    );
  }
}

export default Coordinators;