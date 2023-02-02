import React from 'react'

const Table = ({ data, columnTitles, renderItemValue }) => {
  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead className='table__header'>
          <tr>
            {columnTitles &&
              columnTitles.map((columnTitle, i) => (
                <th className='table__item-title' key={i}>
                  {columnTitle}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr className='table__item border-radius border-radius--5' key={i}>
              {renderItemValue(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
