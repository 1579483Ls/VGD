<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciamento de Metas Minecraft</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Tela de Login -->
    <div id="loginScreen" class="login-screen">
        <div class="login-container">
            <h1>ACESSO VANGUARDA</h1>
            
            <!-- Formulário de Login -->
            <div id="loginForm" class="login-form">
                <input type="text" id="username" placeholder="Email/Nickname">
                <input type="password" id="password" placeholder="Senha">
                <button onclick="login()">ENTRAR</button>
                <button type="button" onclick="showRegister()" class="register-btn">CADASTRAR</button>
                <div id="loginError" class="login-error"></div>
            </div>
            
            <!-- Formulário de Cadastro -->
            <div id="registerForm" class="login-form" style="display: none;">
                <h3>Cadastro de Jogador</h3>
                <input type="text" id="regNickname" placeholder="Nickname do Minecraft">
                <input type="password" id="regPassword" placeholder="Escolha uma senha">
                <input type="password" id="regConfirmPassword" placeholder="Confirme a senha">
                <button onclick="register()">CADASTRAR</button>
                <button type="button" onclick="showLogin()" class="back-btn">VOLTAR</button>
                <div id="registerError" class="login-error"></div>
            </div>
        </div>
    </div>

    <!-- Sistema Principal -->
    <div id="mainSystem" class="container" style="display: none;">
        <div class="header">
            <div class="user-info">
                <span id="userRole"></span>
                <button onclick="logout()" class="logout-btn">Sair</button>
            </div>
            <h1>Gerenciamento de Metas Diárias - FAC VANGUARDA</h1>
        </div>
        
        <div class="search-section">
            <h2>Buscar Jogador</h2>
            <input type="text" id="nicknameSearch" placeholder="Digite o nickname do jogador">
            <div id="playerList" class="player-list"></div>
        </div>

        <div id="playerSection" class="player-section" style="display: none;">
            <h2>Jogador Selecionado: <span id="selectedPlayer"></span></h2>
            <div class="meta-status">
                <p>Status da meta de hoje (<span id="currentDate"></span>): 
                   <span id="metaStatus" class="status-pending">Pendente</span>
                </p>
            </div>
            
            <!-- Seção de Meta (agrupa upload e download) -->
            <div id="metaSection">
                <!-- Seção de Upload -->
                <div id="uploadSection" class="upload-section">
                    <h3>Enviar Print da Meta</h3>
                    <input type="file" id="printUpload" accept="image/*">
                    <button id="submitMeta" onclick="submitMeta()">Enviar Meta</button>
                </div>
                
                <!-- Seção de Download -->
                <div id="downloadSection" style="display: none; margin-top: 20px; text-align: center;">
                    <h3 style="color: #00ff00;">✅ Meta Enviada com Sucesso!</h3>
                    <button onclick="downloadReceipt()" 
                            style="background: #00aa00; 
                                   padding: 10px 20px; 
                                   border: none; 
                                   border-radius: 5px;
                                   color: white;
                                   cursor: pointer;
                                   margin-top: 10px;">
                        📄 Baixar Comprovante
                    </button>
                </div>
            </div>
        </div>

        <div id="adminSection" class="admin-section" style="display: none;">
            <h2>Administração</h2>
            <div class="admin-buttons">
                <button onclick="showAddPlayer()">Adicionar Jogador</button>
                <button onclick="showRemovePlayer()">Remover Jogador</button>
                <button onclick="showAllMetas()">Ver Relatório de Metas</button>
                <button onclick="showDashboard()">Dashboard de Status</button>
                <button onclick="clearAllData()" class="danger-btn" style="background: linear-gradient(135deg, #dc3545, #9b0000);">Limpar Dados do Sistema</button>
            </div>
        </div>

        <div id="addPlayerModal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <h3>Adicionar Novo Jogador</h3>
                <input type="text" id="newPlayerNick" placeholder="Nickname do jogador">
                <button onclick="addPlayer()">Adicionar</button>
            </div>
        </div>

        <div id="removePlayerModal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <h3>Remover Jogador</h3>
                <select id="playerToRemove">
                    <option value="">Selecione um jogador</option>
                </select>
                <button onclick="removePlayer()">Remover</button>
            </div>
        </div>

        <div id="metasModal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <h3>Relatório de Metas</h3>
                <button onclick="clearAllMetas()" class="clear-all-btn">Limpar Todos</button>
                <div id="allMetas"></div>
            </div>
        </div>

        <div id="dashboardModal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <h3>Dashboard de Status - Metas de Hoje</h3>
                <div id="dashboardStats" class="dashboard-stats"></div>
                <div id="dashboardList" class="dashboard-list"></div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>