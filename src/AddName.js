import React from 'react'

const AddName = ({ names }) => {
  return (
    <div>
      {(names) => {
        const namesElements = [];
        names.forEach(names => {
          namesElements.push(<div key={names.id}>{names.title}</div>)
        });
        return namesElements;
      }};



      {/* {names.map((names) => {
        return <p>{names}</p>
      })} */}
    </div>
  );
};

// names.map((names) => names.title);

export default AddName;