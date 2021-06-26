import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function HistoryList({ list , fetchImages }) {
    return (
        <div className="ListGroup">
             {
            list.slice(list.length-10,list.length).map(
  
              (item) => {
                return (
                  <div className="ListGroupItem active" onClick={(item)=>{fetchImages(item)}}> {item} </div>
                )
              }
            )
          }
        </div>
       
    )
}
