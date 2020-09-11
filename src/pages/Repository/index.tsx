import React from 'react'; 
import { useRouteMatch, Link} from 'react-router-dom'; 

import { Header, RepositoryInfo, Issues } from './styles'; 
import logoImg from '../../assets/logo.svg'; 
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; 

interface RepositoryParms {
  nameRepository: string; 
}
const Repository: React.FunctionComponent = () => {
  const { params } = useRouteMatch<RepositoryParms>(); 

  return ( 
    <>
    <Header>
      <img src={logoImg} alt="GitHub Explorer" />   
      <Link to="/">
      <FiChevronLeft size={16} />    
      Voltar
      </Link>
    </Header>  

    <RepositoryInfo> 
    <header> 
      <img src="https://avatars3.githubusercontent.com/u/69631?v=4" alt="Facebook"/>
      <div>
        <strong> titulo do repositorio </strong>
        <p>descricao aqui do repositorio</p>
      </div>
    </header>
    <ul> 
      <li>
        <strong>1808</strong>
        <span>Stars</span>
      </li>
      <li>
        <strong>1806</strong>
        <span>Forks</span>
      </li>
      <li>
        <strong>5541</strong>
        <span>Issues abertas</span>
      </li>
    </ul>

    </RepositoryInfo>

    <Issues>
    <Link key="" to="">
         <div>
           <strong>ss</strong>
           <p>aaaaaaa</p>
         </div>
         <FiChevronRight /> 
       </Link>
    </Issues>
  </>
  ); 
}; 

export default Repository; 
