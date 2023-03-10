import React from 'react'
import './table.css'

function CommonTable({
    columns, data, onRowClick=null
}){
    return (
        <div className="table-container">
          <p
            style={{
              display: "flex",
            }}
          >
            {columns.map((column) => {
              return <div style={{ ...(column.sx || {}) }}>{column.name}</div>;
            })}
          </p>
          <div>
            {data.map((row) => {
              return (
                <div className="data-row-container">
                  {columns.map((column) => {
                    if (column.type === "file") {
                      return (
                        <div style={{ ...(column.sx || {}) }}>
                          <a href={row[column]} target="_blank" >
                            View
                          </a>
                        </div>
                      );
                    } else if (column.type === "date") {
                      return (
                        <div style={{ ...(column.sx || {}) }}>
                          {row[column.dataKey].split('T')[0]}
                        </div>
                      );
                    }
                    else if(column.type === 'button'){
                      return (
                        <div style={{ ...(column.sx || {}) }}>
                          <button
                          onClick={()=>onRowClick(row,'reject')}
                          className="reject-btn">Reject</button>
                          <button
                          onClick={()=>onRowClick(row,'accept')}
                          className="accept-btn">
                          Accept
                          </button>
                        </div>
                      );
                    }
                    else {
                      return (
                        <div style={{ ...(column.sx || {}) }}>
                          {row[column.dataKey]}
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        </div>
      );
}
export default CommonTable