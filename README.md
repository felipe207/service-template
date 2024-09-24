# my-money-app-backend

# ordem de execução



## 1.loader (required:database,server e routes da config)

## 2 . em routes.js são chamadas as models que possuem as rotas
## * por isso as routes são a última coisa a ser chamada no loader

## após rodar o docker-compose up entrar no bash do conteiner com 
## docker exec -it <id> bash e executar npm install jsonwebtoken