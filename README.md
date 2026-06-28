
# SysMonitor Dashboard — Real-Time Metrics

Um dashboard moderno e de alta performance desenvolvido em **React** para monitoramento simulado de microsserviços em tempo real.

Este projeto foi concebido para explorar o meu primeiro contato com conceitos avançados de gerenciamento de estado, ciclos de vida no React, integração com bibliotecas de gráficos e containerização com **Docker**.

Os dados são fictícios, sendo gerados aleatoriamente, pois o cerne aqui não foi consumir dados reais de uma API, por exemplo. Mas dá para fazermos isso facilmente conectando o React a uma API e, no App.jsx, substituirmos os tratamentos — atualmente simulados artificialmente — para os dados reais oriundos da API.

---

## Tecnologias

* **React (v18+)**: Biblioteca JavaScript focada na construção de interfaces baseadas em componentes.
* **Vite**: Ferramenta de build de última geração que substitui o antigo *Create React App* por ser extremamente rápida.
* **Node.js & npm**: Ambiente de execução e gerenciamento de dependências do projeto.
* **Recharts**: Biblioteca de gráficos baseada em componentes React e SVG.
* **Lucide React**: Conjunto de ícones vetoriais modernos e leves.
* **Docker & Nginx**: Empacotamento da aplicação em um container leve utilizando build multi-stage e servidor Nginx para máxima eficiência em produção.

---

## Arquitetura e Conceitos Aplicados

Vindo de um background voltado a linguagens de backend (Java/PHP), estruturei este projeto seguindo o paradigma de **Componentes Funcionais** e a arquitetura reativa do ecossistema JavaScript:

1. **`useState` (Gerenciamento de Estado):** Utilizado para manter e atualizar os dados do gráfico, contadores de requisições e a lista de logs ao vivo na tela de forma reativa.
2. **`useEffect` (Efeitos Colaterais):** Implementado para simular uma conexão contínua de dados (como um WebSocket/Server-Sent Events), atualizando o estado do sistema a cada 2 segundos e limpando a memória ao desmontar o componente.
3. **Imutabilidade:** Aplicação do conceito de imutabilidade no JavaScript ao gerenciar filas de dados (`arrays`) para o gráfico e logs sem mutar o estado original diretamente.

---

## Como Executar o Projeto

Você pode rodar este projeto **localmente em modo de desenvolvimento** ou **isolado através do Docker**.

### Pré-requisitos
* Node.js (versão LTS)
* Docker instalado (opcional para o modo container)
* Git (para clonar o repositório)

### Opção 1: Modo de Desenvolvimento Local

1. Instale as dependências:
   ```bash
   npm install

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev

3. Abra **`http://localhost:5173`** no seu navegador.

### Opção 2: Via Docker (Ambiente de Produção)

Quanto ao Docker, o projeto conta com um **Dockerfile multi-stage** — isto é, vários estágios dentro de um único arquivo para gerar a imagem (container).
* O primeiro estágio é a compilação da aplicação gerando os arquivos estáticos de produção (**`dist`**).
* O segundo estágio é a utilização de uma imagem aplina do Nginx para servir os arquivos (do 1º estágio) na porta 80.

1. Construa a imagem Docker:
   ```bash
   docker build -t dashboard-react .

2. Execute o container mapeando para a porta 8080:
   ```bash
   docker run -d -p 8080:80 dashboard-react

3. Abra **`http://localhost:8080`** no seu navegador.

**ATENÇÃO** para essa questão da porta 8080. Se você tiver outros projetos em seu computador, principalmente Web, envolvendo APIs ou usos de frameworks como o próprio React/TypeScript/Angular, ela pode já estar em uso e, desse modo, terá de trocar para uma outra porta para que consiga rodar.

---

## Autor

Willian Ferreira Gonçalves


