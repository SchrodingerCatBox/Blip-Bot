const { ActivityType } = require("discord.js");

module.exports = (client) => {
  console.log(`${client.user.tag} is online.`);
  
  function updateActivity() {
      let date = new Date();
      let hours = date.getUTCHours();
      let minutes = date.getUTCMinutes();
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      client.user.setActivity({
          name: `${hours}:${minutes} ST`,
          type: ActivityType.Playing,
      });
  }

  updateActivity();

  const interval = setInterval(updateActivity, 15000);
};