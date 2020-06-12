const colors =
{
  hackathon: {
    start: "#0675ce",
    end: "#25c1cb",
  },
  leap: {
    start: "#65de2b",
    end: "#b1cf53",
  },
  mission: {
    start: "#ff7b37",
    end: "#FFBA36",
  },
  webinar: {
    start: "#7106ce",
    end: "#ba9c9c",
  },
  meetup: {
    start: "#86a1f1",
    end: "#b2ce06",
  }
}

const icons = 
{
  hackathon: {
    icon: "fa-laptop-code",
    lg: "lg",
    twoX: "2x"
  },
  leap: {
    icon: "fa-frog",
    lg: "lg",
    twoX: "2x"
  },
  mission: {
    icon: "fa-rocket",
    lg: "lg",
    twoX: "2x"
  },
  webinar: {
    icon: "fa-user-friends",
    lg: "lg",
    twoX: "2x"
  },
  meetup: {
    icon: "fa-handshake",
    lg: "lg",
    twoX: "2x"
  }
}


var events = [];
const eventsListHackathon = document.querySelector("#events-list__hackathon");
const eventInfoButton = document.getElementById("event-info-button");

/**
 * Initialize all the data at the start of the application
 */
function init() {
  console.log('events inside init', events)
  events.forEach(function (event) {
    createEventItem(event);
  });
}

/**
 * Create event object in with and append it to DOM
 * @param {Object} event Event Object
 */
function createEventItem(event) {
  const eventItem = document.createElement("div");
  eventItem.setAttribute("class", "events__item");

  const header = createEventHeader(event);
  const border = createEventBorder(event);
  const content = createEventContent(event);
  const footer = createEventFooter(event);

  eventItem.appendChild(header);
  eventItem.appendChild(border);
  eventItem.appendChild(content);
  eventItem.appendChild(footer);

  eventsListHackathon.appendChild(eventItem);
}

/**
 * Create Event header
 */
function createEventHeader(event) {

  const eventItemHeader = document.createElement("div");
  eventItemHeader.classList.add(
    "events__item-header",
    "events__item-header--top"
  );

  const eventItemHeaderWrapper = document.createElement("div");
  eventItemHeaderWrapper.setAttribute("class", "events__item-header-wrapper");

  const eventItemHeaderIcon = document.createElement("div");
  eventItemHeaderIcon.setAttribute(
    "class",
    `events__item-icon-gradient--${event.type}`
  );

  const svg = createEventSVG(event);

  const icon = document.createElement("i");
  icon.classList.add("fas", `${event.icon.icon}`, `fa-${event.icon.twoX}`);

  eventItemHeaderIcon.appendChild(svg);
  eventItemHeaderIcon.appendChild(icon);

  eventItemHeaderWrapper.appendChild(eventItemHeaderIcon);
  eventItemHeader.appendChild(eventItemHeaderWrapper);

  return eventItemHeader;
}



/**
 * Create Event Border
 */
function createEventBorder(event) {
  const eventBorder = document.createElement("div");
  eventBorder.classList.add("events__item-header-border", `lg--${event.type}`);

  return eventBorder;
}

/**
 * Create Event content
 * @param {Object} event Event Object
 */
function createEventContent(event) {
  const eventContent = document.createElement("div");
  eventContent.setAttribute("class", "events__item-content");

  const eventContentTitle = document.createElement("div");
  eventContentTitle.setAttribute("class", "events__item-title");
  eventContentTitle.appendChild(document.createTextNode(`${event.title}`));

  const eventContentDataWrapper = document.createElement("div");
  eventContentDataWrapper.setAttribute(
    "class",
    "events__location-data-wrapper"
  );

  const eventDate = document.createElement("div");
  eventDate.setAttribute("class", "events__item-date");
  eventDate.appendChild(document.createTextNode(`${event.date}`));

  const eventSeparator = document.createElement("div");
  eventSeparator.setAttribute("class", "events__item-separator");
  eventSeparator.appendChild(document.createTextNode("-"));

  const eventLocation = document.createElement("div");
  eventLocation.setAttribute("class", "events__item-location");
  eventLocation.appendChild(document.createTextNode(`${event.location}`));

  eventContentDataWrapper.appendChild(eventDate);
  eventContentDataWrapper.appendChild(eventSeparator);
  eventContentDataWrapper.appendChild(eventLocation);

  eventContent.appendChild(eventContentTitle);
  eventContent.appendChild(eventContentDataWrapper);

  return eventContent;
}

