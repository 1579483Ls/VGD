// Limpar dados antigos do localStorage
localStorage.removeItem('minecraftPlayers');
localStorage.removeItem('minecraftMetas');

// Simulação de banco de dados local (iniciando vazio)
let players = [];
let metas = [];
let registeredUsers = {};
let currentUser = null;
let selectedPlayer = null;

// Admin padrão
const adminCredentials = {
    username: 'admin',
    password: '12300'
};

// Salvar admin se não existir
if (!registeredUsers['admin']) {
    registeredUsers['admin'] = {
        username: 'admin',
        password: '12300',
        role: 'admin',
        nickname: 'Administrador'
    };
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há usuário logado
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainSystem();
    }
});

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Verificar admin
    if (username === adminCredentials.username && password === adminCredentials.password) {
        currentUser = { 
            username: adminCredentials.username, 
            role: 'admin',
            nickname: 'Administrador'
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainSystem();
        errorDiv.textContent = '';
        return;
    }
    
    // Verificar usuários cadastrados (por email ou nickname)
    const user = Object.values(registeredUsers).find(u => 
        (u.email === username || u.nickname === username) && u.password === password
    );
    
    if (user) {
        currentUser = { 
            username: user.email, 
            role: user.role,
            nickname: user.nickname
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainSystem();
        errorDiv.textContent = '';
    } else {
        errorDiv.textContent = 'Email/Nickname ou senha inválidos!';
    }
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    clearErrors();
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    clearErrors();
}

function clearErrors() {
    document.getElementById('loginError').textContent = '';
    document.getElementById('registerError').textContent = '';
}

function register() {
    const nickname = document.getElementById('regNickname').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const errorDiv = document.getElementById('registerError');
    
    if (!nickname || !password || !confirmPassword) {
        errorDiv.textContent = 'Preencha todos os campos!';
        return;
    }
    
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Senhas não coincidem!';
        return;
    }
    
    if (password.length < 4) {
        errorDiv.textContent = 'Senha deve ter pelo menos 4 caracteres!';
        return;
    }
    
    // Verificar se nickname já existe
    const existingUser = Object.values(registeredUsers).find(u => u.nickname === nickname);
    if (existingUser) {
        errorDiv.textContent = 'Nickname já está em uso!';
        return;
    }
    
    // Gerar email baseado no nickname
    const email = `${nickname.toLowerCase()}@vgdplayer.com`;
    
    // Criar usuário
    registeredUsers[email] = {
        email: email,
        nickname: nickname,
        password: password,
        role: 'user',
        registeredAt: new Date().toISOString()
    };
    
    // Adicionar à lista de jogadores se não existir
    if (!players.includes(nickname)) {
        players.push(nickname);
        localStorage.setItem('minecraftPlayers', JSON.stringify(players));
    }
    
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    alert(`Cadastro realizado com sucesso!\n\nNickname: ${nickname}\nEmail: ${email}\nSenha: ${password}\n\nVocê pode fazer login com seu nickname ou email.`);
    
    // Limpar campos e voltar ao login
    document.getElementById('regNickname').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirmPassword').value = '';
    showLogin();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Reset login screen position
    const loginScreen = document.getElementById('loginScreen');
    loginScreen.style.display = 'flex';
    loginScreen.style.position = 'fixed';
    loginScreen.style.top = '0';
    loginScreen.style.left = '0';
    loginScreen.style.width = '100%';
    loginScreen.style.height = '100%';
    loginScreen.style.alignItems = 'center';
    loginScreen.style.justifyContent = 'center';
    
    document.getElementById('mainSystem').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    // Reset forms
    showLogin();
}

function showMainSystem() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainSystem').style.display = 'block';
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('pt-BR');
    document.getElementById('userRole').textContent = `Logado como: ${currentUser.nickname} (${currentUser.role.toUpperCase()})`;
    
    // Event listener para busca
    document.getElementById('nicknameSearch').addEventListener('input', searchPlayers);
    
    // Mostrar seção admin apenas para administradores
    if (currentUser.role === 'admin') {
        document.getElementById('adminSection').style.display = 'block';
    } else {
        document.getElementById('adminSection').style.display = 'none';
    }
    
    showAllPlayers();
}

function showAllPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = players.map(player => 
        `<div class="player-item" onclick="selectPlayer('${player}')">${player}</div>`
    ).join('');
}

function searchPlayers() {
    const searchTerm = document.getElementById('nicknameSearch').value.toLowerCase();
    const playerList = document.getElementById('playerList');
    
    if (searchTerm === '') {
        showAllPlayers();
        return;
    }
    
    const filteredPlayers = players.filter(player => 
        player.toLowerCase().includes(searchTerm)
    );
    
    playerList.innerHTML = filteredPlayers.map(player => 
        `<div class="player-item" onclick="selectPlayer('${player}')">${player}</div>`
    ).join('');
}

function selectPlayer(playerName) {
    selectedPlayer = playerName;
    document.getElementById('selectedPlayer').textContent = playerName;
    document.getElementById('playerSection').style.display = 'block';
    document.getElementById('nicknameSearch').value = playerName;
    document.getElementById('playerList').innerHTML = '';
    
    checkMetaStatus();
    
    // Forçar exibição do download se for usuário e tiver meta concluída
    if (currentUser.role === 'user') {
        const today = new Date().toDateString();
        const playerMeta = metas.find(meta => 
            meta.player === selectedPlayer && meta.date === today
        );
        
        if (playerMeta && (playerMeta.submittedBy === currentUser.username || 
                          playerMeta.player === currentUser.nickname)) {
            document.getElementById('downloadSection').style.display = 'block';
        }
    }
}

function checkMetaStatus() {
    const today = new Date().toDateString();
    const playerMeta = metas.find(meta => 
        meta.player === selectedPlayer && meta.date === today
    );
    
    const statusElement = document.getElementById('metaStatus');
    const uploadSection = document.getElementById('uploadSection');
    const downloadSection = document.getElementById('downloadSection');
    
    if (playerMeta) {
        // Meta já foi enviada hoje
        statusElement.textContent = 'Concluída';
        statusElement.className = 'status-completed';
        
        // Remove completamente a seção de upload
        uploadSection.innerHTML = '';
        uploadSection.style.display = 'none';
        
        // Mostra seção de download
        downloadSection.style.display = 'block';
    } else {
        // Meta ainda não foi enviada hoje
        statusElement.textContent = 'Pendente';
        statusElement.className = 'status-pending';
        
        // Restaura seção de upload
        uploadSection.innerHTML = `
            <h3>Enviar Print da Meta</h3>
            <input type="file" id="printUpload" accept="image/*">
            <button id="submitMeta" onclick="submitMeta()">Enviar Meta</button>
        `;
        uploadSection.style.display = 'block';
        
        // Esconde seção de download
        downloadSection.style.display = 'none';
    }
}

function submitMeta() {
    const fileInput = document.getElementById('printUpload');
    
    if (!fileInput.files[0]) {
        alert('Por favor, selecione um print da meta!');
        return;
    }
    
    // Elementos da interface
    const statusEl = document.getElementById('metaStatus');
    const uploadSection = document.getElementById('uploadSection');
    const downloadSection = document.getElementById('downloadSection');
    const metaSection = document.getElementById('metaSection');

    // Processar o arquivo
    const reader = new FileReader();
    reader.onload = function(e) {
        // Criar nova meta
        const meta = {
            player: selectedPlayer,
            date: new Date().toDateString(),
            timestamp: new Date().toISOString(),
            imageData: e.target.result,
            fileName: fileInput.files[0].name,
            submittedBy: currentUser.username
        };
        
        // Salvar no localStorage
        metas.push(meta);
        localStorage.setItem('minecraftMetas', JSON.stringify(metas));

        // Atualizar status
        statusEl.textContent = 'Concluída';
        statusEl.className = 'status-completed';
        
        // Esconder COMPLETAMENTE a seção de upload
        uploadSection.innerHTML = ''; // Limpa o conteúdo
        uploadSection.style.display = 'none';
        
        // Mostrar seção de download
        downloadSection.style.display = 'block';
        
        // Limpar input
        fileInput.value = '';
        
        // Confirmar para o usuário
        alert('Meta salva! Clique no botão abaixo para baixar o comprovante.');
    };
    
    reader.readAsDataURL(fileInput.files[0]);
}

