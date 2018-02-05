// jQuery CEP Correios v1.1
// GitHub: https://github.com/webmaniabr/jQuery-CEP-Correios
// Author: WebmaniaBR
// Author URI: webmaniabr.com
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function( $ ){

    correios = {
        init: function( app_key, app_secret ) {
            window.correios_app_key = app_key;
            window.correios_app_secret = app_secret;
        }
    }

   $.fn.correios = function( endereco, bairro, cidade, uf, loading, readonly, numero ) {

       var err;
       if(typeof correios_app_key === 'undefined') { console.log('Informe o app_key da sua aplicação dos Correios.'); err = true; }
       if(typeof correios_app_secret === 'undefined') { console.log('Informe o app_secret da sua aplicação dos Correios.'); err = true; }
       if (err) return false;

       window.c_endereco = endereco;
       window.c_bairro = bairro;
       window.c_cidade = cidade;
       window.c_uf = uf;
       window.c_loading = loading;
       window.c_readonly = readonly;
       window.c_numero = numero;

       $(this).on('keyup', function(){

           cep = $(this).val().replace(/[^0-9]/g,'');

           if (cep.length == 8){

                if (localStorage.getItem('correios_request')) {

                  date = localStorage.getItem('correios_request');
                  current_time = new Date().getTime();
                  between = Math.round((current_time - date) / 1000);
                  if (between <= 5) return false;

                  localStorage.removeItem('correios_request');
                  localStorage.setItem('correios_request', new Date().getTime());

                } else {

                  localStorage.setItem('correios_request', new Date().getTime());

                }

                if (c_loading) $( c_loading ).show();

                $.getJSON( "https://webmaniabr.com/api/1/cep/"+cep+"/?app_key="+correios_app_key+"&app_secret="+correios_app_secret, function( data ) {

                    if (c_loading) $( c_loading ).hide();
                    if (c_endereco || $( endereco ).val()) {

                      $( endereco ).val( data.endereco );
                      if (typeof c_readonly === 'boolean' && c_readonly == true && data.endereco) $( endereco ).attr('readonly', 'readonly');
                      else $( endereco ).removeAttr('readonly');

                    }
                    if (c_bairro || $( bairro ).val()) {

                      $( bairro ).val( data.bairro );
                      if (typeof c_readonly === 'boolean' && c_readonly == true && data.bairro) $( bairro ).attr('readonly', 'readonly');
                      else $( bairro ).removeAttr('readonly');

                    }
                    if (c_cidade || $( cidade ).val()) {

                      $( cidade ).val( data.cidade );
                      if (typeof c_readonly === 'boolean' && c_readonly == true && data.cidade) $( cidade ).attr('readonly', 'readonly');
                      else $( cidade ).removeAttr('readonly');

                    }
                    if (c_uf || $( uf ).val()) {

                      // Verify if select options is set as default Brazilian state (Ex.: PR)
                      // If is not, compare name of each state and get the correct option value
                      first_value = $(uf+' option:eq(2)').val();

                      if (first_value.length > 2){

                        var states = {AC:"Acre",AL:"Alagoas",AP:"Amapá",AM:"Amazonas",BA:"Bahia",CE:"Ceará",DF:"Distrito Federal",ES:"Espírito Santo",GO:"Goiás",MA:"Maranhão",MT:"Mato Grosso",MS:"Mato Grosso do Sul",MG:"Minas Gerais",PA:"Pará",PB:"Paraíba",PE:"Pernambuco",PI:"Piauí",PR:"Paraná",RJ:"Rio de Janeiro",RN:"Rio Grande do Norte",RS:"Rio Grande do Sul",RO:"Rondônia",RR:"Roraima",SC:"Santa Catarina",SP:"São Paulo",SE:"Sergipe",TO:"Tocantins"};
                        var select_options = {};

                        $( uf ).find('option').each(function(){

                          select_options[$(this).text()]=$(this).attr("value");

                        });

                        data.uf = select_options[states[data.uf]];

                      }

                      $( uf ).on('correios_clean_select', function(){

                        $( uf ).find('option').removeAttr('disabled').removeAttr('selected');

                      });

                      if (typeof c_readonly === 'boolean' && c_readonly == true) $( uf ).trigger('correios_clean_select');
                      $( uf ).find('option[value="'+data.uf+'"]').attr('selected', 'selected');
                      if (typeof c_readonly === 'boolean' && c_readonly == true && data.uf) $( uf ).find(':not(:selected)').prop('disabled',true);
                      $( uf ).val(data.uf).trigger('change');
                      if (typeof $.fn.select2 !== 'undefined') $( uf ).select2();
                      if(c_numero) $(c_numero).focus();

                    }

                }).always(function(){

                  localStorage.removeItem('correios_request');

                });

           }

       });

       return this;

   };
}));
