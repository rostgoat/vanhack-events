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
  },
  premium: {
    icon: "fa-gem",
    sm: "sm"
  }
}


let events = [];
let overlayStatus = false;
const overlay = document.getElementById('overlay');
const eventsListHackathon = document.querySelector("#events-list__hackathon");
const eventsListLeap = document.querySelector("#events-list__leap");
const eventsListMission = document.querySelector("#events-list__mission");
const eventsListWebinarFree = document.querySelector("#events-list__webinar--free");
const eventsListWebinarPremium = document.querySelector("#events-list__webinar--premium");
const eventsListMeetup = document.querySelector("#events-list__meetup");


/**
 * Initialize all the data at the start of the application
 */
function init() {
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
  const type = event.type;

  if (type === 'hackathon' || type === 'leap' || type === 'mission') {
    eventItem.classList.add("events__item", "events__item--top");
  } else {
    eventItem.classList.add("events__item", "events__item--bottom");
  }

  const header = createEventHeader(event);
  const border = createEventBorder(event);
  const content = createEventContent(event);
  const footer = createEventFooter(event);

  eventItem.appendChild(header);
  eventItem.appendChild(border);
  eventItem.appendChild(content);
  eventItem.appendChild(footer);

  addEventIntoDOM(event.type, eventItem)
}

/**
 * Add elements into correct place into the DOM based on type
 * 
 * @param {String} type Event type
 * @param {XMLDocument } type eventElement 
 */
function addEventIntoDOM(type, eventElement) {
  switch (type) {
    case 'hackathon':
      return eventsListHackathon.appendChild(eventElement);
    case 'leap':
      return eventsListLeap.appendChild(eventElement);
    case 'mission':
      return eventsListMission.appendChild(eventElement);
    case 'webinar--free':
      return eventsListWebinarFree.appendChild(eventElement);
    case 'webinar--premium':
      return eventsListWebinarPremium.appendChild(eventElement);
    case 'meetup':
      return eventsListMeetup.appendChild(eventElement);
    default:
      return;
  }
}

/**
 * Create Event header
 */
function createEventHeader(event) {

  const eventItemHeader = document.createElement("div");
  eventItemHeader.classList.add(
    "events__item-header",
    `events__item-header--${event.position}`
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

  if (event.type.includes('webinar') && event.premium) {
    const webinarPremiumSpan = document.createElement("span");
    webinarPremiumSpan.setAttribute("class", "events__item-diamond")
  
    const premiumIcon = document.createElement("i");
    premiumIcon.classList.add("fas", `${event.premiumIcon.icon}`, `fa-${event.premiumIcon.sm}`);
    
    webinarPremiumSpan.appendChild(premiumIcon)
    webinarPremiumSpan.appendChild(document.createTextNode(" Premium"));
    eventContent.appendChild(webinarPremiumSpan)
  }

  eventContent.appendChild(eventContentTitle);
  eventContent.appendChild(eventContentDataWrapper);

  return eventContent;
}

/**
 * Create Event Footer
 */
function createEventFooter(event) {
  const eventFooter = document.createElement("div");
  eventFooter.setAttribute("class", "events__item-footer");

  const eventSocialMedia = document.createElement("div");
  eventSocialMedia.classList.add(
    "events__item-twitter",
    `events__item-icon-gradient--${event.type}`
  );

  const svg = createEventSVG(event)

  const icon = document.createElement("i");
  icon.classList.add("fab", "fa-twitter", `fa-${event.icon.lg}`);

  eventSocialMedia.appendChild(svg);
  eventSocialMedia.appendChild(icon);

  const eventDetails = document.createElement("div");
  eventDetails.setAttribute("class", "events__item-details");

  const eventDetailsButton = document.createElement("button");
  eventDetailsButton.classList.add(
    "events__item-details-button",
    `events__item-details-button--${event.type}`
  );
  eventDetailsButton.setAttribute("type", "button")
  eventDetailsButton.addEventListener('click', showEventDetails.bind(null, event))
  eventDetailsButton.appendChild(document.createTextNode("Details"));

  eventDetails.appendChild(eventDetailsButton);

  eventFooter.appendChild(eventSocialMedia);
  eventFooter.appendChild(eventDetails);

  return eventFooter;
}

/**
 * Setup svg icons for event in DOM
 * @param {Object} event Event Object
 */
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

function showEventDetails(event) {
  overlayStatus = !overlayStatus;
  if (overlayStatus) {
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
  } 
  console.log('clicked on event button', JSON.stringify(event, null, 2))
}


/**
 * Some function to keep track of window global events
 * @param {Event} event DOM event
 */
window.onclick = function(event) {
  if (event.target == overlay) {
    overlay.style.display = "none";
    overlayStatus = !overlayStatus;
  }
}

/**
 * Setup event listeners when application is loading to prevent
 * them from throwing null errors
 */
document.addEventListener('DOMContentLoaded', () => {
  const loadData = () => {
    if (typeof colors !== 'undefined') {
      events = [
        {
          id: 0,
          title: "We still hacking amidst COVID19!",
          date: "June 26, 2020",
          position: "top",
          premium: false,
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
          position: "top",
          premium: false,
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
        {
          id: 2,
          title: "Rebuilding our organization in 3 easy steps",
          date: "July 3, 2020",
          position: "top",
          premium: false,
          location: "New York, NY",
          type: "mission",
          color: {
            colorStart: colors.mission.start,
            colorEnd: colors.mission.end
          },
          icon: icons.mission,
          content:
            ``,
        },
        {
          id: 3,
          title: "Rebuilding our organization in 3 easy steps",
          date: "July 3, 2020",
          position: "top",
          premium: false,
          location: "New York, NY",
          type: "mission",
          color: {
            colorStart: colors.mission.start,
            colorEnd: colors.mission.end
          },
          icon: icons.mission,
          content:
            ``,
        },
        {
          id: 4,
          title: "Let's do this",
          date: "Aug 6, 2020",
          position: "top",
          premium: false,
          location: "Vancouver, BC",
          type: "mission",
          color: {
            colorStart: colors.mission.start,
            colorEnd: colors.mission.end
          },
          icon: icons.mission,
          content:
            ``,
        },
        {
          id: 5,
          title: "Expanding dev teams post COVID",
          date: "Sept 15, 2020",
          position: "top",
          premium: false,
          location: "Los Angeles, CA",
          type: "mission",
          color: {
            colorStart: colors.mission.start,
            colorEnd: colors.mission.end
          },
          icon: icons.mission,
          content:
            ``,
        },
        {
          id: 6,
          title: "Node.js Meetup in Seattle",
          date: "July 15, 2020",
          position: "bottom",
          premium: false,
          location: "Seattle, WA",
          type: "meetup",
          color: {
            colorStart: colors.meetup.start,
            colorEnd: colors.meetup.end
          },
          icon: icons.meetup,
          content:
            ``,
        },
        {
          id: 7,
          title: "OpenGL Webinar",
          date: "July 12, 2020",
          position: "bottom",
          premium: false,
          location: "Seattle, WA",
          type: "webinar--free",
          color: {
            colorStart: colors.webinar.start,
            colorEnd: colors.webinar.end
          },
          icon: icons.webinar,
          content:
            ``,
        },
        {
          id: 8,
          title: "Java Webinar with special guest",
          date: "July 13, 2020",
          position: "bottom",
          premium: true,
          location: "Seattle, WA",
          type: "webinar--premium",
          color: {
            colorStart: colors.webinar.start,
            colorEnd: colors.webinar.end
          },
          icon: icons.webinar,
          premiumIcon: icons.premium,
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