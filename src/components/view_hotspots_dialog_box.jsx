import React from 'react';
import '@contentstack/venus-components/build/main.css';
import { Button, FieldLabel, TextInput, Textarea } from '@contentstack/venus-components';
import './styles.css';

const ViewHotSpotDialogBox = function({dialogBoxPosition, setViewDetailsDialogVisible, data}){
  const handleExit = () => {
    setViewDetailsDialogVisible(false);
  }
  
  return (
    <div className='view-details-wrapper' style={{left: dialogBoxPosition.left, top: dialogBoxPosition.top}}>
      <div className="row">
        <Button className='exit-btn' onClick={handleExit}>X</Button>
      </div>
      <FieldLabel htmlFor="title" className='label'>Title :</FieldLabel>
      <TextInput disabled = {true} type = "string" value={data.content.title}/>
      <FieldLabel htmlFor="description" className='label'>Description :</FieldLabel>
      <Textarea disabled = {true} type = "string" value={data.content.description}/>
    </div>
  );
};


export default ViewHotSpotDialogBox;