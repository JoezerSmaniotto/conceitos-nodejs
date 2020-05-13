const express = require("express");
const cors = require('cors');

const { uuid } = require("uuidv4");

const app = express();
app.use(cors());

app.use(express.json());


const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => { // I
  const {id} = request.params;

  const repositoryUpdate = repositories.find( repository => repository.id === id);

  if(!repositoryUpdate){
    return response.status(400).send();
   
  }

  const {url,title,techs} = request.body;
  repositoryUpdate.url = url;
  repositoryUpdate.title = title;
  repositoryUpdate.techs= techs;
  
  return response.json(repositoryUpdate);
 
});

app.delete("/repositories/:id", (request, response) => { //I
  
  const {id} = request.params;
  const repositoryDeleteIndex = repositories.findIndex( repository => repository.id === id);

  if( repositoryDeleteIndex < 0 ){
    return response.status(400).send(); 
  }

  repositories.splice(repositoryDeleteIndex,1);
  return response.status(204).send(); // Resposta Sem conteudo

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repository  = repositories.find( repository => repository.id === id);
  
  if(!repository){
    return response.status(400).send();
  }
 
  repository.likes++;

  return response.json(repository)

});

module.exports = app;
