const URL_perfil = 'https://api.github.com/users/victorschneider'
const URL_perfil_base = 'https://api.github.com/users'
const URL_JSON_SERVER_NOTICIAS = "http://localhost:3000/noticias"

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
            let imagensRepo = [
                "9c53d1ab-e135-4129-8e67-72d11dcfc3e4",
                "0e50b5c2-8825-47aa-ab5d-622ef3d24385",
                "8fab848a-e6c7-45dc-b07e-adff21a48b13",
                "0754e2e4-7e25-4207-9afa-c2a70a91589a", 
                "e38edd6d-f527-448a-beab-2a851bf2909a",
                "65780eab-dfab-4ac5-a50d-fbb838a2caa4",
                "584c5d57-d13c-47eb-80e3-5679664c6581"
            ]

            let i = 0;

            let repositorios = ''
            dados.forEach(repositorio => {
                    repositorios += 
                    `<div class="col">
                        <div class="card">
                            <div class="card-body justify-content-between m-0 p-0">
                                <img src="https://repository-images.githubusercontent.com/${repositorio.id}/${imagensRepo[i]}" class="w-100 p-0 m-0">
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                    <span>
                                        <img class="icon2 float-sm-end mx-3" src="img/estrela.png" alt="icone de estrela">
                                        <i class="bi bi-star-fill"></i> ${repositorio.stargazers_count}
                                    </span>
                                    <span>
                                        <img class="icon2 float-sm-end mx-3" src="img/user.png" alt="icone de acessos">
                                        <i class="bi bi-eye-fill"></i> ${repositorio.watchers_count}
                                    </span>
                            </div>
                            <div class="card-body justify-content-between">
                                <h5 class="card-title">${repositorio.name}</h5>
                                <p class="card-text">${repositorio.description || "Repositório sem descrição"}</p>
                                <a href="repo.html?repo=${repositorio.name}" class="btn btn-primary mb-2">Acessar Repositório</a>
                                
                            </div>
                        </div>
                    </div>` 
                    
                    i += 1;
            })
                    i = 0;

            document.getElementById('Repositorios').innerHTML = repositorios;
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


function carrosselNoticias(){
    fetch(`http://localhost:3000/noticias`)
        .then(res => res.json())
        .then(dados => {
        
            let conteudoCarrossel = ''
            let btnCarrossel = '<button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true"></button>'
            let numNoticias = 0;
            let isActive = ""
            let divConteudoCarrossel = document.getElementById("infoCarrossel")
            let divBtnCarrossel = document.getElementById('btnCarrossel')


            dados.forEach(noticia => {
                if(numNoticias == 0){
                    isActive = "active"
                }
                else{
                    isActive = ''
                }
                
                conteudoCarrossel +=    `<div class="carousel-item ${isActive}">
                                            <img src="${noticia.imagem_url}" class="d-block w-100" alt="${noticia.nome}">
                                            <a href="${noticia.url}" target="_blank">
                                                <div class="carousel-caption d-none d-md-block mensagemCarrossel">
                                                    <h5>${noticia.titulo}</h5>
                                                    <p>${noticia.metaDescricao}</p>
                                                </div>
                                            </a>
                                        </div>`
    
                divConteudoCarrossel.innerHTML = conteudoCarrossel;
                numNoticias++
            })

            for(let x = 1; x < numNoticias; x++){
                btnCarrossel += `<button type="button" data-bs-target="#carousel" data-bs-slide-to="${x}"></button>`
    
                divBtnCarrossel.innerHTML = btnCarrossel
            }
        })
            
}
   

carrosselNoticias();
montaPerfil()
repositoriosGithub()
exibeColegas()

