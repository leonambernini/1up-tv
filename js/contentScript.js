var CDN = 'https://1up-tv.vercel.app/';
var CDN_IMAGES = CDN + 'images/';
var IMG_BRAND = CDN_IMAGES + '1up-brand.png';


var init_tv = false;

var $treinos;
var $time;
var $cards;

function getCoach() {
    var coach = '';
    $cards.each( function() {
        var $this = $(this);
        var txt = $this.text();
        if( txt.indexOf('Professor:') >= 0 ){
            coach = txt.replace('Professor:', '').trim();
        }
    })
    return coach;
}

function getCheckins() {
    var checkins = '';
    $cards.each( function() {
        var $this = $(this);
        var txt = $this.text();
        if( txt.indexOf('Participantes:') >= 0 ){
            checkins = txt.replace('Participantes:', '').trim();
        }
    })
    return checkins;
}

function getClasses() {
    var classes = [];
    $cards.each( function() {
        var $this = $(this);
        var $card = $this.closest('.card-info');
        var txt = $this.text();
        if( txt.indexOf('CROSSFIT') >= 0 ){
            classes.push(`<span style="${$card.hasClass('card-selecionado') ? 'font-weight: bold!important; color: #fd7e14!important;' : 'color: #000!important;'} background: #fff; border-radius: 10px; margin: 5px; padding: 15px; display: block;">${txt.replace('- CROSSFIT', '').trim()}</span>`);
        }
    })
    return `<div class="d-flex">${classes.join('')}</div>`;
}

function events() {
    document.addEventListener('keydown', function(e) {
        var $items = $('.lb-info-wod-item');
        var $itemActive = $('.lb-info-wod-item.active');
        var $elementToShow = null;
        var index = parseInt($itemActive.data('index'));
        var nextIndex = index;
        var type = 'next';
        var qtd = $('.lb-info-wod-item').length - 1;

        var key = e.keyCode;
        if( key == 37 || key == 33 ){
            if( index == 0 ){
                nextIndex = qtd;
            }else{
                nextIndex = index - 1;
            }
            type = 'prev';
        }else if( key == 39 || key == 34 ){
            if( index == qtd ){
                nextIndex = 0;
            }else{
                nextIndex = index + 1;
            }
            type = 'next';
        }
        
        if( $('.lb-info-wod-item[data-index="'+nextIndex+'"]').length ){
            $elementToShow = $('.lb-info-wod-item[data-index="'+nextIndex+'"]');
        }else{
            $elementToShow = $('.lb-info-wod-item').first();
        }

        if( $elementToShow ){
            $items.removeClass('active').hide();
            $elementToShow.addClass('active').fadeIn();
        }
    });
}

function updateWodInfo() {
    $('.js-get-coach-name').html(getCoach());
    $('.js-get-alunos').html(getCheckins());
    $('.js-get-classes').html(getClasses());
}

