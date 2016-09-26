import React from 'react';
import {
  Table,
} from 'react-bootstrap';

export default function ({ data, labels, ...props }) {
  return (<div>
    <Table {...props} >
      <thead key="lol">
      <tr>{labels.map ((label, index)=><th key={index}>{label}</th>)}</tr>
      </thead>
      <tbody>
      {data.map ((row, index)=><tr key={index}>{Object.keys (row)
                                                      .map (column=><td key={column}>
                                                        {
                                                          typeof row[column] !== 'object' ? row[column] : null
                                                        }
                                                      </td>)}
      </tr>)}
      </tbody>
    </Table>
  </div>);
}
