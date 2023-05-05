import { useState, useEffect } from 'react';
import { getEntries } from './api_calls';
import { Icon } from '@contentstack/venus-components';
// import '@contentstack/venus-components/build/main.css';
import ViewHotSpotDialogBox from './components/view_hotspots_dialog_box';
import './App.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [hotstops, setHotstops] = useState([]);
  const [viewDetailsDialogVisible, setViewDetailsDialogVisible] = useState(false);
  const [hotspotIndex, setHotspotIndex] = useState(Number);
  const [dialogBoxPosition, setDialogBoxPosition] = useState({ left: 0, top: 0 });

  // const handleHotspotClick = (event,id) => {
  //   setViewDetailsDialogVisible(true)
  //   setHotspotIndex(id);
  // };

  const handleHotspotClick = (event, id) => {
    const hotspot = hotstops.find(obj => obj.id === id);
    const dialogBoxWidth = 130; // Set the width of the dialog box here
    const dialogBoxHeight = 250; // Set the height of the dialog box here
  
    // Calculate the adjusted x and y positions for the dialog box
    let adjustedX = hotspot.x;
    let adjustedY = hotspot.y;
    console.log('hotspot x,hotspot y',adjustedX,adjustedY);
    console.log('image h,image w',image.width,image.height);
    if (hotspot.x > 500 - dialogBoxWidth) {
      adjustedX = 500 - dialogBoxWidth;
    }
    if (hotspot.y > 400 - dialogBoxHeight) {
      adjustedY = 400 - dialogBoxHeight;
    }
  
    setViewDetailsDialogVisible(true);
    setHotspotIndex(id);
    setDialogBoxPosition({ left: adjustedX, top: adjustedY });
  };
  

  const handleImageClick = (event) => {
    setViewDetailsDialogVisible(false)
  };

  useEffect(() => {
    const getData = async() => {
      const result = await getEntries('imagehotspot', 'blt2f5d9d462e6360fc', 'en-us');
      setImage(result['image']);
      setHotstops(Object.values(result['image']._metadata.extensions)[0][0].hotstops);
    }

    getData();
  }, [])

  // console.log(image);
  return (
    <div className="App">
      <img src={image != null ? image.url : ''} alt={image != null ? image.filename : 'image name'} onClick={handleImageClick} width={500} />
      {hotstops.map(({ id, x, y}) => (
                <Icon className='icon' onClick={(event) => handleHotspotClick(event,id)} key={id} icon="PurpleAdd" style={{ position: 'absolute', left: x, top: y, cursor: 'pointer' }} hover={true} />
            ))}
      {
        viewDetailsDialogVisible && (<ViewHotSpotDialogBox dialogBoxPosition = {dialogBoxPosition}  setViewDetailsDialogVisible = {setViewDetailsDialogVisible} data = {hotstops.find(obj => obj.id === hotspotIndex)} />)
        }
    </div>
  );
}

export default App;

