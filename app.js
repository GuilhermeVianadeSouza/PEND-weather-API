'use strict'

const botaoVerificarTempo = document.getElementById('search') //declarando o botão que futuramente será inserido no header após clicar em 2 das 3 opções;
const usuario = document.getElementById('usuario')//declarando o icone do usuario
const notificacao = document.getElementById('notificacao')//declarando o icone de notificação
const redesSociais = document.querySelectorAll('.fa-brands')// buscando todos os icones que tenham em sua composição fa-brands

function mostrarCabeçario(){ //Criando a primeira função de mostrar o cabeçario da tela
    const cabecario = document.getElementById('cabecario')

    function acessarPaginas(){ //Essa função dentro da principal de mostrar o cabeçario vai realizar a criação dos elementos textos que com links redirecionaram a outra página
        const navegacao = document.createElement('nav')
        navegacao.classList.add('nav')

        const linkGeneral = document.createElement('a')
        linkGeneral.textContent = 'General Forecast'
        linkGeneral.href = "./generalForecast.html"
        const link7Days = document.createElement('a')
        link7Days.textContent = '7 Days for week'
        link7Days.href = "./7daysforweek.html"
        const linkSupport = document.createElement('a')
        linkSupport.textContent = 'Support'
        linkSupport.href = "./support.html"
        
        navegacao.appendChild(linkGeneral)
        navegacao.appendChild(link7Days)
        navegacao.appendChild(linkSupport)

        return navegacao
    }

    const container = document.createElement('div')
    container.classList.add('notificacao')
    container.classList.add('usuario')

    const logo = document.createElement('img')
    logo.src = './img/logo.png'
    logo.alt = 'logo'

    const botaoLogin = document.createElement('button')
    botaoLogin.textContent = 'Login'
    botaoLogin.addEventListener('click', () => {
        alert('área em desenvolvimento')
    })


    container.appendChild(botaoLogin)
    container.appendChild(logo)
    cabecario.appendChild(acessarPaginas())
    cabecario.appendChild(container)
}

async function mostrarConteudoPrincipal(){
    const principal = document
}

mostrarCabeçario()