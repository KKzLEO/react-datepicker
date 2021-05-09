import styled from 'styled-components'
import { MdDateRange } from 'react-icons/md'

export const Container = styled.div`
  width: 300px;
  position: relative;
`

export const InputContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);

  &:focus {
    border-bottom: 2px solid #1976d2;
  }
`

export const Input = styled.input`
  flex: 1;
  border: none;
  padding: 5px 0;

  &:focus {
    outline: none;
  }
`

export const IconContainer = styled.div``

export const Icon = styled(MdDateRange)`
  flex: 0 0 30px;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
`

export const Label = styled.label`
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
`

export const Message = styled.div`
  font-size: 14px;
`

export const ErrorMessage = styled(Message)`
  color: #db3d44;
  font-size: 14px;
`
