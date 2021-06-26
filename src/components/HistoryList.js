import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function HistoryList({ list }) {
    return (
        <div className="ListGroup">
             {
            list.slice(list.length-10,list.length).map(
  
              (item) => {
                return (
                  <div className="ListGroupItem active" > {item} </div>
                )
              }
            )
          }
        </div>
       
    )
}
