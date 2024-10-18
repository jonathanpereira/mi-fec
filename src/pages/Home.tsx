import { useEffect, useRef, useState } from 'react';

import type { ProcessedVideo } from '../common/interfaces';
import { deleteVideo, getVideos } from '../services/videos';
import { VideosTable } from '../components/videos-table';
import styles from './Home.module.css';

export default () => {
    const [videos, setVideos] = useState<ProcessedVideo[]>([]);
    const [displayedVideos, setDisplayedVideos] = useState<ProcessedVideo[]>([]);
    const inputSearchRef = useRef<HTMLInputElement>(null);

    const handleDelete = (videoId: number, authorId: number) => {    
      deleteVideo(videoId, authorId).then(() => {
        setVideos(videos.filter(video => video.id !== videoId));
        setDisplayedVideos(displayedVideos.filter(video => video.id !== videoId));
      });
    };
  
    const filteredVideos = () => {
      return videos.filter(video => 
          Object.values(video).some(value => 
              value.toString().toLowerCase().includes(inputSearchRef.current?.value.toLowerCase())
          )
      );
    };
    
    const onFilter = () => {
      setDisplayedVideos(filteredVideos());      
    }

    useEffect(() => {      
      getVideos().then((resp) => {        
        setVideos(resp);
        setDisplayedVideos(resp);
      });
    }, []);
  
    return (
      <div>
        <input ref={inputSearchRef} className={styles.searchInput} />
        <button onClick={onFilter} className={styles.searchButton}>Search</button>
        <VideosTable videos={displayedVideos} onDelete={handleDelete} />
      </div>
    );
  };
  

