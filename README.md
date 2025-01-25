# Sistema de Estética Automotiva

## Visão Geral
Este é um sistema para gerenciar um serviço de estética automotiva, incluindo:
- Login de usuários autorizados.
- Cadastro de clientes e veículos.
- Gerenciamento de serviços.
- Controle de vendas de produtos relacionados.

O sistema segue o padrão RESTful para simplificar integração e manutenção.

## Funcionalidades Principais

### Autenticação e Autorização
- Login e gerenciamento de sessões com tokens JWT.

### Gerenciamento de Clientes
- Cadastro e atualização de clientes.
- Listagem e consulta detalhada.

### Gerenciamento de Veículos
- Cadastro de veículos associados aos clientes.
- Atualização e exclusão de dados de veículos.

### Cadastro de Serviços
- Registro de serviços oferecidos.
- Listagem e edição de serviços.

### Controle de Vendas
- Registro de vendas.
- Listagem de histórico e detalhes de cada venda.

## Endpoints Principais

### Autenticação
- `POST /auth/register` - Cadastro de novos usuários.
- `POST /auth/login` - Login e geração de token JWT.
- `POST /auth/profile` - Perfil do usuário precisa do jwt.

### Clientes
- `GET /clientes` - Listar todos os clientes.
- `POST /clientes` - Criar um novo cliente.

### Veículos
- `GET /veiculos` - Listar todos os veículos.
- `POST /veiculos` - Adicionar um novo veículo.

### Serviços
- `GET /servicos` - Listar todos os serviços.
- `POST /servicos` - Registrar um novo serviço.

### Vendas
- `GET /vendas` - Listar todas as vendas realizadas.
- `POST /vendas` - Registrar uma nova venda.

## Tecnologias Utilizadas
- **Backend**: Node.js (NestJs).
- **Banco de Dados**: PostgreSQL.
- **Autenticação**: JWT (JSON Web Tokens).
- **Validação**: Zod.
- **ORM**: Prisma.
- **Documentação**: Swagger.


## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
 