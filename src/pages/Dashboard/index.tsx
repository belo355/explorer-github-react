import React, {useState, FormEvent} from 'react'; 

import {FiChevronRight} from 'react-icons/fi'; 
import logoImg from '../../assets/logo.svg'; 
import { Title, Form, Repositories } from './styles'

import api from '../../services/api'; 

interface Repository {
  full_name: string; 
  description: string; 
  owner: {
    login: string; 
    avatar_url: string; 
  }; 

}

const Dashboard: React.FunctionComponent = () => {
  const [newRepositorio, setNewRepositorio] = useState(''); 
  const [repositories, setRepositories] = useState<Repository[]>([]); 

  async function handleAddRepository(event:FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); 

    const response = await api.get<Repository>(`repos/${newRepositorio}`); 
    
    const repository = response.data; 
    

    setRepositories([...repositories, repository]); 
    setNewRepositorio(''); 
  } 

  return (
  <>
    <img src={logoImg} alt="Github Explorer"/>
    <Title>Explore repositórios no Github</Title>

    <Form onSubmit={handleAddRepository}>
      <input 
      value={newRepositorio}
      onChange={(e) => setNewRepositorio(e.target.value)}
      placeholder="Digite o nome do repositório"
      />
      <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
      {repositories.map(repository => (
         <a key={repository.full_name}>
         <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
         <div>
           <strong>{repository.full_name}</strong>
           <p>{repository.description}</p>
         </div>
         <FiChevronRight /> 
       </a>
      ))}
      
    </Repositories>

  </>
  ) 
}
export default Dashboard; 
