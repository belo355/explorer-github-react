import React, {useState, useEffect, FormEvent} from 'react'; 
import {Link} from 'react-router-dom'; 

import {FiChevronRight} from 'react-icons/fi'; 
import logoImg from '../../assets/logo.svg'; 
import { Title, Form, Repositories, Error } from './styles'

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
  const [inputError, setInputError]  = useState(''); 
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@GithubExplorer:repositories'); 

    if(storageRepositories) {
      return JSON.parse(storageRepositories); 
    }
      return []; 
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
  }, [repositories]); 

  async function handleAddRepository(event:FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); 

    if (!newRepositorio) {
      setInputError('Digite um autor/nome do repositório'); 
      return; 
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepositorio}`); 
      const repository = response.data; 
      const repositoryValido = localStorage.getItem(repository.full_name); 
      console.log(repository.full_name); 
      console.log(repositoryValido); 

      //TODO: retirar add de itens duplicados
      setRepositories([...repositories, repository]); 
      setNewRepositorio(''); 
      setInputError(''); 
      
    } catch (error) {
      setInputError('Erro ao buscar repositório'); 
    }

  } 

  return (
  <>
    <img src={logoImg} alt="Github Explorer"/>
    <Title>Explore repositórios no Github</Title>

    <Form hasError={!!inputError} onSubmit={handleAddRepository}>
      <input 
      value={newRepositorio}
      onChange={(e) => setNewRepositorio(e.target.value)}
      placeholder="Digite o nome do repositório"
      />
      <button type="submit">Pesquisar</button>
    </Form>

    {/* apresentando error ao buscar um diretorio */}
    {inputError && <Error>{inputError}</Error>}

    <Repositories>
      {repositories.map(repository => (
         // eslint-disable-next-line jsx-a11y/anchor-is-valid
         <Link key={repository.full_name} to={`/repository/${repository.full_name}` }>
         <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
         <div>
           <strong>{repository.full_name}</strong>
           <p>{repository.description}</p>
         </div>
         <FiChevronRight /> 
       </Link>
      ))}
      
    </Repositories>

  </>
  ) 
}
export default Dashboard; 
