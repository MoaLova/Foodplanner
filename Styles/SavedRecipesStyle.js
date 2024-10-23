import styled from 'styled-components';

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
`;

export const RecipeCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  width: 300px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const RecipeTitle = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
`;

export const RecipeButton = styled.button`
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #ff4500;
  }
`;
