# Casa Branca — Display de Fila

Display minimalista para TV vertical mostrando o número de pessoas na fila do Restaurante Casa Branca, consumindo a API FastGet via proxy Node (resolve CORS).

## Estrutura

```
├── server.js       # Servidor Node: proxy /api/queue + serve arquivos estáticos
├── index.html      # Frontend (fontes Kirvy embutidas em base64)
├── package.json
└── .gitignore
```

## Rodar localmente

```bash
node server.js
# acesse http://localhost:3000
```

## Deploy no Railway

1. Crie um novo projeto no [Railway](https://railway.app)
2. Conecte este repositório GitHub
3. O Railway detecta automaticamente o `package.json` e usa `npm start`
4. Nenhuma variável de ambiente necessária

## Ajustes rápidos

- **Intervalo de polling**: altere `INTERVAL` no `<script>` do `index.html` (padrão: 10 segundos)
- **URL da API**: altere `API_URL` no topo do `server.js`
