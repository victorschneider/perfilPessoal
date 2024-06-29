const urlParams = new URLSearchParams(window.location.search);
const nomeRepositorio = urlParams.get('repo');
const URL_JSON_SERVER = 'http://localhost:3000'

function montaPaginaRepo(){

    fetch(`http://localhost:3000/repos/${nomeRepositorio}`)
        .then(res => res.json())
        .then(repositorio => {
            let topicosDiv = ""
            repositoriosGithub.topics.forEach(topico => {

                topicosDiv += `<button class="btn btn-primary m-1" type="submit">${topico}</button`
            })
            
            let conteudoDiv = 
            `
            <div class="border-bottom border-secondary-subtle border-3 mx-5 my-5">
                <h1>Repositório: ${repositorio.name}</h1>
            </div>
            <div class="container">
                <div class="row repo w-100">
                    <h3 class="text-primary">Descrição:</h3>
                    <p>${repositorio.description}</p>

                    <h3 class="text-primary">Data de Criação</h3>
                    <p>${new Date(repositorio.created_at).toLocaleDateString()}</p>

                    <h3 class="text-primary">Linguagem Principal:</h3>
                    <p>${repositorio.language}</p>

                    <h3 class="text-primary">Link de Acesso</h3>
                    <p><a href="${repositorio.html_url}">Link do Github</a></p>

                    <h3 class="text-primary">Tópicos</h3>
                    
                    <div class="w-100">
                        <p class="mx-5">
                            ${topicosDiv}
                        </p>   
                        <img class="icon float-sm-end mx-3" src="img/user.png" alt="icone de acessos">
                        <h2 class="float-sm-end"> ${repositorio.watchers_count}</h2>
                        <img class="icon float-sm-end mx-3" src="img/estrela.png" alt="icone de estrelas">
                        <h2 class="float-sm-end"> ${repositorio.stargazers_count}</h2>
                        <img class="icon float-sm-end mx-3" src="img/fork.png" alt="icone de forks">
                        <h2 class="float-sm-end"> ${repositorio.forks_count}</h2>
                    </div>
                </div>
            </div>
            ` 

            document.getElementById("divRepositorio").innerHTML = conteudoDiv;
        })
}

montaPaginaRepo();