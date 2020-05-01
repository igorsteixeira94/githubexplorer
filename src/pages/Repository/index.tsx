import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './styles';
import imgLogo from '../../assets/logo.svg';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  closed_issues: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}
interface Issue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
  };
}
const Repository: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get<Repository>(`repos/${params.repository}`).then((response) => {
      setRepositories(response.data);
    });
    api.get<Issue[]>(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);
  return (
    <>
      <Header>
        <img src={imgLogo} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repositories && (
        <RepositoryInfo>
          <header>
            <img
              src={repositories.owner.avatar_url}
              alt={repositories.owner.login}
            />
            <div>
              <strong>{repositories.full_name}</strong>
              <p>{repositories.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repositories.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repositories.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repositories.open_issues_count}</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map((issue) => (
          <Link key={issue.id} to={issue.html_url} target="_blank">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Issues>
    </>
  );
};
export default Repository;
