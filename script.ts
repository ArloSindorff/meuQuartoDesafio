import fetch from 'node-fetch';
let pacotes: any[] = []



const consultarFetch = () =>{
    const endpoint: string = 'https://62361b7feb166c26eb2f488a.mockapi.io/pacotes'


    fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': "application/json"},
    })
    .then(response => response.json() as any)
    .then(result =>{
    let a:any = result
    let b:any[] = a
    
    for (let i = 0; i < b.length; i++) {
        pacotes[i] = b[i]
        console.log(pacotes[i]);
        
    }
    })
}
consultarFetch()


let sectionsCards:any = document.getElementById('sectionsCards')

const pegar = () =>{
    if(pacotes.length > 0) {
        let forData: Date;
        let dataFormatada:string
        let mensagem:string = ''
        for (let i = 0; i < pacotes.length; i++) {
            mensagem += `<div class='cards'> `
            mensagem += '<br>';
            mensagem += `<h3>${pacotes[i].nome}</h3>`
            mensagem += `<p class="descricaoDoP">${pacotes[i].descricao}</p>`
            forData = new Date(pacotes[i].data)
            dataFormatada = forData.toLocaleDateString('en-us')
            mensagem += `<h4 class="pacoteData">${dataFormatada}</h4>`
            mensagem += `<div class="editarExcluir">`
            mensagem += `<div class="cardEditar"><a href='#h2'><button class="editar" onclick='editar(${i})'>Editar</button></a></div>`
            mensagem += `<div class="cardExcluir"><button class="excluir" onclick='excluir(${i})'>Excluir</button></div>`
            mensagem += `</div>`
            mensagem += `</div>`
        }
        sectionsCards.innerHTML = mensagem
    }
}


let lugar:any = document.getElementById('lugar')
let box:any = document.getElementById('box')
let data:any = document.getElementById('data')
let texto:any = document.getElementById('texto')

let buttonCadastrar:any = document.getElementById('buttonCadastrar')

const cadastrar = () =>{
    if (data.value != null && texto.value != null && lugar.value != null) {
        pacotes.push({ data: data.value, descricao: texto.value, id: pacotes.length, nome: lugar.value, status: box.value });     
        pacotes[pacotes.length]
        data.value = ''
        lugar.value = ''
        texto.value = ''
        pegar()
    }
    else{
        console.log('deu erradin');
    }
}
buttonCadastrar.addEventListener('click', cadastrar)


let divCadastrar:any = document.getElementById('divCadastrar')

const editar = (i:any) =>{
    
    data.value = pacotes[i].data
    
    texto.value  = pacotes[i].descricao
    
    lugar.value = pacotes[i].nome
    divCadastrar.innerHTML = `<button class="editar2" onclick='editar2(${i})'>Editar</button>`
    console.log('executada');
    
}


const editar2 = (i:any) =>{
    if(data.value != null) {
        pacotes[i].data = data.value
    }

    if(texto.value != null) {
        pacotes[i].descricao = texto.value
    }

    if (lugar.value != null) {
        pacotes[i].nome = lugar.value
    }
    divCadastrar.innerHTML = `<div class="divButton" id="divCadastrar"><button onclick="cadastrar()" id="buttonCadastrar" class="cadastrar">Cadastrar</button></div>`
    pegar()
}


const excluir = (i:any) =>{
    pacotes.splice(i, 1)
    pegar()
}
