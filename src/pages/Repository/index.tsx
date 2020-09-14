import React, {useEffect, useState} from 'react'; 
import { useRouteMatch, Link} from 'react-router-dom'; 

import { Header, RepositoryInfo, Issues } from './styles'; 
import logoImg from '../../assets/logo.svg'; 
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; 
import api from '../../services/api'; 

interface Repository {
  full_name: string; 
  description: string; 
  stargazers_count: number; 
  forks_count: number;
  open_issues_count: number; 
  owner: {
    login: string; 
    avatar_url: string; 
  }; 
}
interface Issue{
  id: number; 
  title: string; 
  html_url: string; 
  user: {
    login: string; 
  }
}

interface RepositoryParms {
  nameRepository: string; 
}
const Repository: React.FunctionComponent = () => {
  const [repository, setRepository] = useState< Repository | null >(null);  
  const [issues, setIssues] = useState<Issue[]>([]);  


  const { params } = useRouteMatch<RepositoryParms>(); 

  useEffect(() => {
    api.get(`repos/${params.nameRepository}`).then(response => {
      setRepository(response.data); 
    }); 

    api.get(`repos/${params.nameRepository}/issues`).then(response => {
      setIssues(response.data); 
      // const issue = response.data; 
      // setIssues([...issues, issue]); 
    }); 
  }, [issues, params.nameRepository]); 

  return ( 
    <>
    <Header>
      <img src={logoImg} alt="GitHub Explorer" />   
      <Link to="/">
      <FiChevronLeft size={16} />    
      Voltar
      </Link>
    </Header>  

    {repository && ( //condicional do typescript
          <RepositoryInfo> 
          <header> 
            <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul> 
            <li>
            <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
      
          </RepositoryInfo>
    )}

    <Issues>
      {issues.map(issue => (
         <a key={issue.id} href={issue.html_url}>
         <div>
           <strong>{issue.title}</strong>
           <p>{issue.user.login}</p>
         </div>
         <FiChevronRight /> 
       </a>
      ))}
    </Issues>
  </>
  ); 
}; 

export default Repository; 
