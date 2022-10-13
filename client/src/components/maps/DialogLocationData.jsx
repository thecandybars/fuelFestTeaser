import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { theme } from "../../common/theme";
import styled from "styled-components";

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 100%;
    width: 60px;
    margin-right: 15px;
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
    "🚀 ~ file: DialogLocationData.jsx ~ line 5 ~ DialogLocationData ~ props",
    props
  );
  const apiURL = process.env.REACT_APP_API;
  let renderDialogInfo;
  if ((props.data.mapLocation.category = "vendor")) {
    renderDialogInfo = (
      <div>
        <StyledTitle>
          <img alt="logo" src={apiURL + "/" + props.data.info.logo} />
          <h2>{props.data.info.title}</h2>
        </StyledTitle>
        <StyledDesc>
          <h3>{props.data.info.descriptionShort}</h3>
          <p>{props.data.info.descriptionLong}</p>
        </StyledDesc>
        <StyledBottomInfo>
          <StyledInfo>
            <AccessTimeIcon style={{ fill: theme.black }} />
            <p>
              <span>OPEN </span>- Closes at {props.data.info.timeClose}
            </p>
          </StyledInfo>
          <StyledSeeMore>
            <OpenInNewIcon style={{ fill: theme.black }} />
            <p>See More</p>
          </StyledSeeMore>
        </StyledBottomInfo>
      </div>
    );
  }
  return (
    <div style={{ padding: "5px 20px" }}>
      <CloseIcon
        onClick={() => props.close()}
        style={{ margin: "auto", textAlign: "center" }}
      />
      {renderDialogInfo}
    </div>
  );
}