/**
 * Create Event Footer
 */
function createEventFooter(event) {
  const svgURI = "http://www.w3.org/2000/svg";

  const eventFooter = document.createElement("div");
  eventFooter.setAttribute("class", "events__item-footer");

  const eventSocialMedia = document.createElement("div");
  eventSocialMedia.classList.add(
    "events__item-twitter",
    `events__item-icon-gradient--${event.type}`
  );

  const svg = createEventSVG(event)

  const icon = document.createElement("i");
  icon.classList.add("fas", `${event.icon.icon}`, `fa-${event.icon.lg}`);

  eventSocialMedia.appendChild(svg);
  eventSocialMedia.appendChild(icon);

  const eventDetails = document.createElement("div");
  eventDetails.setAttribute("class", "events__item-details");

  const eventDetailsButton = document.createElement("button");
  eventDetailsButton.classList.add(
    "events__item-details-button",
    `events__item-details-button--${event.type}`
  );
  eventDetailsButton.setAttribute("id", "event-info-button");
  eventDetailsButton.appendChild(document.createTextNode("Details"));

  eventDetails.appendChild(eventDetailsButton);

  eventFooter.appendChild(eventSocialMedia);
  eventFooter.appendChild(eventDetails);

  return eventFooter;
}

function createEventSVG(event) {
  const svgURI = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgURI, "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");

  const radialGradient = document.createElementNS(svgURI, "radialGradient");
  radialGradient.id = `${event.type}-rg`;
  radialGradient.setAttribute("r", "150%");
  radialGradient.setAttribute("cx", "25%");
  radialGradient.setAttribute("cy", "110%");

  const stop = document.createElementNS(svgURI, "stop");
  stop.setAttribute("stop-color", event.color.colorStart);
  stop.setAttribute("offset", "0");

  const stop2 = document.createElementNS(svgURI, "stop");
  stop2.setAttribute("stop-color", event.color.colorEnd);
  stop2.setAttribute("offset", "0.9");

  radialGradient.appendChild(stop);
  radialGradient.appendChild(stop2);

  svg.appendChild(radialGradient);

  return svg;
}

/**
 * Setup event listeners when application is loading to prevent
 * them from throwing null errors
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('were loading stuff?')
  // eventInfoButton.addEventListener('click', (e) => {
  //   e.preventDefault();

  //   console.log('clicked')
  // })

  const loadData = () => {
    if (typeof colors !== 'undefined') {
      events = [
        {
          id: 0,
          title: "We still hacking amidst COVID19!",
          date: "June 26, 2020",
          location: "Vancouver, BC",
          type: "hackathon",
          color: {
            colorStart: colors.hackathon.start,
            colorEnd: colors.hackathon.end
          },
          icon: icons.hackathon,
          content:
            ``,
        },
        {
          id: 1,
          title: "Let's take a leap into this new adventure!",
          date: "June 30, 2020",
          location: "Toronto, ON",
          type: "leap",
          color: {
            colorStart: colors.leap.start,
            colorEnd: colors.leap.end
          },
          icon: icons.leap,
          content:
            ``,
        },
      ];
    } else {
      window.setTimeout(loadData, 250);
      window.setTimeout(init, 250);
    }
  };
  // Initialize
  loadData();
  // run this function when application first loads in the DOM
  init();
});