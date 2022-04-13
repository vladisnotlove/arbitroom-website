// $(document).ready(function(){
//
//   // автовысота для overlay
//   let menu = document.querySelector('.side__menu');
//
//   $('.menu__open').on('click', function() {
//     $('.menu').addClass('active');
//     // автовысота для overlay
//     $('.overlay').css('height', `${menu.scrollHeight + 'px'}`);
//     $('body').css('overflow', 'hidden');
//     $('.menu').scrollTop(0);
//
//   });
//
//   $('.menu__close').on('click', function() {
//     $('.menu').removeClass('active');
//     $('body').css('overflow', '');
//   });
//
//   $(document).mouseup(function (e) {
//     var container = $('.side__menu');
//     if (container.has(e.target).length === 0){
//       $('.menu').removeClass('active');
//       $('body').css('overflow', '');
//     }
//   });
//
//   // notify
//
//   $('#notify').on('click', function() {
//     $('.notify').fadeToggle(600)
//   });
//
//   // реинвест
//
//   $(document).mouseup(function (e) {
//     var container = $(".reinvest");
//     if (container.has(e.target).length === 0){
//       $('.reinvest').fadeOut(600)
//     }
//   });
//
//   $('.trigger').on('click', function() {
//     $('.reinvest').fadeIn(600)
//   });
//
//   // таб1
//
//   $('.tab').on('click', function() {
//     $(this)
//       .addClass('tab_active').siblings().removeClass('tab_active')
//       .closest('body').find('div.tab__content').css('display', 'none').removeClass('tab__content_active').eq($(this).index()).fadeIn().addClass('tab__content_active');
//       $('.menu').removeClass('active');
//       $('body').css('overflow', '');
//
//       // прокрутка наверх
//       $('body, html').animate({
//         scrollTop: 0
//       }, 300);
//   });
//
//   // отображение мобильное первого экрана карточек
//
//   $('.tab:not(:first-child)').on('click', function() {
//     $('.header__cards').removeClass('firstScreenBigCardMobile')
//   })
//
//   $('.tab:first-child').on('click', function() {
//     $('.header__cards').addClass('firstScreenBigCardMobile')
//   })
//
//   // таб2
//
//   $('.charttimechoose').on('click', function() {
//     $(this)
//       .addClass('charttimechoose_active').siblings().removeClass('charttimechoose_active')
//       .closest('div.container').find('div.charttime').removeClass('charttime_active').eq($(this).index()).addClass('charttime_active');
//   });
//
//   $('.currency').on('click', function() {
//     $(this)
//       .addClass('currency_active').siblings().removeClass('currency_active')
//       .closest('div.container').find('div.deposit__currency').removeClass('deposit__currency_active').eq($(this).index()).addClass('deposit__currency_active');
//   });
//
//
//   $('.t2').on('click', function() {
//     $(this)
//       .addClass('choose_active').siblings().removeClass('choose_active')
//       .closest('div.container').find('div.c2').removeClass('tab__subcontent_active').eq($(this).index()).addClass('tab__subcontent_active');
//   });
//
//   // таб3
//
//   $('.tariff__choose').on('click', function() {
//     $(this)
//       .addClass('tariff__choose_active').siblings().removeClass('tariff__choose_active');
//   });
//
//   $('.t3').on('click', function() {
//     $(this)
//       .addClass('choose_active').siblings().removeClass('choose_active')
//       .closest('div.container').find('div.c3').removeClass('tab__subcontent_active').eq($(this).index()).addClass('tab__subcontent_active');
//   });
//
//   // t4
//
//   $('.line__profile').on('click', function() {
//     $(this)
//       .addClass('line__profile_active').siblings().removeClass('line__profile_active')
//       .closest('div.container').find('div.line__content').removeClass('line__content_active').eq($(this).index()).addClass('line__content_active');
//   });
//
//   $('.t5').on('click', function() {
//     $(this)
//       .addClass('choose_active').siblings().removeClass('choose_active')
//       .closest('div.container').find('div.c5').removeClass('tab__subcontent_active').eq($(this).index()).addClass('tab__subcontent_active');
//   });
//
//   // таб6
//
//   $('.withdraw').on('click', function() {
//     $(this)
//       .addClass('withdraw_active').siblings().removeClass('withdraw_active');
//   });
//
//   $('.t6').on('click', function() {
//     $(this)
//       .addClass('choose_active').siblings().removeClass('choose_active')
//       .closest('div.container').find('div.c6').removeClass('tab__subcontent_active').eq($(this).index()).addClass('tab__subcontent_active');
//   });
//
//   $('.t8').on('click', function() {
//     $(this)
//       .addClass('choose_active').siblings().removeClass('choose_active')
//       .closest('div.container').find('div.c8').removeClass('tab__subcontent_active').eq($(this).index()).addClass('tab__subcontent_active');
//   });
//
//   $('.tab__pagination-item').on('click', function() {
//     $(this)
//       .addClass('tab__pagination-item_active').siblings().removeClass('tab__pagination-item_active');
//   });
//
//   // переход к последнему сообщению чата
//
//   const lastMessage = document.querySelectorAll('.chat__content-inside');
//     lastMessage.forEach(i => {
//       i.scrollTop = i.scrollHeight;
//   });
//
//   // таб10
//
//   $('.chat-choose').on('click', function() {
//     $(this)
//       .addClass('chat__profile_active').siblings().removeClass('chat__profile_active')
//       .closest('div.container').find('div.chat__content').removeClass('chat__content_active').eq($(this).index()).addClass('chat__content_active');
//
//       // прокрутка чата вниз
//
//     const lastMessage = document.querySelectorAll('.chat__content-inside');
//     lastMessage.forEach(i => {
//       i.scrollTop = i.scrollHeight;
//     });
//
//     let chat = document.querySelector('.chat__content');
//     if (document.documentElement.clientWidth < 860) {
//       $(this)
//       .addClass('chat__profile_active').siblings().removeClass('chat__profile_active')
//       .closest('div.container').find('div.chat__content').removeClass('chat__content_active').eq($(this).index()).addClass('chat__content_active');
//       $('.chat__overlay').addClass('chat__overlay_active');
//       $('body').css('overflow', 'hidden');
//     }
//   });
//
//   $('.back').on('click', function() {
//     $('.chat__overlay').removeClass('chat__overlay_active');
//     $('.header').css('height', '');
//
//   });
//
//     // прокрутка чата вниз при нажатии на контакты сбоку
//
//     $('.to_contacts').on('click', function() {
//         const lastMessage = document.querySelectorAll('.chat__content-inside');
//         lastMessage.forEach(i => {
//           i.scrollTop = i.scrollHeight;
//         });
//
//
//     });
//
//
//     // переходы с кнопок на странице
//
// document.getElementsByClassName('tab__1-block3-head-subdescr')[0].addEventListener('click', function() {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth"
//   });
//   document.querySelectorAll('.to_partners').forEach(i => {
//     i.click();
//   });
// });
//
//
//
//
// let operations = document.querySelectorAll('.from_operations');
//   operations.forEach(i => {
//     i.addEventListener('click', function() {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//       });
//       document.querySelectorAll('.to_history').forEach(i => {
//         i.click();
//       });
//   });
// });
//
//
//
// let input = document.getElementById('avatar'),
//     label = document.getElementById('avatarLabel');
//
//   input.addEventListener('change', function (e) {
//     if (this.files.length >= 1) {
//       label.innerText = 'Файл выбран';
//     }
// });
//
// // копировать при нажатии
//
// const text = document.getElementById('copyInput'),
//     copyButton = document.getElementById('copyButton');
//
//   copyButton.addEventListener('click', function() {
//     text.select();
//     document.execCommand('copy');
// });
//
//
// // dropdown
//   // закрытие селекта при клике вне его
//
//   $(document).mouseup(function (e) {
//     var container = $(".dropdown");
//     if (container.has(e.target).length === 0){
//       $('#myDropdown').removeClass('show');
//       $('.dropbtn img').removeClass('rotate');
//     }
//   });
//
//   $('.dropdown').on('click', function() {
//     $('#myDropdown').toggleClass('show');
//     $('.dropbtn img').toggleClass('rotate');
//   });
//
//   $('.dropdown').on('click', function() {
//     $('#myDropdown-2').toggleClass('show');
//     $('.dropbtn img').toggleClass('rotate');
//   });
//
//   $('.dropdown').on('click', function() {
//     $('#myDropdown-3').toggleClass('show');
//     $('.dropbtn img').toggleClass('rotate');
//   });
//
//   $('.dropdown4').on('click', function() {
//     $('#myDropdown-4').toggleClass('show4');
//     $('.dropbtn4 img').toggleClass('rotate4');
//   });
//
//   $('.dropdown5').on('click', function() {
//     $('#myDropdown-5').toggleClass('show');
//     $('.dropbtn5 img').toggleClass('rotate5');
//   });
//
//   $('.choose').each(function(i) {
//     $(this).on('click', function() {
//       $('.dropbtn span').text($('.choose').eq(i).text());
//       $('.dropbtn img').css('transform', '');
//     });
//   });
//
//   $('#myDropdown-5').find($('.choose')).each(function(i) {
//     $(this).on('click', function() {
//       $('.dropbtn5 span').text($('.choose').eq(i).text());
//       $('.dropbtn5 img').css('transform', '');
//     });
//   });
//
//   $('.line__profile').each(function(i) {
//     $(this).on('click', function() {
//       $('.dropbtn4 span').text($('.line__profile-name').eq(i).text());
//       $('.dropbtn4 img').css('transform', '');
//     });
//   });
//
//   $(document).mouseup(function (e) {
//     var container = $(".dropdown4");
//     if (container.has(e.target).length === 0){
//       $('#myDropdown-4').removeClass('show4');
//       $('.dropbtn4 img').removeClass('rotate4');
//     }
//   });
//
//   $(document).mouseup(function (e) {
//     var container = $(".dropdown");
//     if (container.has(e.target).length === 0){
//       $('#myDropdown-3').removeClass('show');
//       $('.dropbtn img').removeClass('rotate');
//     }
//   });
//
//   $(document).mouseup(function (e) {
//     var container = $(".dropdown5");
//     if (container.has(e.target).length === 0){
//       $('#myDropdown-5').removeClass('show');
//       $('.dropbtn5 img').removeClass('rotate5');
//     }
//   });
//
//   // выбор первой строки в списке
//
//     $('.to_materials').on('click', function() {
//     if ($('.dropdown-content').hasClass('show')) {
//       $('.tab__5').find($('.t5:first-child')).click();
//     }
//     else {
//       $('.tab__5').find($('.t5:first-child')).click().click();
//     }
//
//   });
//
//   $('.to_history').on('click', function() {
//     $('.tab__8').find($('.t8:first-child')).click().click();
//   });
//
//   $('.to_tariffs').on('click', function() {
//     $('.tab__3').find($('.t3:first-child')).click().click();
//   });
//
//
//   // тарифные карточки
//
//
//   $('.s').on('click', function() {
//     if (document.documentElement.clientWidth < 860) {
//       $('.tariff__card-body_s').slideToggle(1000);
//       $('.tariff__card-body_m').slideUp(1000);
//       $('.tariff__card-body_l').slideUp(1000);
//       $('.s').toggleClass('br22');
//       $('.m').addClass('br22');
//       $('.l').addClass('br22');
//       $('.tariff__arrow_s img').toggleClass('rotate90');
//       $('.tariff__arrow_m img').removeClass('rotate90');
//       $('.tariff__arrow_l img').removeClass('rotate90');
//     }
//   });
//
//   $('.m').on('click', function() {
//     if (document.documentElement.clientWidth < 860) {
//       $('.tariff__card-body_s').slideUp(1000);
//       $('.tariff__card-body_m').slideToggle(1000);
//       $('.tariff__card-body_l').slideUp(1000);
//       $('.s').addClass('br22');
//       $('.m').toggleClass('br22');
//       $('.l').addClass('br22');
//       $('.tariff__arrow_m img').toggleClass('rotate90');
//       $('.tariff__arrow_s img').removeClass('rotate90');
//       $('.tariff__arrow_l img').removeClass('rotate90');
//     }
//   });
//
//   $('.l').on('click', function() {
//     if (document.documentElement.clientWidth < 860) {
//       $('.tariff__card-body_s').slideUp(1000);
//       $('.tariff__card-body_m').slideUp(1000);
//       $('.tariff__card-body_l').slideToggle(1000);
//       $('.s').addClass('br22');
//       $('.m').addClass('br22');
//       $('.l').toggleClass('br22');
//       $('.tariff__arrow_l img').toggleClass('rotate90');
//       $('.tariff__arrow_s img').removeClass('rotate90');
//       $('.tariff__arrow_m img').removeClass('rotate90');
//     }
//   });
//
//     // promo стрелочка
//
//   $('.promo__more').on('click', function() {
//     $(this)
//       .closest('.promo__more').find('img').toggleClass('rotate')
//       .closest('.tab__7-block-text').find('.promo__descr').toggleClass('mh500');
//
//   });
//
//
//   $('input[type="range"]').rangeslider({polyfill : false});
//
//
//   // график
//
//
//   new Morris.Area({
//     element: 'myfirstchart',
//     data: [
//       { time: '1', line1: 0.2, line2: 0.2 },
//       { time: '2', line1: 2, line2: 3 },
//       { time: '3', line1: 3, line2: 6 },
//       { time: '4', line1: 5, line2: 2 },
//       { time: '5', line1: 8, line2: -3 },
//       { time: '6', line1: 5, line2: 3 },
//       { time: '7', line1: 6, line2: -1 },
//       { time: '8', line1: 7, line2: 4 },
//       { time: '9', line1: 8, line2: 10 }
//     ],
//     xkey: 'time',
//     ykeys: ['line1', 'line2'],
//     label: ['none'],
//     lineColors: ['#CEE44A', '#CE4374'],
//     fillOpacity:['0.1'],
//     grid: false,
//     axes: false,
//     padding: 1
//   });
//
// });
