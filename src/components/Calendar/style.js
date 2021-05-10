import styled from 'styled-components'
import { fadeIn } from 'animations'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 200px;
  padding: 20px 10px 20px 10px;
  z-index: ${(props) => (props.visible ? 5 : -1)};

  opacity: 0;
  animation: ${(props) => (props.visible ? fadeIn : '')};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  position: absolute;
  left: 0;
  top: ${(props) => props.top || 0}px;
  background: white;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  border-radius: 4px;
`

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`

export const Title = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;

  &:hover {
    background: #eee;
    border-radius: 4px;
  }
`

export const Arrow = styled.div`
  flex: 0 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  align-items: center;
  justify-items: center;

  row-gap: ${(props) => props.rowGap || 0}px;
`

export const GridItem = styled.div`
  text-align: center;
  border-radius: 50%;

  line-height: ${(props) => props.size || 35}px;
  width: ${(props) => props.size || 35}px;

  color: ${(props) => (props.highlight ? '#db3d44' : 'black')};
  color: ${(props) => (props.active ? 'white' : '')};
  color: ${(props) => (props.disable ? '#eeeeee' : '')};

  background: ${(props) => (props.active ? ' #db3d44' : 'white')};
  font-weight: ${(props) => (props.active ? ' 700' : '400')};

  cursor: ${(props) => (props.clickable ? 'pointer' : '')};

  &:hover {
    background: ${(props) => (props.clickable ? '#eee' : '')};
  }
`

export const WeekDayItem = styled(GridItem)`
  font-size: 14px;
  font-weight: 700;
`
