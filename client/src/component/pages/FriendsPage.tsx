import React from 'react';
import { useDispatch } from 'react-redux';
import Container from '../common/Container/Container';
import FriendList from '../common/FriendList/FridenList';
import BasicTabs from '../ui/BasicTab/BasicTab';
import TabPanel from '../ui/TabPanel/TabPanel';


const FriendsPage = () => {
  const [value, setValue] = React.useState(0);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tab = [{label: 'Все Пользователи'}, {label: 'Ваши друзья'}]

  return (
    <Container>
      <BasicTabs value={value} handleChange={handleChange} tab={tab}>
        <TabPanel value={value} index={0}>
          <FriendList index={0}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FriendList index={1}/>
        </TabPanel>
      </BasicTabs>
    </Container>
  )
}

export default FriendsPage;
