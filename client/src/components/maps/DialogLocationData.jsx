import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { theme } from "../../common/theme";
import styled from "styled-components";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useNavigate } from "react-router-dom";
const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 100%;
    width: 60px;
    height: 60px;
    margin-right: 15px;
    object-fit: cover;
    object-position: center;
  }
  h2 {
    font-size: 2.3rem;
    color: ${(props) => props.theme.red};
  }
`;
const StyledDesc = styled.div`
  h3 {
    font-family: "Nunito";
    font-weight: bold;
    margin: 5px 0 10px;
  }
  p {
    font-family: "Nunito";
  }
`;
const StyledBottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;
const StyledInfo = styled.div`
  display: flex;
  font-family: "Nunito";
  font-size: 1.2rem;
  span {
    font-weight: bold;
    margin-left: 10px;
    color: ${(props) => props.theme.darkGreen};
  }
`;
const StyledSeeMore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-family: "Nunito";
    font-size: 0.7rem;
  }
`;

export default function DialogLocationData(props) {
  console.log(
    "🚀 ~ file: DialogLocationData.jsx ~ line 57 ~ DialogLocationData ~ props",
    props
  );
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API;
  const renderDialogInfo = (
    <div>
      <StyledTitle>
        <img alt="logo" src={apiURL + "/" + props.data.image} />
        <h2>{props.data.title}</h2>
      </StyledTitle>
      <StyledDesc>
        <h3>{props.data.descriptionShort}</h3>
        <p>{props.data.descriptionLong}</p>
      </StyledDesc>
      <StyledBottomInfo>
        <StyledInfo>
          <AccessTimeIcon style={{ fill: theme.black }} />
          <p>
            <span>OPEN </span>- Closes at {props.data.timeClose}
          </p>
        </StyledInfo>
        <StyledSeeMore
          onClick={() => navigate(props.data.url && props.data.url)}
        >
          <OpenInNewIcon style={{ fill: theme.black }} />
          <p>See More</p>
        </StyledSeeMore>
      </StyledBottomInfo>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "5px 20px 60px",
      }}
    >
      <DragHandleIcon
        onClick={() => props.close()}
        style={{ margin: "auto", textAlign: "center" }}
        color="darkGray"
      />
      {renderDialogInfo}
    </div>
  );
}
