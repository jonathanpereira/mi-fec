import { getCategories } from './categories';
import { getAuthor, getAuthors, updateAuthor } from './authors';
import { Author, Formats, ProcessedVideo, Video } from '../common/interfaces';

export const getVideos = async (): Promise<ProcessedVideo[]> => {  
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);

  const videos: ProcessedVideo[] = [];

  const getHighestResLabel = (formats: Formats) => {
    const highestQualityFormat = Object.keys(formats).reduce((bestFormatKey, currentKey) => {
      const currentFormat = formats[currentKey];
      const bestFormat = formats[bestFormatKey];

      if (currentFormat.size > bestFormat.size) {
        return currentKey;
      }

      if (currentFormat.size === bestFormat.size && parseInt(currentFormat.res) > parseInt(bestFormat.res)) {
        return currentKey;
      }

      return bestFormatKey;
    }, Object.keys(formats)[0])
  
    return `${highestQualityFormat} ${formats[highestQualityFormat].res}`;
  }

  authors.forEach((author) => {
    author.videos.forEach((video) => {
      const {id, name, catIds, releaseDate, formats} = video;
      const videoCategories = catIds.map(catId => categories.find(cat => cat.id === catId)?.name ?? '-');      

      const format = getHighestResLabel(formats);

      videos.push({
        id,
        name,
        author: author.name,
        authorId: author.id,
        categories: videoCategories,
        format,
        releaseDate
      });

    });
  });

  videos.sort((a, b) => a.name.localeCompare(b.name));

  return videos as ProcessedVideo[];
};

export const addVideo = async (authorId: number, video: Video) => {  
  const authors = await getAuthors();

  const greatestVideoId = authors.reduce((maxId, author) => {
    const authorMaxId = author.videos.reduce((authorMax, video) => {
      return video.id > authorMax ? video.id : authorMax;
    }, 0);
    return authorMaxId > maxId ? authorMaxId : maxId;
  }, 0);

  video.id = greatestVideoId + 1;

  const author = await Promise.resolve(getAuthor(authorId));
  
  author.videos.push(video);

  await updateAuthor(author);
}

export const deleteVideo = async (videoId: number, authorId: number): Promise<Author> => {
  const author = await getAuthor(authorId);

  author.videos = author.videos.filter(video => video.id !== videoId);

  return await updateAuthor(author);
}
