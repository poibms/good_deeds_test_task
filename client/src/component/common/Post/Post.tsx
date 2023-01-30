import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeedsType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDeedById, getDeedsErrors, updateDeed } from '../../../store/deeds';
import BasicModal from '../../ui/Modal/Modal';
import { Paper } from '@mui/material';
import { Form, useForm } from '../../../hooks/useForm';
import InputField from '../../ui/InputField/InputField';
import Button from '../../ui/Button/Button';
import validatorConfig from './validatorConfig';

export type PostProps = {
  post: DeedsType,
  key: string,
}

const Post: React.FC<PostProps> = ({ post }) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialData = {
    title: post.title,
    description: post.description,
  }

  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const deedsError = useSelector(getDeedsErrors());
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      dispatch(updateDeed({...data, _id: post._id}));
      handleResetForm(e);
      if (!deedsError) {
        handleClose();
      }
    }
  };
  
  const deleteDeed = async () => {
    dispatch(deleteDeedById(post._id));
  }


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
              <EditIcon onClick={handleOpen} />
            </div>
            <div>
              <DeleteIcon onClick={deleteDeed}/>
            </div>
          </div>

      </div>
      
      <BasicModal open={open} handleClose={handleClose}>
        <div className="sign_form-wrapper">
          <Paper elevation={3} className='login_form-card form_card'>
            <h2>Изменить аккаунт</h2>
            <Form data={data} errors={errors} handleChange={handleInputChange}>
              <InputField name='title' label='Title' autoFocus />
              <InputField name='description' label='Description' autoFocus />
              <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
                Изменить запись
              </Button>
            </Form>
            {deedsError && <p className='form__enter-error'>{deedsError}</p>}
          </Paper>
        </div>
      </BasicModal>
      
    </div>
  )
}

export default Post