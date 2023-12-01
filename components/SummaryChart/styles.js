import styled from "@emotion/styled";
import CardGiftcardOutlined from "@mui/icons-material/CardGiftcardOutlined";
import CardContent from "@mui/material/CardContent";

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
`;

export const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-right: 1.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem 5px 1rem 5px;
  font-size: 54px;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.bg4};

  @media screen and (max-width: 768px) {
  }
`;

export const StyledCardGiftcardOutlinedIcon = styled(CardGiftcardOutlined)`
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 3rem;
  color: ${({ theme }) => theme.text};
  transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms";
  user-select: "none";
`;
export const StyledCardContent = styled(CardContent)`
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-column-gap: 2.5rem;
  min-width: 22rem;
  background-color: ${({ theme }) => theme.bg1};
`;
