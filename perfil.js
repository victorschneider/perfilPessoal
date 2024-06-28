const URL_perfil = 'https://api.github.com/users/victorschneider'
const URL_perfil_base = 'https://api.github.com/users'

function montaPerfil(){
    fetch(URL_perfil)
        .then(res => res.json())
        .then(dados => {
            const perfil = 
            `<div class="row row-cols-1">
                <div class="col-md-3 ">
                    <div class="">
                        <figure class="figure" id="fotoPerfil">
                            <img src="${dados.avatar_url}" alt="foto de perfil" class="img-fluid border border-light-subtle rounded p-2 ">
                        </figure>
                    </div>
                </div>

                <div class="col-9">
                    <div>
                        <h3 class="text-primary">${dados.name}</h3>
                        <p id="descricaoPerfil">${dados.bio}</p>
                        <p><b>Local: </b>${dados.location}</p>
                        <p><b>Site: </b><a href="https://github.com/victorschneider">github.com/victorschneider</a></p>
                    </div>

                    <div class="w-100">
                        <a href="https://www.instagram.com/schinasx/"><img src="img/instagram.png" alt="Icon Instagram"
                                class="icon mx-3"></a>
                        <a href="https://twitter.com/schinas16"><img src="img/twitter.png" alt="Icon X"
                                class="icon mx-3"></a>
                        <a href="https://www.linkedin.com/in/victor-schneider-do-vale-2b782a206/"><img
                                src="img/linkedin.png" alt="Icon Linkedin" class="icon mx-3"><a>

                        <img class="icon float-sm-end mx-3" src="img/user.png" alt="Icon views" >
                        <h2 class="float-sm-end">${dados.followers}</h2>
                    </div>
                </div>
            </div>`

            document.getElementById('perfilPessoal').innerHTML = perfil;
        })
}

function repositoriosGithub(){
    fetch(`${URL_perfil}/repos`)
        .then(res => res.json())
        .then(dados => {
            let repositorios = ''
            dados.forEach(repositorio => {
                 repositorios += 
                `<div class="col">
                    <div class="card">
                        <div class="card-body justify-content-between">
                            <h5 class="card-title">${repositorio.name}</h5>
                            <p class="card-text">${repositorio.description}</p>
                            <a href="repo.html?repo=${repositorio.name}" class="btn btn-primary mb-2">Acessar Repositório</a>
                            <div class="card-footer d-flex justify-content-between">
                                <span>
                                    <i class="bi bi-star-fill"></i> ${repositorio.stargazers_count}
                                </span>
                                <span>
                                    <i class="bi bi-eye-fill"></i> ${repositorio.watchers_count}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>`  
            })

            document.getElementById('repositorios').innerHTML = repositorios;
        })
}



function exibeColegas(){

    const perfis = [
        'chdbarbosa',
        'ieiou',
        'biguigas',
        'AndryMarques',
        'PratesVitor',
    ]

    let colegasDiv = ''
    perfis.forEach(amigo => {
        fetch(`https://api.github.com/users/${amigo}`)
            .then(res => res.json())
            .then(dados => {
                colegasDiv +=  
                    `<div class="col">
                        <div class="card h-100">
                            <img src="${dados.avatar_url}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${dados.name}</h5>
                                <p class="card-text">${dados.bio}</p>
                            </div>
                        </div>
                    </div>`

                document.getElementById('divColegas').innerHTML = colegasDiv;
                console.log(dados)

            })
    })
}

   

montaPerfil()
repositoriosGithub()
exibeColegas()

