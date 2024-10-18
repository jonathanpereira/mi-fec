import type { ProcessedVideo } from '../common/interfaces';
import styles from './videos-table.module.css';
import { Button } from './button';

type VideosTableProps = {
  videos: ProcessedVideo[];
  onDelete: (videoId: number, authorId: number) => void;
};

export const VideosTable = ({ videos, onDelete }: VideosTableProps) => {
  const handleDelete = (videoId: number, authorId: number) => {
    onDelete(videoId, authorId);
  };
  
  return (
  <div className={styles.wrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Video Name</th>
          <th>Author</th>
          <th>Categories</th>
          <th>Highest quality format</th>
          <th>Release Date</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {videos.map((video) => (
          <tr key={video.id}>
            <td>{video.name}</td>
            <td>{video.author}</td>
            <td>{video.categories.join(', ')}</td>
            <td>{video.format}</td>
            <td>{video.releaseDate.toLocaleString()}</td>
            <td>
              {/* <Button info disabled title='Coming soon'>Edit</Button> */}
              <Button danger onClick={() => handleDelete(video.id, video.authorId)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)};
