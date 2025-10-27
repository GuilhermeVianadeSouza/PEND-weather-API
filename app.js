'use strict'

document.addEventListener('DOMContentLoaded', () => {

    const botaoLogin = document.querySelector('.login-button');
    const botaoNotificacao = document.getElementById('notificacao');
    const redesSociais = document.querySelectorAll('.social-link');

    if (botaoLogin) {
        botaoLogin.addEventListener('click', () => {
            alert('Área em desenvolvimento');
        });
    }

    if (botaoNotificacao) {
        botaoNotificacao.addEventListener('click', () => {
            alert('Nenhuma notificação nova!');
        });
    }

    redesSociais.forEach(link => {
        link.addEventListener('click', () => {
            alert('Redirecionando para rede social...');
        });
    });  
document.addEventListener('DOMContentLoaded', () => {

    const apiKey = ''; // minha chave da api

    const map = L.map('map').setView([-23.5505, -46.6333], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    try {
        const urlCamadaRadar = `https://maps.weatherbit.io/v2.0/radar/latest/{z}/{x}/{y}.png?key=${apiKey}`;
        L.tileLayer(urlCamadaRadar, {
            attribution: '&copy; <a href="https://www.weatherbit.io/">Weatherbit.io</a>',
            opacity: 0.7
        }).addTo(map);
    } catch (e) {
        console.warn("Não foi possível carregar a camada de mapa da Weatherbit. Verifique seu plano de API.");
    }
    
    function buscarPrevisao(cidade) {
        const urlDadosAtuais = `https://api.weatherbit.io/v2.0/current?city=${cidade}&key=${apiKey}&lang=pt&units=M`;
    
        fetch(urlDadosAtuais)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da API: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const info = data.data[0];
                
                const cidadeNome = info.city_name;
                const pais = info.country_code;
                const temperatura = info.temp;
                const descricao = info.weather.description;
                const lat = info.lat;
                const lon = info.lon;

                document.querySelector('.info-text h2').textContent = `${cidadeNome}, ${pais}`;
                document.querySelector('.info-text h3').textContent = `${descricao} (${temperatura.toFixed(0)}°C)`;
                
                map.setView([lat, lon], 13);
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`<b>${cidadeNome}</b><br>${temperatura.toFixed(0)}°C, ${descricao}`)
                    .openPopup();
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                document.querySelector('.info-text h2').textContent = "Cidade não encontrada";
                document.querySelector('.info-text h3').textContent = "Por favor, tente novamente.";
            });
    }
    
    buscarPrevisao('Sao Paulo,BR');

});

document.addEventListener('DOMContentLoaded', () => {

    const apiKey = ''; // minha chave que deixarei em outro arquivo

    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');
    const countryInput = document.getElementById('country-input');

    if (typeof L === 'undefined') {
        console.error("ERRO: Biblioteca Leaflet (L) não foi carregada.");
        return;
    }
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    
    searchButton.addEventListener('click', (event) => {
        
        event.preventDefault(); 

      
        const cidade = cityInput.value;
        const pais = countryInput.value;

       
        if (!cidade) {
            alert('Por favor, digite o nome da cidade.');
            return;
        }

      
        atualizarUI(null, null, true); 
        
        
        buscarPrevisaoCompleta(cidade, pais);
    });

   
    async function buscarPrevisaoCompleta(cidade, pais) {
        

        const countryParam = pais ? `&country=${pais}` : '';
        const urlCurrent = `https://api.weatherbit.io/v2.0/current?city=${cidade}${countryParam}&key=${apiKey}&lang=pt&units=M`;
        const urlDaily = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cidade}${countryParam}&days=1&key=${apiKey}&lang=pt&units=M`;

        try {

            const [resCurrent, resDaily] = await Promise.all([
                fetch(urlCurrent),
                fetch(urlDaily)
            ]);

  
            if (!resCurrent.ok) throw new Error(`Erro na API Current: ${resCurrent.statusText}`);
            if (!resDaily.ok) throw new Error(`Erro na API Daily: ${resDaily.statusText}`);

            const dataCurrent = await resCurrent.json();
            const dataDaily = await resDaily.json();

           
            const infoCurrent = dataCurrent.data[0];
            const infoDaily = dataDaily.data[0];

            
            atualizarUI(infoCurrent, infoDaily, false);

        } catch (error) {
       
            atualizarUI(null, null, false); 
        }
    }

    /**
     * Função única que atualiza toda a interface do usuário (HTML)
     */
    function atualizarUI(current, daily, isLoading) {
        
        
        const currentTempEl = document.getElementById('current-temp');
        const maxTempEl = document.getElementById('max-temp');
        const minTempEl = document.getElementById('min-temp');
        const precipEl = document.getElementById('precip');
        const aqiEl = document.getElementById('aqi');
        const windSpeedEl = document.getElementById('wind-speed');
        const visibleEl = document.getElementById('visible');
        const uvEl = document.getElementById('uv');
        const iconEl = document.getElementById('weather-icon');

        
        if (isLoading) {
            const loadingText = '...';
            currentTempEl.textContent = loadingText;
            maxTempEl.textContent = loadingText;
            minTempEl.textContent = loadingText;
            precipEl.textContent = loadingText;
            aqiEl.textContent = loadingText;
            windSpeedEl.textContent = loadingText;
            visibleEl.textContent = loadingText;
            uvEl.textContent = loadingText;
            iconEl.src = '';
            return;
        }

  
        if (!current || !daily) {
            const errorText = 'N/A';
            currentTempEl.textContent = errorText;
            maxTempEl.textContent = errorText;
            minTempEl.textContent = errorText;
            precipEl.textContent = errorText;
            aqiEl.textContent = errorText;
            windSpeedEl.textContent = errorText;
            visibleEl.textContent = errorText;
            uvEl.textContent = errorText;
            iconEl.src = '';
            alert('Não foi possível encontrar os dados para esta localização. Tente novamente.');
            return;
        }

        currentTempEl.textContent = current.temp.toFixed(0);
        maxTempEl.textContent = daily.max_temp.toFixed(0);
        minTempEl.textContent = daily.min_temp.toFixed(0);
        precipEl.textContent = daily.precip.toFixed(0); 
        aqiEl.textContent = `${current.aqi} (${getAqiText(current.aqi)})`;
        windSpeedEl.textContent = current.wind_spd.toFixed(1);
        visibleEl.textContent = current.vis.toFixed(0);
        uvEl.textContent = daily.uv.toFixed(1); 

     
        const iconCode = current.weather.icon;
        iconEl.src = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;

     
        const lat = current.lat;
        const lon = current.lon;
        map.setView([lat, lon], 13);
        
  
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                layer.remove();
            }
        });

       
        L.marker([lat, lon]).addTo(map)
            .bindPopup(`<b>${current.city_name}</b><br>Atual: ${current.temp.toFixed(0)}°C`)
            .openPopup();
    }
    
   
    function getAqiText(aqi) {
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Reasonable';
        if (aqi <= 150) return 'Unhealthy (SG)';
        if (aqi <= 200) return 'Unhealthy';
        return 'Very Unhealthy';
    }

});

})