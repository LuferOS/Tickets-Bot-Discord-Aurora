const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Configura el sistema de tickets.')
        .addRoleOption(option =>
            option.setName('rolstaff')
                .setDescription('El rol que podrá gestionar los tickets.')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('categoria')
                .setDescription('La categoría donde se crearán los nuevos tickets.')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('transcripts')
                .setDescription('El canal donde se enviarán las transcripciones de los tickets cerrados.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {
        const staffRole = interaction.options.getRole('rolstaff');
        const category = interaction.options.getChannel('categoria');
        const transcriptChannel = interaction.options.getChannel('transcripts');

        let settings = {};
        if (fs.existsSync('./settings.json')) {
            settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
        }

        settings[interaction.guild.id] = {
            staffRole: staffRole.id,
            ticketCategory: category.id,
            transcriptChannel: transcriptChannel.id
        };

        fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 4));

        await interaction.reply({
            content: `✅ ¡Sistema de tickets configurado!\n- **Rol de Staff:** ${staffRole}\n- **Categoría de Tickets:** ${category}\n- **Canal de Transcripts:** ${transcriptChannel}`,
            ephemeral: true
        });
    },
};