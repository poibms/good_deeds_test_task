import React from 'react';
import { useSelector } from 'react-redux';
import { getDeedsByOwnerId } from '../../../store/deeds';
import Post from '../Post/Post';

const PostsList: React.FC<{ownerId: string}> = ({ownerId}) => {

  const posts = useSelector(getDeedsByOwnerId(ownerId));

  return (
    <div className='post_index'>
      {
        posts?.map((post) => (
          <Post post={post} key={post._id}/>
        ))
      }
    </div>
  )
}

export default PostsList;