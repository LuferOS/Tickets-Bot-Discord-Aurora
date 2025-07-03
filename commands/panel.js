const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panel')
        .setDescription('Crea el panel para abrir tickets.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Soporte y Asistencia')
            .setDescription('Haz clic en el botón de abajo para crear un ticket y nuestro equipo de staff te atenderá.')
            .setFooter({ text: `${interaction.guild.name} | Sistema de Tickets`});

        const button = new ButtonBuilder()
            .setCustomId('create-ticket')
            .setLabel('Crear Ticket')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('🎟️');

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: '✅ Panel de tickets creado.', ephemeral: true });
    },
};