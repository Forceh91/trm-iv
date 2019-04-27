"use strict";

const request = require("request-promise");

module.exports = function(nodecg) {
  const eventSchedule = nodecg.Replicant("eventSchedule", {
    persistent: false,
    defaultValue: []
  });
  const scheduleSeek = nodecg.Replicant("scheduleSeek", {
    persistent: false,
    defaultValue: 0
  });

  if (nodecg.bundleConfig.horaro_event == "") {
    nodecg.log.info("Please set Hoararo Event name in the config");
    return;
  }

  if (nodecg.bundleConfig.horaro_schedule == "") {
    nodecg.log.info("Please set Hoararo Schedule name in the config");
    return;
  }

  getSchedule();

  function getSchedule() {
    nodecg.log.info("[SCHEDULE] Fetching the schedule");

    const schedulePromise = request({
      uri: `http://horaro.org/-/api/v1/events/${
        nodecg.bundleConfig.horaro_event
      }/schedules/${nodecg.bundleConfig.horaro_schedule}`,
      json: true
    })
      .then(response => {
        parseSchedule(response.data && response.data.items);
      })
      .catch(error => {
        nodecg.log.info("[SCHEDULE] An error occured: " + error);
      })
      .then(response => {
        nodecg.sendMessage("scheduleReceived");
      });
  }

  function parseSchedule(games) {
    games.forEach((game, index) => {
      game.order = index;
    });

    // schedule array is already in game order
    eventSchedule.value = games;
  }

  // if we tell it to fetch the schedule, do so
  nodecg.listenFor("scheduleFetch", getSchedule);

  // select the next game
  nodecg.listenFor("scheduleSelectNext", function() {
    /*		if (currentGame.value.order + 2 > eventSchedule.value.length)
			return;

		currentGame.value = eventSchedule.value[currentGame.value.order + 1];

		if (nextGame.value && nextGame.value.order + 1 != eventSchedule.value.length)
			nextGame.value = eventSchedule.value[nextGame.value.order + 1];
		else
			nextGame.value = {};*/

    scheduleSeek.value++;
  });

  // select the previous game
  nodecg.listenFor("scheduleSelectPrev", function() {
    /*		if (currentGame.value.order == 0)
			return;

		currentGame.value = eventSchedule.value[currentGame.value.order - 1];

		if (nextGame.value && nextGame.value.order) {
			nextGame.value = eventSchedule.value[nextGame.value.order - 1];
		} else {
			nextGame.value = eventSchedule.value[eventSchedule.value.length - 1];
		}*/

    scheduleSeek.value--;
  });
};
