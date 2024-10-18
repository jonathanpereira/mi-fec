import React, { useEffect, useState } from 'react';

import { getAuthors } from '../services/authors';
import { Author, Category } from '../common/interfaces';
import { getCategories } from '../services/categories';
import { addVideo } from '../services/videos';
import styles from './AddVideo.module.css';

import { useNavigate } from 'react-router-dom';

const AddVideo = () => {  
  const navigate = useNavigate();  
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategory] = useState<Category[]>([]);

  const videoNameRef = React.createRef<HTMLInputElement>();
  const videoAuthorRef = React.createRef<HTMLSelectElement>();
  const videoCategoryRef = React.createRef<HTMLSelectElement>();

  useEffect(() => {
    getAuthors().then(setAuthors);
    getCategories().then(setCategory);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const catIds = Array.from(videoCategoryRef.current?.selectedOptions || []).map(option => parseInt(option.value));
    const releaseDate = new Date().toISOString().slice(0, 10);

    addVideo(parseInt(videoAuthorRef.current?.value as string), {
      id: 0,
      name: videoNameRef.current?.value as string,
      catIds,
      formats: {
        one: { res: "1080p", size: 1000 }
        },
      releaseDate
    }).then(() => {
      navigate('/');
    });
  }

  return (
    <div>
      <h2>Add video</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Video name</label>
          <input type="text" ref={videoNameRef} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Video author</label>
          <select ref={videoAuthorRef} required className={styles.select}>
            <option value="" hidden>Select author</option>
            {authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Video category</label>
          <select ref={videoCategoryRef} multiple required className={styles.select}>
            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Submit</button>
          <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddVideo;