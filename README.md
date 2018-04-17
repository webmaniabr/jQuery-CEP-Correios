# jQuery CEP Correios

Utilize o jQuery da WebmaniaBR® para consultas Ajax nos Correios **com preenchimento automático do formulário**.

Documentação: https://webmaniabr.com/docs/rest-api-correios/

## Requisitos

Obtenha as credenciais de acesso **grátis e de uso ilimitado da sua aplicação**. Acesse: https://webmaniabr.com/docs/rest-api-correios/#autenticacao

## Utilização

Primeiro, adicione o jQuery e o javascript dos Correios antes da tag <code>&lt;/body&gt;</code>:

```javascript
<script src="jquery.js"></script>
<script src="jquery.correios.min.js"></script>
```

Em seguida, inicie o javascript informando as suas credenciais de acesso e os campos do formulário para o preenchimento automático:

```
jQuery(function($){
    correios.init( 'app_key', 'app_secret' );
    $('cep').correios( 'endereco', 'bairro', 'cidade', 'uf', 'loading', true, 'numero');
});
```

- **app_key**: Informe o app_key da sua aplicação dos Correios.
- **app_secret**: Informe o app_secret da sua aplicação dos Correios.
- **cep**: Informe a classe ou id do input CEP. <code>Exemplo: '#cep'</code>
- **endereco**: Informe a classe ou id do input Endereço. <code>Exemplo: '#endereco'</code>
- **bairro**: Informe a classe ou id do input Bairro. <code>Exemplo: '#bairro'</code>
- **cidade**: Informe a classe ou id do input Cidade. <code>Exemplo: '#cidade'</code>
- **uf**: Informe a classe ou id do input Estado. <code>Exemplo: '#uf'</code>
- **loading**: Informe a classe ou id da Imagem. <code>Exemplo: '#loading'</code>
- **readonly**: Realiza o bloqueio dos campos Endereço, Bairro, Cidade e Estado impedindo que o usuário altere as informações preenchidas automaticamente. Deve ser informado o valor boolean (true ou false). <code>Exemplo: true</code>
- **numero**: Informe a classe ou id do input Número para receber o foco após a consulta. <code>Exemplo: '#numero'</code>

## CSS 

Caso utilize a opção **readonly**, sugerimos adicionar a seguinte CSS para que o usuário identifique os campos bloqueados no Desktop e Smartphone:

```
input[readonly], input[readyonly=readonly], select[readonly], select[readonly=readonly] { background: #efefef !important; color: #666666 !important; border-color:#dfdcde !important; cursor:not-allowed; }
select[readonly], select[readonly=readonly] { pointer-events: none; touch-action: none; }
```
