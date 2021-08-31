import {React, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Container, Navbar, ListGroup, Button, Row, Col, Image} from 'react-bootstrap';
import useAuth from '../UseAuth';

function Home() {
    const [login,logout] = useAuth(false);
    const [items,setItems] = useState([{
      name: 'user',
      image: '/user.png'  
    },
    {
      name: 'user',
      image: '/logo512.png'  
    },
    {
      name: 'user',
      image: '/user1.png'  
    },
    {
      name: 'user',
      image: '/user.png'  
    },
    {
      name: 'user',
      image: '/logo512.png'  
    },
    {
      name: 'user',
      image: '/user1.png'  
    },
    {
      name: 'user',
      image: '/user.png'  
    },
    {
      name: 'user',
      image: '/logo512.png'  
    },
    {
      name: 'user',
      image: '/user1.png'  
    },
    {
      name: 'user',
      image: '/user.png'  
    },
    {
      name: 'user',
      image: '/logo512.png'  
    },
    {
      name: 'user',
      image: '/user1.png'  
    }
    ]);

   const fetchMoreData = () => {
      // a fake async api call like which sends
      // 20 more records in .5 secs
      setTimeout(() => {
          setItems(items.concat(Array.from(items)))
      }, 500);
    };
  return (
    <Container>
      <Navbar>
  <Navbar.Brand href="#">Logo</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    <Button variant="secondary" onClick={logout}>Logout</Button>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
      <hr/>
      <h3>Infinite Scrolling</h3>
      <div id="scrollableDiv">
  {/*Put the scroll bar always on the bottom*/}
  <InfiniteScroll
  dataLength={items.length}
  next={fetchMoreData}
  hasMore={items.length<200}
  loader={<h4>Loading...</h4>}
>
    {items.map((_, index) => (
      <ListGroup>
      <ListGroup.Item>
      <Row>
    <Col xs={6} md={3}>
      <Image className="user-profile" src={_.image} roundedCircle />
    </Col>
    <Col xs={6} md={9}>
    <h4>{_.name} {index+1}</h4>
    </Col>
  </Row>
  </ListGroup.Item>
    </ListGroup>
    ))}
  </InfiniteScroll>
</div>
    </Container>
  );
}

export default Home;
