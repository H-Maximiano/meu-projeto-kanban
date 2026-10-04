# 📋 Quadro Kanban Full Stack (React + Flask + AWS)

Um aplicativo web de gerenciamento de tarefas em formato de quadro Kanban, desenvolvido como projeto prático para consolidar conhecimentos em desenvolvimento Full Stack, integração de APIs e computação em nuvem.

## 🚀 Tecnologias Utilizadas

### **Frontend**
* **React** (com Vite)
* **JavaScript (ES6+)**
* **Axios** (para requisições HTTP)
* **@hello-pangea/dnd** (para a funcionalidade de Drag and Drop dos cards)
* **Styled Components** (para estilização)

### **Backend**
* **Python** com **Flask**
* **CORS** (para gerenciar permissões de acesso)
* Banco de dados relacional para persistência das tarefas

### **Infraestrutura & DevOps**
* **AWS EC2** (Servidor virtual na nuvem onde a aplicação está hospedada)
* **AWS IAM** (Gerenciamento seguro de acessos e permissões)
* **Git & GitHub** (Versionamento de código)

---

## 🎯 Funcionalidades

* **Visualização em Kanban:** Organização das tarefas divididas em colunas (`Tarefas`, `Em Execução` e `Terminado`).
* **Drag and Drop:** Arraste e solte os cards entre as colunas para atualizar o status da tarefa em tempo real.
* **Criação de Tarefas:** Adicionador rápido de novas demandas para o fluxo.
* **Exclusão de Tarefas:** Opção de remoção de itens concluídos.
* **Persistência de Dados:** Toda alteração de status e criação é comunicada diretamente com a API Flask rodando na nuvem.

---

## ☁️ Arquitetura e Deploy (AWS EC2)

O backend da aplicação está hospedado em uma instância **Amazon EC2**, garantindo alta disponibilidade e acesso remoto à API. O projeto utiliza boas práticas de segurança, como a criação de um usuário IAM dedicado com permissões controladas para o gerenciamento dos recursos na AWS.

---

## 🛠️ Como Executar o Projeto Localmente

Se você quiser clonar e rodar o projeto na sua máquina, siga os passos abaixo:

### Pré-requisitos
* Node.js instalado
* Python 3 instalado

### 1. Clonar o repositório
```bash
git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/SEU-USUARIO/NOME-DO-REPO.git)
cd NOME-DO-REPO