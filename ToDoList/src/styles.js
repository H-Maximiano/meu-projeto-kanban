import styled from 'styled-components';

export const ContainerPricipal = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 30px;
  background-color: #e2e8f0;
  min-height: 100vh;
`;

export const ContainerStatus = styled.div`
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  width: 300px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  h2 {
    font-size: 16px;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
  }
`;

export const DivCard = styled.div`
  user-select: none;
  padding: 14px 16px;
  margin-bottom: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  p {
    margin: 0;
    color: #334155;
    font-size: 14px;
    font-weight: 500;
  }
`;