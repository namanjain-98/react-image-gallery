import './App.css';
import { useState, useEffect } from 'react'
import { FlickerImage } from './components/FlickerImage';
import { Loader } from './components/Loader';
import HistoryList  from './components/HistoryList';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal'

function App() {

  const [Query, setQuery] = useState('');

  const [ImageList, setImageList] = useState([]);

  const [currentImg, setCurrentImg] = useState(null);


  //initialising a list in local storage
  let queryHistory;
  if (localStorage.getItem("queryHistory") === null) {
    queryHistory = [];
  }
  else {
    queryHistory = JSON.parse(localStorage.getItem("queryHistory"));
  }

//styling for modal
const modalStyle = {
  content: {
    border: "none",
    padding: "none",
    overflow: "hidden",
    background: "none",
    display: "flex",
    alignItems: "center",
    alignContent:"center",
    justifyContent:"center",
    margin:"none",
  },
  overlay: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,  
  }
};

//function to search images accoding to input by user in search bar using axios
  function SearchImages(query) {
    console.log("search")
    console.log(query)
    localStorage.setItem("queryHistory", JSON.stringify([...queryHistory,query]));
    const baseURL2 = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0af65637c5d7a611ef9b48629543c491&tags=${query}&per_page=15&format=json&nojsoncallback=1`
    axios.get(baseURL2).then((data) => {
      setImageList([...ImageList,...data.data.photos.photo]);
    })   
    return true;
  }

  //function to get recent images as default using axios
  function RecentImages() {
    console.log("recent called")
    const baseURL1 = "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=0af65637c5d7a611ef9b48629543c491&per_page=15&format=json&nojsoncallback=1"
    axios.get(baseURL1).then((data) => {
      setImageList([...ImageList,...data.data.photos.photo]);
    })  
    return true;
  }

  //common funnction to select between SearchImage and RecentImage
  function FetchImages(query=Query) {

    if (query===""|| query===undefined || query === null) {
      setImageList([]);
      RecentImages();
    } else {
      setImageList([]);
      SearchImages(query);
    }
    return true;
  }

  useEffect(() => {
    setImageList([]);
  FetchImages(Query);
  }, [Query]);



  Modal.setAppElement("#root");

  return (
    <div className="App">
      <header className="App-header">
        <h2>Image Search </h2>
        <div className="search-bar">
          <input type="text" onChange={(e) => setQuery(e.target.value)} /> 
        <HistoryList list={queryHistory} /* search={FetchImages} *//>
        </div>
      </header>

      <Modal
        contentLabel="Image preview"
        style={modalStyle}
        isOpen={!!currentImg}
        onRequestClose={() => setCurrentImg(null)}
        
      >
        <img className="img-preview" src={currentImg} onClick={()=>setCurrentImg(null)} alt="image preview" />
      </Modal>
      

      <InfiniteScroll
        dataLength={ImageList.length}
        next={FetchImages}
        hasMore={true}
        loader={<Loader />}
      >
       <div className="gallery">
        {
          ImageList.map(

            (img) => {
              return (
                <FlickerImage url={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_c.jpg`} key={img.id} handleClick={setCurrentImg} />
              )
            }
          )
        }
        </div>      
      </InfiniteScroll>
    </div>
  );
}

export default App;
