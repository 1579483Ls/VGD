# Sistema de Gerenciamento de Metas Diárias - Minecraft

## Funcionalidades

### 🔍 Busca de Jogadores
- Campo de busca que filtra jogadores em tempo real
- Lista interativa com jogadores cadastrados
- Seleção simples clicando no nome

### 📸 Upload de Print
- Upload de imagem da meta concluída
- Validação de arquivo obrigatório
- Armazenamento local da imagem

### ✅ Controle de Metas
- Verificação automática do status da meta diária
- Marcação por data (uma meta por dia por jogador)
- Status visual: Pendente (amarelo) / Concluída (verde)

### 👥 Administração
- Adicionar novos jogadores
- Visualizar todas as metas enviadas
- Interface modal para gerenciamento

## Como Usar

1. **Buscar Jogador**: Digite o nickname no campo de busca
2. **Selecionar**: Clique no nome do jogador na lista
3. **Enviar Meta**: Faça upload do print da meta concluída
4. **Confirmar**: Sistema marca automaticamente como concluída

## Tecnologias

- HTML5
- CSS3 (Design responsivo com tema Minecraft)
- JavaScript (Vanilla)
- LocalStorage (Persistência de dados)

## Estrutura de Dados

### Jogadores
```javascript
players = ["Steve", "Alex", "Herobrine", ...]
```

### Metas
```javascript
{
  player: "NomeJogador",
  date: "Data",
  timestamp: "ISO String",
  imageData: "Base64",
  fileName: "nome_arquivo.png"
}
```

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm start
```

3. Acesse no navegador:
```
http://localhost:3000
```

## Desenvolvimento

- O sistema funciona completamente offline
- Dados são salvos no navegador automaticamente
- Para parar o servidor: `Ctrl+C`