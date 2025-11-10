// Script para limpar metas do localStorage
const { JSDOM } = require('jsdom');

// Simular localStorage
const localStorage = {
    data: {},
    setItem: function(key, value) {
        this.data[key] = value;
        console.log(`${key} limpo com sucesso!`);
    },
    getItem: function(key) {
        return this.data[key] || null;
    }
};

// Limpar metas
localStorage.setItem('minecraftMetas', JSON.stringify([]));
console.log('Todos os relatórios foram deletados!');