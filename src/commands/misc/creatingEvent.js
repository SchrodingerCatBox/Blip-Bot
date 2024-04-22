const { GuildScheduledEventManager, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType, ApplicationCommandOptionType, GuildScheduledEventUser } = require('discord.js');
const dayjs = require('dayjs');
const eventID = require('./../../index.js');
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const imgRNG = require ('./../../assets/img/imgData.js');
const descRNG = require ('./../../assets/description/descriptions.js');


module.exports = {
    name: 'schedule_event',
    description: 'Запланировать ивент.',
    options: [
      {
          name: 'day',
          description: 'День недели.',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
              { name: 'Понедельник', value: '1' },
              { name: 'Вторник', value: '2' },
              { name: 'Среда', value: '3' },
              { name: 'Четверг', value: '4' },
              { name: 'Пятница', value: '5' },
              { name: 'Суббота', value: '6' },
              { name: 'Воскресенье', value: '0' },
          ]
      },
  ],

  async callback(client, interaction) {

    const { options } = interaction;

    const day = options.getString('day');

    let startTime = dayjs().utc().set('hour', 18).set('minute', 0).set('second', 0).add((day >= dayjs().utc().get('day') ? day - dayjs().utc().get('day'): 7 - +dayjs().utc().get('day') + +day), 'day');
    if (day == '0' || day == '6') {
      startTime = dayjs().utc().set('hour', 17).set('minute', 0).set('second', 0).add((day >= dayjs().utc().get('day') ? day - dayjs().utc().get('day'): 7 - +dayjs().utc().get('day') + +day), 'day');
    };

    if (dayjs().utc().get('day') == day && dayjs().utc().get('hour') >= 10) {
      if (day == '0' || day == '6') {
        startTime = dayjs().utc().add(7, 'day').set('hour', 17).set('minute', 0).set('second', 0);
      } else {
      startTime = dayjs().utc().add(7, 'day').set('hour', 18).set('minute', 0).set('second', 0);
      }
    };

    let endTime = startTime.add(3, 'hour');

    console.log(descRNG);
    console.log(imgRNG);

    var randomDescription = descRNG[Math.floor(Math.random() * descRNG.length)];
    var randomImage = imgRNG[Math.floor(Math.random() * imgRNG.length)];

    console.log(randomDescription);
    console.log(randomImage);



    const event_manager = new GuildScheduledEventManager(interaction.guild);

    await event_manager.create({
      name: 'Raid',
      scheduledStartTime: new Date(startTime),
      scheduledEndTime: new Date(endTime),
      privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
      entityType: GuildScheduledEventEntityType.External,
      description: randomDescription,
      entityMetadata: {location: 'FFXIV'},
      image: randomImage,
    });
    interaction.reply(`# <blip> <bleep> \n ${eventID.x.ID}`);

  },
};