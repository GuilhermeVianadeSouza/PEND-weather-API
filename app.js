'use strict'

const botaoVerificarTempo = document.getElementById('search')
const usuario = document.getElementById('usuario')
const notificacao = document.getElementById('notificacao')
const redesSociais = document.querySelectorAll('.fa-brands')

function mostrarCabeçario(){
    const cabecario = document.getElementById('cabecario')

    const container = document.createElement('div')
    container.classList.add('notificacao')
    container.classList.add('usuario')

    const logo = document.createElement('img')
    logo.src = './img/logo.png'
    logo.alt = 'logo'

    const botaoLogin = document.createElement('login')


    container.appendChild(botaoLogin)
    container.appendChild(logo)
    cabecario.appendChild(container)
}

async function mostrarConteudoPrincipal(){
    const principal = document
}

mostrarCabeçario()