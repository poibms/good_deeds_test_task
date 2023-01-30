import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeedsType } from '../../../types/types';

const Post: React.FC<DeedsType> = ({ post }) => {
  
  return (
    <div className='post_list'>
      <div className='post_block'>
          <div className='post_title'>
            <p>{post.title}</p>
          </div>
          <div className='post_desc'>
            {post.description}
          </div>

          <div className='post_footer'>
            <div>
              <EditIcon />
            </div>
            <div>
              <DeleteIcon/>
            </div>
          </div>

      </div>
    </div>
  )
}

export default Post