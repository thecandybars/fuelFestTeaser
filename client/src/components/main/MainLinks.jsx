import React from "react";
import { Link } from "react-router-dom";
import carsImg from "../../img/mainLinks_cars.png";
import eventsImg from "../../img/mainLinks_events.png";
import vendorsImg from "../../img/mainLinks_vendors.png";
import sponsorsImg from "../../img/mainLinks_sponsors.png";
import mapsImg from "../../img/mainLinks_maps.png";
import walletImg from "../../img/mainLinks_wallet.png";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;
const Row1 = styled.div`
  padding: 5px 5px 0 5px;
  img {
    width: 100%;
    border-radius: 15px;
  }
`;
const Row2 = styled.div`
  display: flex;
  padding-top: 5px;
`;
const Col1 = styled.div`
  width: 35%;
  padding: 0 5px;
  img {
    border-radius: 15px;
  }
`;
const Col2 = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 65%;
  .smImg {
    width: 50%;
  }
  img {
    border-radius: 15px;
    padding-right: 5px;
  }
`;

export default function MainLinks() {
  return (
    <Container>
      <Row1>
        <Link to="/cars">
          <img src={carsImg} alt="cars" />
        </Link>
      </Row1>
      <Row2>
        <Col1>
          <Link to="/events">
            <img src={eventsImg} alt="events" />
          </Link>
        </Col1>
        <Col2>
          <div className="smImg">
            <Link to="vendors">
              <img src={vendorsImg} alt="vendors" />
            </Link>
          </div>
          <div className="smImg">
            <Link to="/sponsors">
              <img src={sponsorsImg} alt="sponsors" />
            </Link>
          </div>
          <div className="smImg">
            <Link to="/maps">
              <img src={mapsImg} alt="maps" />
            </Link>
          </div>
          <div className="smImg">
            <Link to="/wallet">
              <img src={walletImg} alt="wallet" />
            </Link>
          </div>
        </Col2>
      </Row2>
    </Container>
    // <div className={style.list_links}>
    //   <div className={style.row1}>
    //     <Link to="/cars">
    //       <img src={carsImg} alt="cars" />
    //     </Link>
    //   </div>
    //   <div className={style.row2}>
    //     <div className={style.col1}>
    //       <Link to="/events">
    //         <img src={eventsImg} alt="events" />
    //       </Link>
    //     </div>
    //     <div className={style.col2}>
    //       <div className="smImg">
    //         <Link to="vendors">
    //           <img src={vendorsImg} alt="vendors" />
    //         </Link>
    //       </div>
    //       <div className="smImg">
    //         <Link to="/sponsors">
    //           <img src={sponsorsImg} alt="sponsors" />
    //         </Link>
    //       </div>
    //       <div className="smImg">
    //         <Link to="/maps">
    //           <img src={mapsImg} alt="maps" />
    //         </Link>
    //       </div>
    //       <div className="smImg">
    //         <Link to="/wallet">
    //           <img src={walletImg} alt="wallet" />
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
// css
// .list_links {
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   margin: 0 auto;
// }
// .row1 {
//   padding: 5px 5px 0 5px;
// }
// .row1 img {
//   width: 100%;
//   border-radius: 15px;
// }
// .row2 {
//   display: flex;
//   padding-top: 5px;
// }
// .col1 {
//   width: 35%;
//   padding: 0 5px;
// }
// .col1 img {
//   border-radius: 15px;
// }
// .col2 {
//   display: flex;
//   justify-content: space-around;
//   flex-direction: row;
//   align-items: flex-start;
//   flex-wrap: wrap;
//   width: 65%;
// }
// .col2 .smImg {
//   width: 50%;
// }
// .col2 img {
//   border-radius: 15px;
//   padding-right: 5px;
// }
