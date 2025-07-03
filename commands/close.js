const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Cierra el ticket actual.'),
    async execute(interaction) {
        if (!interaction.channel.name.startsWith('ticket-')) {
            return interaction.reply({ content: 'Este comando solo puede ser usado en un canal de ticket.', ephemeral: true });
        }
        
        // La lógica de cierre ya está en interactionCreate.js
        // Para evitar duplicar código, podemos simular el click del botón.
        // O simplemente le decimos al usuario que use el botón.
        await interaction.reply({ content: 'Para cerrar el ticket, por favor, usa el botón 🔒 "Cerrar Ticket".', ephemeral: true });
    },
};