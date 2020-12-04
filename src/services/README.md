## Services - App de receitas

Essa pasta contém todos os arquivos utilizados para gerenciar os serviços da aplicação. 


### localStorage
Arquivo responsável por agrupar as funções utilizadas para salvar e resgatar dados do localStorage. As funções serão importadas em cada componente, conforme necessidade de uso.

### mealAPI

O [TheMealDB](https://www.themealdb.com/) é um banco de dados aberto, mantido pela comunidade, com receitas e ingredientes de todo o mundo. Os endpoints utilizados estão descritos no arquivo `./src/services/mealAPI.js`. 

### cocktailAPI

O [CockTailDP](https://www.thecocktaildb.com/) é muito similar a API TheMealDB, porém focado em bebidas. Os endpoints utilizados estão descritos no arquivo `./src/services/cocktailAPI.js`.
