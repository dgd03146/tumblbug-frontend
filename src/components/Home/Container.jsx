import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { category } from '../../data';
import ListContainer from './ListContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { projectsActions } from '../../redux/projects-slice';

const Container = ({ onGetCategory }) => {
  const projects = useSelector((state) => state.projects.projects);

  const dispatch = useDispatch();

  const categoryName = useSelector(
    (state) => state.projects.category.categoryName
  );

  const handleGetCategory = (categoryname, value) => {
    // category 설정

    onGetCategory(categoryname, value);

    // dispatch(
    //   projectsActions.setCategory({
    //     categoryName: categoryname,
    //     value: value
    //   })
    // );
  };

  return (
    <>
      <CategoryWrapper>
        {category.map((it) => (
          <Category
            key={it.categoryName}
            onClick={() => {
              handleGetCategory(it.categoryName, it.value);
            }}
          >
            <CategoryIcon>
              <img src={it.url} alt="All" />
            </CategoryIcon>
            <CategoryText>{it.categoryName}</CategoryText>
          </Category>
        ))}
      </CategoryWrapper>
      {/* FIXME: 카테고리 네임 */}
      <CategoryNavigation>{categoryName}</CategoryNavigation>
      <ProjectsCounter>
        <ProjectsCount>{projects.length}</ProjectsCount>개의 프로젝트가
        있습니다.
      </ProjectsCounter>
      <ListContainer />
    </>
  );
};

export default Container;

const CategoryWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  /* padding: 0 1rem; */
  & :hover {
    font-weight: 700;
  }

  cursor: pointer;
`;

const Category = styled.div`
  text-align: center;
  padding: 20px 2rem;
  /* margin: 0 10px; */
  background-color: ${(props) => props.color};
  /* :active {
    background-color: rgba(240, 240, 240, 0.5);
  } */
  :hover {
    background-color: rgba(240, 240, 240, 0.5);
  }
  /* .clicked {
    background-color: rgba(240, 240, 240, 0.5);
  } */

  @media (max-width: 750px) {
    padding: 1rem;
  }

  @media (max-width: 550px) {
    padding: 0.5rem;
  }
  @media (max-width: 450px) {
    padding: 0.1rem;
  }
`;

const CategoryIcon = styled.div``;

const CategoryText = styled.div``;

const CategoryNavigation = styled.div`
  padding: 0 10px;
  margin: 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ProjectsCounter = styled.div`
  padding: 0 10px;
  font-size: 1.2rem;
  width: 100%;
  margin: 2.5rem 0;
`;

const ProjectsCount = styled.span`
  color: ${(props) => props.theme.mainColor};
`;