function downloadReceipt() {
    const today = new Date().toDateString();
    const playerMeta = metas.find(meta => 
        meta.player === selectedPlayer && meta.date === today
    );
    
    if (!playerMeta) {
        alert('Meta não encontrada!');
        return;
    }
    
    // Verificar se o usuário pode baixar este comprovante
    if (currentUser.role === 'user' && 
        playerMeta.submittedBy !== currentUser.username && 
        playerMeta.player !== currentUser.nickname) {
        alert('Você só pode baixar comprovantes das suas próprias metas!');
        return;
    }
    
    const metaDate = new Date(playerMeta.timestamp);
    const receiptData = {
        jogador: selectedPlayer,
        data: metaDate.toLocaleDateString('pt-BR'),
        horario: metaDate.toLocaleTimeString('pt-BR'),
        status: 'Meta Concluída',
        comprovante: `Comprovante de pagamento da meta diária do jogador ${selectedPlayer}`,
        validacao: `VGD-${playerMeta.timestamp}`
    };
    
    const receiptText = `
=== COMPROVANTE DE PAGAMENTO DE META ===

Jogador: ${receiptData.jogador}
Data: ${receiptData.data}
Horário: ${receiptData.horario}
Status: ${receiptData.status}

${receiptData.comprovante}

Código de Validação: ${receiptData.validacao}

=== SISTEMA VGD - MINECRAFT ===
    `;
    
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Comprovante_${selectedPlayer}_${metaDate.toLocaleDateString('pt-BR').replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function showAddPlayer() {
    if (currentUser.role !== 'admin') {
        alert('Acesso negado! Apenas administradores podem adicionar jogadores.');
        return;
    }
    document.getElementById('addPlayerModal').style.display = 'block';
}

function addPlayer() {
    if (currentUser.role !== 'admin') {
        alert('Acesso negado! Apenas administradores podem adicionar jogadores.');
        return;
    }
    
    const newPlayerNick = document.getElementById('newPlayerNick').value.trim();
    
    if (!newPlayerNick) {
        alert('Digite um nickname válido!');
        return;
    }
    
    if (players.includes(newPlayerNick)) {
        alert('Jogador já existe!');
        return;
    }
    
    players.push(newPlayerNick);
    localStorage.setItem('minecraftPlayers', JSON.stringify(players));
    
    alert('Jogador adicionado com sucesso!');
    document.getElementById('newPlayerNick').value = '';
    closeModal();
    showAllPlayers();
}

function showAllMetas() {
    if (currentUser.role !== 'admin') {
        alert('Acesso negado! Apenas administradores podem ver o relatório.');
        return;
    }
    
    const allMetasDiv = document.getElementById('allMetas');
    
    if (metas.length === 0) {
        allMetasDiv.innerHTML = '<p>Nenhuma meta encontrada.</p>';
    } else {
        allMetasDiv.innerHTML = metas.map((meta, index) => `
            <div class="meta-item meta-completed">
                <button class="delete-meta-btn" onclick="deleteMeta(${index})">×</button>
                <strong>🎮 ${meta.player}</strong><br>
                Data: ${new Date(meta.timestamp).toLocaleDateString('pt-BR')}<br>
                Horário: ${new Date(meta.timestamp).toLocaleTimeString('pt-BR')}<br>
                Arquivo: ${meta.fileName}<br>
                <small>Enviado por: ${meta.submittedBy || 'N/A'}</small>
            </div>
        `).join('');
    }
    
    document.getElementById('metasModal').style.display = 'block';
}

function deleteMeta(index) {
    if (confirm('Tem certeza que deseja deletar este relatório?')) {
        metas.splice(index, 1);
        localStorage.setItem('minecraftMetas', JSON.stringify(metas));
        showAllMetas(); // Atualizar a lista
    }
}

function clearAllMetas() {
    if (confirm('Tem certeza que deseja deletar TODOS os relatórios?')) {
        metas = [];
        localStorage.setItem('minecraftMetas', JSON.stringify(metas));
        showAllMetas();
        alert('Todos os relatórios foram deletados!');
    }
}

// Função removida pois foi substituída por clearAllData()

function showRemovePlayer() {
    if (currentUser.role !== 'admin') {
        alert('Acesso negado! Apenas administradores podem remover jogadores.');
        return;
    }
    
    const select = document.getElementById('playerToRemove');
    select.innerHTML = '<option value="">Selecione um jogador</option>';
    players.forEach(player => {
        select.innerHTML += `<option value="${player}">${player}</option>`;
    });
    
    document.getElementById('removePlayerModal').style.display = 'block';
}

function removePlayer() {
    const playerToRemove = document.getElementById('playerToRemove').value;
    
    if (!playerToRemove) {
        alert('Selecione um jogador para remover!');
        return;
    }
    
    // Remover jogador da lista
    players = players.filter(player => player !== playerToRemove);
    localStorage.setItem('minecraftPlayers', JSON.stringify(players));
    
    // Remover todas as metas do jogador
    metas = metas.filter(meta => meta.player !== playerToRemove);
    localStorage.setItem('minecraftMetas', JSON.stringify(metas));
    
    // Remover usuário registrado se existir
    const userToRemove = Object.values(registeredUsers).find(u => u.nickname === playerToRemove);
    if (userToRemove) {
        delete registeredUsers[userToRemove.email];
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
    
    alert(`Jogador ${playerToRemove} e todos os seus dados foram removidos com sucesso!`);
    closeModal();
    showAllPlayers();
}

function closeModal() {
    document.getElementById('addPlayerModal').style.display = 'none';
    document.getElementById('removePlayerModal').style.display = 'none';
    document.getElementById('metasModal').style.display = 'none';
    document.getElementById('dashboardModal').style.display = 'none';
}

function showDashboard() {
    if (currentUser.role !== 'admin') {
        alert('Acesso negado! Apenas administradores podem ver o dashboard.');
        return;
    }
    
    const today = new Date().toDateString();
    const todayMetas = metas.filter(meta => meta.date === today);
    
    // Estatísticas
    const totalPlayers = players.length;
    const completedToday = todayMetas.length;
    const pendingToday = totalPlayers - completedToday;
    
    const statsDiv = document.getElementById('dashboardStats');
    statsDiv.innerHTML = `
        <div class="stat-card completed">
            <h4>✅ Concluídas</h4>
            <span class="stat-number">${completedToday}</span>
        </div>
        <div class="stat-card pending">
            <h4>⏳ Pendentes</h4>
            <span class="stat-number">${pendingToday}</span>
        </div>
        <div class="stat-card total">
            <h4>👥 Total</h4>
            <span class="stat-number">${totalPlayers}</span>
        </div>
    `;
    
    // Lista de jogadores
    const listDiv = document.getElementById('dashboardList');
    listDiv.innerHTML = players.map(player => {
        const playerMeta = todayMetas.find(meta => meta.player === player);
        const status = playerMeta ? 'completed' : 'pending';
        const statusText = playerMeta ? 'Concluída' : 'Pendente';
        const timeText = playerMeta ? new Date(playerMeta.timestamp).toLocaleTimeString('pt-BR') : '-';
        
        return `
            <div class="dashboard-item ${status}">
                <div class="player-info">
                    <strong>🎮 ${player}</strong>
                    <span class="status-badge ${status}">${statusText}</span>
                </div>
                <div class="time-info">
                    <small>Horário: ${timeText}</small>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('dashboardModal').style.display = 'block';
}

function clearAllData() {
    if (confirm('ATENÇÃO: Isso vai apagar TODOS os dados do sistema!\n\nTem certeza que deseja continuar?')) {
        if (confirm('Última chance: Todos os dados serão PERMANENTEMENTE apagados.\n\nDeseja continuar?')) {
            // Limpar todo o localStorage
            localStorage.clear();
            
            // Reinicializar as variáveis
            players = [];
            metas = [];
            registeredUsers = {};
            currentUser = null;
            selectedPlayer = null;
            
            // Recriar apenas o admin
            registeredUsers['admin'] = {
                username: 'admin',
                password: '12300',
                role: 'admin',
                nickname: 'Administrador'
            };
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            // Atualizar a interface
            alert('Todos os dados foram limpos!\nVocê será redirecionado para a tela de login.');
            window.location.reload();
        }
    }
}

// Fechar modal clicando fora
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}