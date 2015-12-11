# jQuery CEP Correios

Utilize o jQuery da WebmaniaBR® no CDN Amazon CloudFront para consultas Ajax nos Correios **com preenchimento automático do formulário**.

Documentação: https://webmaniabr.com/docs/rest-api-correios/

## Requisitos

Obtenha as credenciais de acesso **grátis e de uso ilimitado da sua aplicação**. Acesse: http://webmania.me/1HXdA0l

## Utilização

Primeiro, adicione o jQuery e o javascript dos Correios antes da tag <code>&lt;/body&gt;</code>:

```javascript
<script src="jquery.js"></script>
<script src="//d3rjkex7r35ruf.cloudfront.net/latest/jquery.correios.min.js"></script>
```

Em seguida, inicie o javascript informando as suas credenciais de acesso e os campos do formulário para o preenchimento automático:

```
jQuery(function($){
    correios.init( 'app_key', 'app_secret' );
    $('cep').correios( 'endereco', 'bairro', 'cidade', 'uf', 'loading' );
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

## Suporte

Qualquer dúvida estamos à disposição e abertos para melhorias e sugestões, em breve teremos um fórum para discussões. Envie um e-mail para github@webmaniabr.com.
