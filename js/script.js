	$(function(){
		//Глобальные переменные
		var form = $('#add_user_box'),
			table = $('#table_users_box'),
			message = $('#message-box'),
			current = 0,
			userId = 0,
			errorMessage  = '<span class="error_message">Ошибка при добавлении пользователя!</span>',
			errorMessage2  = '<span class="error_message">Ошибка при удаление пользователя!</span>',
			validDatа = '<span class="valid_data">Пользователь был успешно добавлен!</span>',
			invalidDatа = '<span class="invalid_data">Ошибка!Пользователь не добавлен!</span>',
			validMessage  = '<span class="valid_message">Добавлен новый пользователь - </span>',
			deleteMessage  = '<span class="delete_message">Был удален пользователь - </span>',
			editMessage  = '<span class="edit_message">Данные пользователей были изменены </span>';


		//Блок добавления пользователей
		$('#add_user_button').on('click', function(event){
			 event.preventDefault();
			if($(form).is(':hidden')){
				$(form).show(500);
				$(this).removeClass('open-button').addClass('close-button')

			}else{
				$(form).hide(500);
				$(this).removeClass('close-button').addClass('open-button');
			}
		});


		//Проверка формы добавления пользователей
		$('#new_user_button').on('click', function(){
			var date = new Date();
			$('#add_user').find('input').each(function() {
				if($(this).val() === '' || $(this).val().length < 3){
					alertInValid()
					$(this).removeClass('ok').addClass('error');
				}
				else if($(this).hasClass('emailAdd')){
					var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
					if(pattern.test($('#mail').val())){
						$('#mail').removeClass('error').addClass('ok');
					}
					else{
						alertInValid()
						$('#mail').removeClass('ok').addClass('error');
					}
				}
				else if($(this).hasClass('loginAdd')){
					if($('.login').length !== 0){
						$('#table_users').find('.login').each(function() {
							var thiss = $(this).val();
							var a = $('#login').val();
							if(a === thiss){
								alertInValid()
								$('#login').removeClass('ok').addClass('error');						
								$('#error_login').animate({
									opacity : 'show'
								});
								return false;					
							}
							else{	
								$('#login').removeClass('error').addClass('ok');
							}						
						});
					}
					else{
						$('#login').removeClass('error').addClass('ok');
					}
				}
				else{											
					$(this).removeClass('error').addClass('ok');
				}				
			});

			if($('#add_user').find('input').hasClass('error')){
				current++;
				$('<div></div>').addClass('message-item').appendTo(message)
				$('.message-item:last').append('<span class="cur-message">' + current + '</span>' 
					+'<span class="time">'+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() + '</span>'
					+ errorMessage);
				return false;
			}
			else{
				addUser();
			}
		});


		//Функция вывода ошибки при добавлении
		function alertInValid(){
			$('#add_user span').remove();
			$(invalidDatа).appendTo('#add_user').animate({
				opacity : 'show',
			});
			setTimeout(function(){
	      		 numCounter('.message-item');
	    	}, 820);	
		}


		//Функция Добавление пользователей
		function addUser(){
			$('#add_user span').remove();
			$(validDatа).appendTo('#add_user').animate({
				opacity : 'show',
				});	
			var date = new Date();
			userId ++;
			current++;
			var userName = $('#name').val();
			var userLogin = $('#login').val();
			var userMail = $('#mail').val();
			var userPass = $('#pass').val();
			var userAccess = $('#access').val();
			$('<tr></tr>').addClass('tr' + userId).appendTo('#table_users');
			$('<td></td>').append($('<span class="id" </span>').text(userId)).appendTo('#table_users tr:last');
			$('<td></td>').append($('<input class="login" type="text" disabled/>').val(userLogin)).appendTo('#table_users tr:last');
			$('<td></td>').append($('<input class="name" type="text" disabled/>').val(userName)).appendTo('#table_users tr:last');
			$('<td></td>').append($('<input class="mail" type="text" disabled/>').val(userMail)).appendTo('#table_users tr:last');
			$('<td></td>').append($('<input class="pass" type="text" disabled/>').val(userPass)).appendTo('#table_users tr:last');
			$('<td></td>').append($('<input class="access" type="text" disabled/>').val(userAccess)).appendTo('#table_users tr:last');
			$('#table_users tr:last').append("<td class='editDate'>"+ '<a class="edit" href="#">EDIT</a>' +"</td>");
			$('#table_users tr:last').append("<td>"+ '<a class="del" href="#">DEL</a>' +"</td>");
			$('#table_users tr td:first-child').css('width', '50px');

			createDivItem();	
			$('.message-item:last').append('<span class="cur-message">' + current + '</span>' 
				+'<span class="time">'+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() + '</span>'
				+ validMessage + '<b>' + userLogin + '</b>');

			numCounter('#table_users tr');
		    numCounter('.message-item');
		};	


		//Анимация блока удаления
		$('#del_user_button').on('click', function(event){
			 event.preventDefault();
			if($('#delete_user_box').is(':hidden')){
				$('#delete_user_box').slideDown(300);
				$(this).removeClass('open-button').addClass('close-button');
			}
			else{
				$('#delete_user_box').slideUp(300);
				$(this).removeClass('close-button').addClass('open-button');
			}
		});

		
		//Удаление пользователей
		$('#delete_user_button').on('click', function(){
			current ++;
			var date = new Date();
			var idDelete = '.tr' + $('#delete').val();
			var userLogin= $(idDelete).find('.login').val();
			if ($(idDelete).length > 0){
				var conf = confirm('Удалить пользователя' +' ' + userLogin + '?');
				if(!conf) return false;
				$(idDelete).find('td').css('background', '#f44242');			
				$(idDelete).find('td').animate({
						'opacity' : '0'
					}, 800);

				setTimeout(function (){
					$(idDelete).remove();
				}, 800);				
				setTimeout(function(){
		      		 numCounter('#table_users tr');
		    	}, 820);
				current ++;
					createDivItem()
					$('.message-item:last').append('<span class="cur-message">' + current + '</span>' 
					+ '<span class="time">'+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() +
					'</span>' + deleteMessage + '<b>' + userLogin + '</b>');
				setTimeout(function(){
	      		 	numCounter('.message-item');
	    		}, 820);		
			}
			else if($('#delete').val() == ''){
				$('#error_no_user').animate({
					opacity : 'show',
				});
				createDivItem();
				$('.message-item:last').append('<span class="cur-message">' + current + '</span>' 
					+'<span class="time">'+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() + '</span>'
					+ errorMessage2);
	      		setTimeout(function(){
	      		 	numCounter('.message-item');
	    		}, 820);
	    	
			}
			else{
				$('#error_no_id').animate({
					opacity : 'show',
				});
				createDivItem()
				$('.message-item:last').append('<span class="cur-message">' + current + '</span>' 
					+'<span class="time">'+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() + '</span>'
					+ errorMessage2);
				setTimeout(function(){
	      		 	numCounter('.message-item');
	    		}, 820);
			}
		});


		//Анимация таблицы
		$('#show_user_button').on('click', function(event){
			 event.preventDefault();
			$("#table_users_box input").attr("disabled", "");
			if($(table).is(':hidden')){
				$(table).slideDown(300);
				$(this).removeClass('open-button').addClass('close-button').text('Скрыть всех пользователей');;
			}else{
				$(table).slideUp(300)
				$(this).removeClass('close-button').addClass('open-button').text('Показать всех пользователей');
			}
		});


		//Удаление пользователя из таблицы
		$(document).on('click', '.del',function(){
			var date = new Date();
			var userLogin = $(this).parents('tr').find('.login').val();
			var conf = confirm('Удалить пользователя' +' ' + userLogin+ '?');
			if(!conf) return false;
			var idDelete = $(this).parent().parent();
			$(idDelete).find('td').css('background', '#f44242');			
			$(idDelete).find('td').animate({
					'opacity' : '0'
				}, 800);

			setTimeout(function(){
				$(idDelete).remove();
			}, 800)
			setTimeout(function(){
		      	numCounter('#table_users tr');
		    	}, 820);
			current ++;
			createDivItem()
			$('.message-item:last').append('<span class="cur-message">' + current + '</span>' 
			+ '<span class="time">'+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() +
			'</span>' + deleteMessage + '<b>' + userLogin + '</b>');
			setTimeout(function(){
	      		 numCounter('.message-item');
	    		}, 820);
		});


		//редактирование пользователей
		$(document).on('click', '.edit',function(){
			current ++;
			$(this).parents('tr').find('input').removeAttr("disabled").end()
								 .children('td').not(':first-child, :last-child, .editDate').addClass('active_edit');
			$('#info-box').find('span').hide();				 
			$('#edit_user').animate({
					opacity : 'show',
				})				 
		});


		//сохранение информации пользователя
		$(document).on('click', '.activate-save',function() {
			current ++;
			$('#table_users input').attr('disabled', '');
			$('#table_users tr td').removeClass('active_edit');
			$('#info-box').find('span').hide()				 
			$('#save_user').animate({
					opacity : 'show',
				})
			setTimeout(function(){
	      		numCounter('.message-item');
	    		}, 820);	
			var date = new Date()
			createDivItem()
			$('.message-item:last').append('<span class="cur-message">' + current + '</span>' 
				+'<span class="time">'+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() + '</span>'
				+ editMessage);
		});


		//Анимация блока событий
		$('#mess_user_button').on('click', function(event){
			event.preventDefault();
			if($(message).is(':hidden')){
				$(message).slideDown(500);
				$(this).removeClass('open-button').addClass('close-button').text('Скрыть события');
			}
			else{
				$(message).slideUp(500);
				$(this).removeClass('close-button').addClass('open-button').text('Показать события');
			}
		});				


		//Создание элемента-обертки для каждого события
		function createDivItem(){
			$('<div></div>').addClass('message-item').appendTo(message);
		}
		

		//Очистка событий
		$(document).on('click','.clear_message_activate', function(){
			$('.message-item').css('background', '#f44242').animate({'opacity' : '0'});
			setTimeout(function(){
				$('.message-item').remove()
			}, 800)
			setTimeout(function(){
	      		numCounter('.message-item');
	    	}, 820);
	    	current = 0;				
		});

	
		//Убрать всплывающие ошибки в полях
		$('#error_no_id , #error_no_user, #error_login').hover(function(){
			$(this).animate({
				opacity : 'hide'
			});
		});


		//Активация и деактивация кнопок "сохранить и "очистить события"
		function numCounter(elem){
			if(elem == '#table_users tr'){
				($(elem).length > 1) 
					?
					$('.deactivate-save').removeClass().addClass('activate-save')
					:
					$('.activate-save').removeClass().addClass('deactivate-save');
			}
			else if(elem == '.message-item'){
				($(elem).length >= 1)
					?
					$('.clear_message_deactivate').removeClass().addClass('clear_message_activate')
					:
					$('.clear_message_activate').removeClass().addClass('clear_message_deactivate');
			}
		};


		//Визуальное оформление таблицы
		$('#table_users tr td:last-child').css('padding', '10px');
		$('#table_users tr').eq(1).css({
			'padding': '4px 0',
			'background': 'rgb(196, 196, 196)',
		});
		$('#table_users tr td:first-child').css('width', '50px')
	
	});	