function createTV() {

    var professor_atual = getCoach();
    $('body').append(`
        <div class="lb-custom-tv">
            <div class="lb-custom-tv-loader">
                <div class="lb-custom-tv-p-center">
                    <img src="${IMG_BRAND}?a=${Math.random()}" alt="TV" />
                    <div class="lb-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
            <div class="lb-custom-tv-tela-1">
                <!-- <img src="${CDN_IMAGES}${professor_atual}.png?a=${Math.random()}" width="" height="" class="lb-custom-tv-coach"> -->
                <div class="lb-custom-tv-p-top">
                    <img src="${IMG_BRAND}?a=${Math.random()}" width="" height="" class="lb-custom-tv-brand">

                    <div class="js-get-wod">
                        
                    </div>
                </div>
            </div>
            <div class="lb-custom-tv-tela-3">
                <iframe src="${CDN}tvexterna/tvexterna.html?a=${Math.random()}" id="lb-custom-tvexterna"></iframe>
            </div>
            <div class="lb-custom-tv-tela-4">
                <h2>DADOS</h2>
                <br />
                <h3 style="display: flex; align-items: center;">
                    <svg width="40px" height="40px" style="margin-right: 10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fd7e14" stroke-width="0.336"> <circle cx="10" cy="6" r="4" stroke="#fd7e14" stroke-width="1.5"></circle> <path d="M19 2C19 2 21 3.2 21 6C21 8.8 19 10 19 10" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 4C17 4 18 4.6 18 6C18 7.4 17 8 17 8" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M13 20.6151C12.0907 20.8619 11.0736 21 10 21C6.13401 21 3 19.2091 3 17C3 14.7909 6.13401 13 10 13C13.866 13 17 14.7909 17 17C17 17.3453 16.9234 17.6804 16.7795 18" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> </g><g id="SVGRepo_iconCarrier"> <circle cx="10" cy="6" r="4" stroke="#<svg viewBox=" 0="" 24="" 24"="" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="10" cy="6" r="4" stroke="#fd7e14" stroke-width="1.5"></circle> <path d="M19 2C19 2 21 3.2 21 6C21 8.8 19 10 19 10" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 4C17 4 18 4.6 18 6C18 7.4 17 8 17 8" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M13 20.6151C12.0907 20.8619 11.0736 21 10 21C6.13401 21 3 19.2091 3 17C3 14.7909 6.13401 13 10 13C13.866 13 17 14.7909 17 17C17 17.3453 16.9234 17.6804 16.7795 18" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> </g>" stroke-width="1.5"&gt;</circle> <path d="M19 2C19 2 21 3.2 21 6C21 8.8 19 10 19 10" stroke="#<svg viewBox=" 0="" 24="" 24"="" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="10" cy="6" r="4" stroke="#fd7e14" stroke-width="1.5"></circle> <path d="M19 2C19 2 21 3.2 21 6C21 8.8 19 10 19 10" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 4C17 4 18 4.6 18 6C18 7.4 17 8 17 8" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M13 20.6151C12.0907 20.8619 11.0736 21 10 21C6.13401 21 3 19.2091 3 17C3 14.7909 6.13401 13 10 13C13.866 13 17 14.7909 17 17C17 17.3453 16.9234 17.6804 16.7795 18" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> </g>" stroke-width="1.5" stroke-linecap="round"&gt;</path> <path d="M17 4C17 4 18 4.6 18 6C18 7.4 17 8 17 8" stroke="#<svg viewBox=" 0="" 24="" 24"="" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="10" cy="6" r="4" stroke="#fd7e14" stroke-width="1.5"></circle> <path d="M19 2C19 2 21 3.2 21 6C21 8.8 19 10 19 10" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 4C17 4 18 4.6 18 6C18 7.4 17 8 17 8" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M13 20.6151C12.0907 20.8619 11.0736 21 10 21C6.13401 21 3 19.2091 3 17C3 14.7909 6.13401 13 10 13C13.866 13 17 14.7909 17 17C17 17.3453 16.9234 17.6804 16.7795 18" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> </g>" stroke-width="1.5" stroke-linecap="round"&gt;</path> <path d="M13 20.6151C12.0907 20.8619 11.0736 21 10 21C6.13401 21 3 19.2091 3 17C3 14.7909 6.13401 13 10 13C13.866 13 17 14.7909 17 17C17 17.3453 16.9234 17.6804 16.7795 18" stroke="#<svg viewBox=" 0="" 24="" 24"="" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="10" cy="6" r="4" stroke="#fd7e14" stroke-width="1.5"></circle> <path d="M19 2C19 2 21 3.2 21 6C21 8.8 19 10 19 10" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 4C17 4 18 4.6 18 6C18 7.4 17 8 17 8" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> <path d="M13 20.6151C12.0907 20.8619 11.0736 21 10 21C6.13401 21 3 19.2091 3 17C3 14.7909 6.13401 13 10 13C13.866 13 17 14.7909 17 17C17 17.3453 16.9234 17.6804 16.7795 18" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round"></path> </g>" stroke-width="1.5" stroke-linecap="round"&gt;</path> </g></svg>
                    <span class="js-get-coach-name">${getCoach()}</span>
                </h5>
                <h3 style="display: flex; align-items: center;">
                    <svg  width="40px" height="40px" style="margin-right: 10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 14C21.2091 14 23 16 23 17.5C23 18.3284 22.3284 19 21.5 19H21M17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5M5 14C2.79086 14 1 16 1 17.5C1 18.3284 1.67157 19 2.5 19H3M7 11C5.34315 11 4 9.65685 4 8C4 6.34315 5.34315 5 7 5M16.5 19H7.5C6.67157 19 6 18.3284 6 17.5C6 15 9 14 12 14C15 14 18 15 18 17.5C18 18.3284 17.3284 19 16.5 19ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" stroke="#fd7e14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <span class="js-get-alunos">${getCheckins()}</span>
                </h3>
                <br />
                <h2>PRÓXIMAS AULAS</h2>
                <br />
                <h3 style="font-size: 24px;">CROSSFIT</h3>
                <div style="display: flex; align-items: center;">
                    <svg width="40px" height="40px" style="margin-right: 10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23 12C23 12.3545 22.9832 12.7051 22.9504 13.051C22.3838 12.4841 21.7204 12.014 20.9871 11.6675C20.8122 6.85477 16.8555 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12C3.00683 16.8555 6.85477 20.8122 11.6675 20.9871C12.014 21.7204 12.4841 22.3838 13.051 22.9504C12.7051 22.9832 12.3545 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" fill="#fd7e14"></path> <path d="M13 11.8812L13.8426 12.3677C13.2847 12.7802 12.7902 13.2737 12.3766 13.8307L11.5174 13.3346C11.3437 13.2343 11.2115 13.0898 11.1267 12.9235C11 12.7274 11 12.4667 11 12.4667V6C11 5.44771 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V11.8812Z" fill="#fd7e14"></path> <path d="M18 15C17.4477 15 17 15.4477 17 16V17H16C15.4477 17 15 17.4477 15 18C15 18.5523 15.4477 19 16 19H17V20C17 20.5523 17.4477 21 18 21C18.5523 21 19 20.5523 19 20V19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H19V16C19 15.4477 18.5523 15 18 15Z" fill="#fd7e14"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18 24C21.3137 24 24 21.3137 24 18C24 14.6863 21.3137 12 18 12C14.6863 12 12 14.6863 12 18C12 21.3137 14.6863 24 18 24ZM18 22.0181C15.7809 22.0181 13.9819 20.2191 13.9819 18C13.9819 15.7809 15.7809 13.9819 18 13.9819C20.2191 13.9819 22.0181 15.7809 22.0181 18C22.0181 20.2191 20.2191 22.0181 18 22.0181Z" fill="#fd7e14"></path> </g></svg>
                    <span class="js-get-classes" style="display: flex; gap: 10px;>${getClasses()}</span>
                </div>
            </div>

        </div>
    `);
    
    var INFO_WOD = [];
    var info_wod_index = 0;
    $.each( $treinos, function(){
        var $content = $(this).find('.text').eq(1);
        var $title = $(this).find('.text strong').eq(0);
        console.log($title.text())
        INFO_WOD.push(`
            <div class="lb-info-wod-item" data-index="${info_wod_index}" style="display: none;">
                <h2>${$title.text()}</h2>
                ${$content.html()}
            </div>
        `);

        info_wod_index++;
    });

    if( !$('.lb-custom-tv').is(':visible') ){
        return false;
    }
    
    $('.js-get-wod').html(`<div class="lb-center-box"><div class="lb-custom-brand"></div> <div class="lb-info-wod-items">${INFO_WOD.join('')}</div></div>`);

    $('.lb-custom-tv-loader').fadeOut();
    $('.lb-info-wod-item').removeClass('active').hide();
    $('.lb-info-wod-item').first().addClass('active').fadeIn();
}

function initApp(){
    $treinos = $('.conteudo-treino .item-treino');
    $time = $('.container-info > span.title-orange');
    $cards = $('.card-info .text-card');
    
    if( !init_tv && $treinos.length && $time.length && $cards.length ){
    
        init_tv = true;

        // Seleciona o elemento com jQuery
        var $time = $('.container-info > span.title-orange');
    
        // Cria uma instância do MutationObserver e define uma função de callback a ser executada quando as mutações são observadas
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                console.log('Mudança detectada!');
                updateWodInfo();
            });
        });
    
        var config = { 
            characterData: true, 
            childList: true, 
            subtree: true 
        };
    
        observer.observe($time[0], config);
    
        createTV();
        events();
    }
}

$(document).mousemove( function(){
    if( !init_tv ){
        initApp();
    }
})
$(window).scroll( function(){
    if( !init_tv ){
        initApp();
    }
})
