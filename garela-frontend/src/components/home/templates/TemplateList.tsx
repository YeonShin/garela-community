import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DummyTemplates from "./DummyTemplate";
import BasicProfileImg from "../../../imgs/basicProfile.png";
import templateImg from "../../../imgs/postImg.jpg";
import { formatTimeAgo } from "../../../Util";
import ProfileImg from "../../../imgs/profile.jpg";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  TemplateListType,
  TemplateType,
  UserInfoType,
  filterState,
  myInfoState,
  selectedCategoryState,
} from "../../../atom";
import TemplateDetail from "./TemplateDetail";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import noImage from "../../../imgs/noResult.png";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 74vh;
`;

const TemplateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  padding: 0px;
`;

const TemplateCreationForm = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  border: none;
  outline: none;
  background: ${(props) => props.theme.colors.surface};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const TemplateFilters = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 20px;
  margin-bottom: 0px;
`;

interface FilterLinkProps {
  active: boolean;
}

const FilterLink = styled.a<FilterLinkProps>`
  cursor: pointer;
  color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Divider = styled.hr`
  margin: 10px 10px;
  border: none;
  border-top: 1px solid #e5e5e5;
`;

const TemplateItem = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.surface};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const TemplateImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const TemplateInfo = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const TemplateTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 10px 0;

  white-space: nowrap;
`;

const TemplateDetails = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
`;

const TemplateActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 15px;
  position: relative;
  &:hover {
    background: ${(props) => props.theme.colors.primary};
    opacity: 0.8;
    color: white;
  }
`;

const ActionIcon = styled.span`
  margin-right: 5px;
`;

const NoResultContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NoResultImage = styled.img`
  width: 200px;
`;

const TemplateList: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useRecoilState(filterState);
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [templates, setTemplates] = useState<TemplateListType[]>([]);
  const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(myInfoState);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/templates", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTemplates(response.data);
    } catch (error) {
      console.error("Failed to fetch templates", error);
    }
  };
  useEffect(() => {
    fetchTemplates();
  }, []);

  const filteredTemplates = templates
    .filter((template) => {
      if (filter === "All") return true;
      if (filter === "Subscribed") return template.subscribed;
      if (filter === "Trending") {
        const today = new Date();
        const templateDate = new Date(template.createdAt);
        const diffTime = Math.abs(today.getTime() - templateDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }
      return false;
    })
    .sort((a, b) => {
      if (filter === "Trending") {
        return b.likes - a.likes;
      }
      return 0;
    })
    .filter((template) => {
      if (selectedCategory === "All") return true;
      return template.category === selectedCategory;
    });

  const openModal = (templateId: number) => {
    setSelectedTemplate(templateId);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    fetchTemplates();
    setIsModalOpen(false);
    setSelectedTemplate(null);
    document.body.style.overflow = "unset";
  };

  return (
    <BodyContainer>
      <TemplateCreationForm>
        <ProfileImage
          src={userInfo.profileImg ? userInfo.profileImg : BasicProfileImg}
          alt="Profile"
        />
        <Input
          type="text"
          placeholder="Write your post"
          onClick={() => navigate("/create/template")}
        />
      </TemplateCreationForm>
      <TemplateFilters>
        <FilterLink active={filter === "All"} onClick={() => setFilter("All")}>
          All
        </FilterLink>
        <FilterLink
          active={filter === "Subscribed"}
          onClick={() => setFilter("Subscribed")}
        >
          Subscribed
        </FilterLink>
        <FilterLink
          active={filter === "Trending"}
          onClick={() => setFilter("Trending")}
        >
          Trending
        </FilterLink>
      </TemplateFilters>
      <Divider />
      <TemplateContainer>
        {filteredTemplates.length === 0 && (
          <NoResultContainer>
            <NoResultImage src={noImage} />
            작성된 템플릿이 없습니다
          </NoResultContainer>
        )}
        {filteredTemplates.map((template) => (
          <TemplateItem
            key={template.templateId}
            onClick={() => openModal(template.templateId)}
          >
            <TemplateImage
              src={template.thumbnailImg ? template.thumbnailImg : noImage}
              alt="Template"
            />
            <TemplateInfo>
              <div style={{ display: "flex", width: "100%" }}>
                <ProfileImage
                  src={template.userImg ? template.userImg : BasicProfileImg}
                  alt="Profile"
                />
                <div>
                  <TemplateTitle>{template.title}</TemplateTitle>
                  <TemplateDetails>
                    {template.category} •{" "}
                    {formatTimeAgo(new Date(template.createdAt))}
                  </TemplateDetails>
                </div>
              </div>
              <TemplateActions>
                <Action>
                  <ActionIcon>👍</ActionIcon>
                  {template.likes}
                </Action>
                <Action>
                  <ActionIcon>👁️</ActionIcon>
                  {template.views}
                </Action>
              </TemplateActions>
            </TemplateInfo>
          </TemplateItem>
        ))}
      </TemplateContainer>



      {isModalOpen && selectedTemplate && (
        <TemplateDetail
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          templateId={selectedTemplate}
        />
      )}
    </BodyContainer>
  );
};

export default TemplateList;
