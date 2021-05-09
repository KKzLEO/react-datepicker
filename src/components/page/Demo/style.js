import styled from 'styled-components'
import { MdCheckCircle } from 'react-icons/md'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

export const Group = styled.div`
  margin-top: 20px;
`

export const CustomCalendarIcon = styled(MdCheckCircle)`
  color: rgba(0, 0, 0, 0.7);
`
