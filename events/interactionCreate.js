const { PermissionsBitField, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: '¡Hubo un error al ejecutar este comando!', ephemeral: true });
            }
        }

        if (interaction.isButton()) {
            const settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));
            const guildSettings = settings[interaction.guild.id];

            if (!guildSettings || !guildSettings.staffRole || !guildSettings.ticketCategory) {
                 return interaction.reply({ content: 'El sistema de tickets no ha sido configurado. Un administrador debe usar `/setup`.', ephemeral: true });
            }

            if (interaction.customId === 'create-ticket') {
                const ticketChannel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    parent: guildSettings.ticketCategory,
                    topic: `Ticket de ${interaction.user.tag}. Creador ID: ${interaction.user.id}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id, // @everyone
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                        },
                        {
                            id: guildSettings.staffRole,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.ManageMessages],
                        },
                    ],
                });

                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle(`Ticket de ${interaction.user.username}`)
                    .setDescription('Bienvenido a tu ticket. El equipo de staff te atenderá en breve. Por favor, describe tu problema con el mayor detalle posible.')
                    .setFooter({ text: 'Puedes cerrar este ticket en cualquier momento.'});

                const closeButton = new ButtonBuilder()
                    .setCustomId('close-ticket')
                    .setLabel('Cerrar Ticket')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🔒');

                const row = new ActionRowBuilder().addComponents(closeButton);

                await ticketChannel.send({ content: `<@&${guildSettings.staffRole}>, <@${interaction.user.id}>`, embeds: [embed], components: [row] });
                await interaction.reply({ content: `✅ ¡Tu ticket ha sido creado en ${ticketChannel}!`, ephemeral: true });
            }

            if (interaction.customId === 'close-ticket') {
                 if (!interaction.member.roles.cache.has(guildSettings.staffRole) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                    const topic = interaction.channel.topic;
                    const creatorId = topic.split('Creador ID: ')[1];
                    if (interaction.user.id !== creatorId) {
                         return interaction.reply({ content: 'No tienes permiso para cerrar este ticket.', ephemeral: true });
                    }
                }

                await interaction.reply({ content: 'Cerrando el ticket en 5 segundos...', ephemeral: true });

                const attachment = await discordTranscripts.createTranscript(interaction.channel, {
                    filename: `transcript-${interaction.channel.name}.html`,
                    saveImages: true,
                    poweredBy: false
                });

                // Enviar al canal de logs
                const transcriptChannel = interaction.guild.channels.cache.get(guildSettings.transcriptChannel);
                if (transcriptChannel) {
                    const logEmbed = new EmbedBuilder()
                        .setColor('Orange')
                        .setTitle('Ticket Cerrado')
                        .addFields(
                            { name: 'Cerrado por', value: `${interaction.user.tag}`, inline: true },
                            { name: 'Ticket', value: `${interaction.channel.name}`, inline: true }
                        )
                        .setTimestamp();
                    await transcriptChannel.send({ embeds: [logEmbed], files: [attachment] });
                }

                // Enviar al creador del ticket
                try {
                    const topic = interaction.channel.topic;
                    const creatorId = topic.split('Creador ID: ')[1];
                    const ticketCreator = await client.users.fetch(creatorId);
                    await ticketCreator.send({
                        content: `Aquí está la transcripción de tu ticket \`${interaction.channel.name}\` en el servidor **${interaction.guild.name}**.`,
                        files: [attachment]
                    });
                } catch (error) {
                    console.log('No se pudo enviar el transcript al DM del usuario.', error);
                    if (transcriptChannel) {
                        await transcriptChannel.send({ content: `⚠️ No se pudo enviar el transcript por DM al creador del ticket.`});
                    }
                }

                setTimeout(() => interaction.channel.delete(), 5000);
            }
        }
    },
};