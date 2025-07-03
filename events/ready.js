module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`✅ ¡Listo! Conectado como ${client.user.tag}`);
    },
};
