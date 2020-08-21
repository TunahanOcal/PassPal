import React, { Component } from 'react';
import { Table } from 'reactstrap';
import InteractiveTable from 'react-interactive-table';
import { VectorMap } from '@south-paw/react-vector-maps';
import styles from './Rank.css';

import world from './World.json';
//import { colors } from '@material-ui/core';




export default class PassportRankList extends Component {



    render() {
    const passports = this.props.passportList;
    //eslint-disable-next-line
    let rows = passports.map((passport, index) => (
        <tr key={index}>
            <td>{passport.countryName}</td>
            <td>{passport.countryCode}</td>
            <td>{passport.visaFree}</td>
            <td>{passport.eta}</td>
            <td>{passport.visaOnArrival}</td>
            <td>{passport.visaRequired}</td>
        </tr>
    ));

    const style = {
      marginLeft: '1rem auto',
      width: '600px',
      height: '300px',
      marginTop: '30px',
    };

    async function onClick({ target }) {
     
      let country_name = target.getAttribute('name');

      let countryInfo = passports.find((passport) => {
        return passport.countryName.includes(country_name);
      });
      if (countryInfo !== undefined) {
        
        //eslint-disable-next-line
        let insert_row = (
          <tr>
            <td>{countryInfo.countryName}</td>
            <td>{countryInfo.continent}</td>
            <td>{countryInfo.visaFree}</td>
            <td>{countryInfo.visaRequired}</td>
            <td>{countryInfo.visaOnArrival}</td>
            <td>{countryInfo.eta}</td>
          </tr>
        );
        console.log(
          document
            .getElementById('table-class')
            .getElementsByTagName('tbody')[0]
        );
        var table = document.getElementById('table-class');
        //eslint-disable-next-line
        var tbody = table.getElementsByTagName('tbody');

        var tableRef = document
          .getElementById('table-class')
          .getElementsByTagName('tbody')[0];

        var myHtmlContent = `<td>${countryInfo.countryName}</td> <td>${countryInfo.continent}</td>  <td>${countryInfo.visaFree}</td> <td>${countryInfo.visaRequired}</td> <td>${countryInfo.eta}</td> `;
        //eslint-disable-next-line
        var tableRef = document
          .getElementById('table-class')
          .getElementsByTagName('tbody')[0];

        var newRow = tableRef.insertRow(tableRef.rows.length);
        newRow.innerHTML = myHtmlContent;
      }
    }

    return (
      <div style={{ backgroundColor: '#f9f9f9 ' }}>
        <div className="rowC">
          <div style={style}>
            <VectorMap {...world} layerProps={{ onClick }} />
          </div>
          <Table className="mt-1" id="table-class">
            <thead>
              <tr>
                <th width="5%">CountryName</th>
                <th width="5%">Continent</th>
                <th width="5%">VisaFree</th>
                <th width="5%"> VisaRequired</th>
                <th width="5%"> ETA</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </div>
        <div className="interactive-table">
          <InteractiveTable
            style = {styles}
            tableStyles={'responsive'}
            dataList={passports}
            columns={{
              countryName: {
                alias: 'CountryName',
                sortable: true,
                active: false,  
                sortingKey: 'countryName',
              },
              countryCode: {
                alias: 'CountryCode',
                sortable: true,
                active: false,
                sortingKey: 'countryCode',
              },
              continent: {
                alias: 'Continent',
                sortable: true,
                active: false,
                sortingKey: 'continent',
              },
              visaFree: {
                alias: 'VisaFree',
                sortable: true,
                active: false,
                sortingKey: 'visaFree',
              },
              visaRequired: {
                alias: 'Visa Required',
                sortable: true,
                active: false,
                sortingKey: 'visaRequired',
              },
              visaOnArrival: {
                alias: 'Visa On Arrival',
                sortable: true,
                active: false,
                sortingKey: 'visaOnArrival',
              },
              eta: {
                alias: 'ETA',
                sortable: true,
                active: false,
                sortingKey: 'eta',
              },
            }}
            searching={{
              active: true,
              searchPlaceholder: 'Search by Country Name',
              searchKeys: ['countryName'],
            }}
            paging={{
              maxRows: 10,
              prevBtn: 'Prev',
              nextBtn: 'Next',
              showAll: true,
              showAllText: 'show all',
              joinPages: false,
            }}
          />
        </div>
      </div>
    );
  }
}


