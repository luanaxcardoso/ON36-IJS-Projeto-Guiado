## Sistema de Gestão Cultural - Projeto guiado de NestJS

Este repositório contém o código para um sistema de gestão cultural que permite o cadastro e gerenciamento de alunos e suas informações relacionadas. 

### Funcionalidades Implementadas

- **Cadastro de Alunos**: Permite o cadastro de novos alunos, incluindo verificação de idade mínima e prevenção de duplicidade.
- **Validações de Dados**:
  - Validação de idade mínima para o cadastro (pelo menos 17 anos).
  - Validação para evitar duplicação de nomes de alunos.
  - Validações para os campos obrigatórios e formatos corretos (telefone e email).

### Estrutura do Projeto

- **`src/aluno/aluno.service.ts`**: Implementa a lógica de negócios para o cadastro de alunos. Inclui a verificação de duplicidade e idade mínima.
  
- **`src/aluno/dto/create-aluno.dto.ts`**: Define o Data Transfer Object (DTO) para a criação de novos alunos, com validações para garantir a integridade dos dados fornecidos.

- **`src/aluno/entities/aluno.entity.ts`**: Define a entidade  que representa um aluno no sistema com as propriedades básicas e um construtor para inicialização.

- **`src/aluno/aluno.controller.ts`**: Define o controlador para a rota que lida com as requisições HTTP para cadastro.

***Teste o endpoint de cadastro de alunos**:
    - Endpoint: `POST /aluno`
    - Corpo da requisição (exemplo):
      ```json
      {
        "nome": "João Silva",
        "endereco": "Rua Exemplo, 123",
        "telefone": "123456789",
        "email": "joao.silva@example.com",
        "curso": "Ma
      }
      ```