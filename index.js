const colors = {
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
  },
};

const icons = {
  hackathon: {
    icon: "fa-laptop-code",
    lg: "lg",
    twoX: "2x",
  },
  leap: {
    icon: "fa-frog",
    lg: "lg",
    twoX: "2x",
  },
  mission: {
    icon: "fa-rocket",
    lg: "lg",
    twoX: "2x",
  },
  webinar: {
    icon: "fa-user-friends",
    lg: "lg",
    twoX: "2x",
  },
  meetup: {
    icon: "fa-handshake",
    lg: "lg",
    twoX: "2x",
  },
  premium: {
    icon: "fa-gem",
    sm: "sm",
  },
};

let events = [];
let overlayStatus = false;
const overlayEventDetails = document.getElementById("overlay-details");
const overlayPremiumSignup = document.getElementById("overlay-premium");
const overlayContainer = document.getElementById("overlay-container");
const eventsListHackathon = document.querySelector("#events-list__hackathon");
const eventsListLeap = document.querySelector("#events-list__leap");
const eventsListMission = document.querySelector("#events-list__mission");
const eventsListWebinarFree = document.querySelector(
  "#events-list__webinar--free"
);
const eventsListWebinarPremium = document.querySelector(
  "#events-list__webinar--premium"
);
const eventsListMeetup = document.querySelector("#events-list__meetup");
const overlayPremiumWarningTitle = `
Uh-Oh..You Need Premium to Register for this Event!
`;
const overlayPremiumWarningContent = `
VanHack Premium is pretty sweet. You get so many cool features,
          including access to this event! Sign up now for only $65 a month!
`;

/**
 * Initialize all the data at the start of the application
 */
const init = () => {
  events.forEach((event) => {
    createEventItem(event);
  });
};

/**
 * Create event object in with and append it to DOM
 * @param {Object} event Event Object
 */
const createEventItem = (event) => {
  const eventItem = document.createElement("div");
  const type = event.type;
  const className = "events__item-header-border";

  if (type === "hackathon" || type === "leap" || type === "mission") {
    eventItem.classList.add("events__item", "events__item--top");
  } else {
    eventItem.classList.add("events__item", "events__item--bottom");
  }

  const header = createEventHeader(event);
  const border = createBorder(className, event, false);
  const content = createEventContent(event);
  const footer = createEventFooter(event);

  eventItem.appendChild(header);
  eventItem.appendChild(border);
  eventItem.appendChild(content);
  eventItem.appendChild(footer);

  addEventIntoDOM(event.type, eventItem);
};

/**
 * Append event/overlay elements into the DOM
 *
 * @param {String} type Event type
 * @param {XMLDocument } type eventElement
 */
const addEventIntoDOM = (type, eventElement) => {
  switch (type) {
    case "hackathon":
      return eventsListHackathon.appendChild(eventElement);
    case "leap":
      return eventsListLeap.appendChild(eventElement);
    case "mission":
      return eventsListMission.appendChild(eventElement);
    case "webinar--free":
      return eventsListWebinarFree.appendChild(eventElement);
    case "webinar--premium":
      return eventsListWebinarPremium.appendChild(eventElement);
    case "meetup":
      return eventsListMeetup.appendChild(eventElement);
    case "overlay-event-details":
      return overlayEventDetails.appendChild(eventElement);
    case "overlay-premium-warning":
      return overlayPremiumSignup.appendChild(eventElement);
    default:
      return;
  }
};

/**
 * Create Event header
 */
const createEventHeader = (event) => {
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
};

/**
 * Create colorful border for box elements
 * @param {String} className css classname
 * @param {Object} event Event to render
 * @param {Boolean} customColor flag for custom color
 */
const createBorder = (className, event, customColor) => {
  const borderColor =
    event.type === "webinar--premium" && customColor
      ? `lg--danger`
      : `lg--${event.type}`;
  const eventBorder = document.createElement("div");
  eventBorder.classList.add(className, borderColor);

  return eventBorder;
};

/**
 * Create Event content
 * @param {Object} event Event Object
 */
const createEventContent = (event) => {
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

  if (event.type.includes("webinar") && event.premium) {
    const webinarPremiumSpan = document.createElement("span");
    webinarPremiumSpan.setAttribute("class", "events__item-diamond");

    const premiumIcon = document.createElement("i");
    premiumIcon.classList.add(
      "fas",
      `${event.premiumIcon.icon}`,
      `fa-${event.premiumIcon.sm}`
    );

    webinarPremiumSpan.appendChild(premiumIcon);
    webinarPremiumSpan.appendChild(document.createTextNode(" Premium"));
    eventContent.appendChild(webinarPremiumSpan);
  }

  eventContent.appendChild(eventContentTitle);
  eventContent.appendChild(eventContentDataWrapper);

  return eventContent;
};

/**
 * Create Event Footer
 */
const createEventFooter = (event) => {
  const eventFooter = document.createElement("div");
  eventFooter.setAttribute("class", "events__item-footer");

  const eventSocialMedia = document.createElement("div");
  eventSocialMedia.classList.add(
    "events__item-twitter",
    `events__item-icon-gradient--${event.type}`
  );
  eventSocialMedia.id = "twitter-button";

  const svg = createEventSVG(event);

  const icon = document.createElement("i");
  icon.classList.add("fab", "fa-twitter", `fa-${event.icon.lg}`);

  const tweet = `Checkout @VanHack's '${event.title}' event on ${event.date}, located in ${event.location}!`;
  const twitterAnchor = document.createElement("a");
  twitterAnchor.setAttribute(
    "href",
    `https://twitter.com/intent/tweet?text=${tweet}`
  );

  eventSocialMedia.appendChild(svg);
  eventSocialMedia.appendChild(icon);
  twitterAnchor.appendChild(eventSocialMedia);

  const eventDetails = document.createElement("div");
  eventDetails.setAttribute("class", "events__item-details");

  const buttonBorderColor = event.type.includes("webinar")
    ? "events__item-details-button--webinar--free"
    : `events__item-details-button--${event.type}`;
  const eventDetailsButton = document.createElement("button");
  eventDetailsButton.id = "events__item-details-button";
  eventDetailsButton.classList.add(
    "events__item-details-button",
    buttonBorderColor
  );
  eventDetailsButton.setAttribute("type", "button");

  // show warning message if user clicks on premium event
  if (event.premium) {
    eventDetailsButton.addEventListener(
      "click",
      insertOverlayIntoDOM.bind(
        null,
        event,
        overlayPremiumSignup,
        "overlay-premium-warning"
      )
    );
  } else {
    // otherwise show event details
    eventDetailsButton.addEventListener(
      "click",
      insertOverlayIntoDOM.bind(
        null,
        event,
        overlayEventDetails,
        "overlay-event-details"
      )
    );
  }
  eventDetailsButton.appendChild(document.createTextNode("Details"));

  eventDetails.appendChild(eventDetailsButton);

  eventFooter.appendChild(twitterAnchor);
  eventFooter.appendChild(eventDetails);

  return eventFooter;
};

/**
 * Setup svg icons for event in DOM
 * @param {Object} event Event Object
 */
const createEventSVG = (event) => {
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
};

/**
 * Display overlay on event click
 * @param {Object} event Event data object
 * @param {String} overlayType Premium or Regular overlay
 */
const createEventOverlay = (event, overlayType) => {
  const className = "overlay__header-border";

  const overlayElementContainer = document.createElement("div");
  overlayElementContainer.setAttribute("class", "overlay-container");
  overlayElementContainer.id = "overlay-container";

  let locationAndDate;
  if (event.type !== "webinar--premium")
    locationAndDate = createOverlayLocationDate(event);
  const header = createEventOverlayHeader(event);
  const border = createBorder(className, event, true);
  const content = createEventOverlayContent(event);
  const footer = createEventOverlayFooter(event);

  overlayElementContainer.appendChild(header);
  overlayElementContainer.appendChild(border);
  overlayElementContainer.appendChild(content);
  if (!!locationAndDate) overlayElementContainer.appendChild(locationAndDate);
  overlayElementContainer.appendChild(footer);

  addEventIntoDOM(overlayType, overlayElementContainer);
};

/**
 * Create overlay header
 * @param {Object} event Event data object
 */
const createEventOverlayHeader = (event) => {
  const header = document.createElement("div");
  header.setAttribute("class", "overlay__header");

  const title = document.createElement("div");
  title.setAttribute("class", "overlay__title");
  if (event.premium) {
    overlayPremiumWarningTitle;
    title.appendChild(document.createTextNode(overlayPremiumWarningTitle));
  } else {
    title.appendChild(document.createTextNode(`${event.title}`));
  }

  header.appendChild(title);

  return header;
};

/**
 * Create overlay content
 * @param {Object} event Event data object
 */
const createEventOverlayContent = (event) => {
  const content = document.createElement("div");
  content.setAttribute("class", "overlay__content");

  const paragraph = document.createElement("div");
  paragraph.setAttribute("class", "event__text");

  // if the event is a premium webinar, show warning, else show event content
  if (event.premium) {
    paragraph.appendChild(
      document.createTextNode(overlayPremiumWarningContent)
    );
  } else {
    paragraph.appendChild(document.createTextNode(`${event.content}`));
  }

  content.appendChild(paragraph);

  return content;
};

/**
 * Create date and location container
 * @param {Object} event Event data object
 */
const createOverlayLocationDate = (event) => {
  const locationAndDateContainer = document.createElement("div");
  locationAndDateContainer.setAttribute(
    "class",
    "overlay__location-date-container"
  );

  const location = document.createElement("div");
  location.setAttribute("class", "overlay__location");
  location.appendChild(document.createTextNode(`${event.location}`));

  const separator = document.createElement("div");
  separator.setAttribute("class", "overlay__separator");
  separator.appendChild(document.createTextNode(" - "));

  const date = document.createElement("div");
  date.setAttribute("class", "overlay__date");
  date.appendChild(document.createTextNode(`${event.date}`));

  locationAndDateContainer.appendChild(location);
  locationAndDateContainer.appendChild(separator);
  locationAndDateContainer.appendChild(date);

  return locationAndDateContainer;
};

/**
 * Create overlay footer
 * @param {Object} event Event data object
 */
const createEventOverlayFooter = (event) => {
  let buttonColor;

  // change button border color based on event state
  if (event.type === "webinar--free") {
    buttonColor = `overlay__registration-button--webinar--free`;
  } else if (event.type === "webinar--premium") {
    buttonColor = `overlay__registration-button--danger`;
  } else {
    buttonColor = `overlay__registration-button--${event.type}`;
  }

  const footer = document.createElement("div");
  footer.setAttribute("class", "overlay__footer");
  footer.id = "overlay__footer";

  const registrationButtonContainer = document.createElement("div");
  registrationButtonContainer.setAttribute(
    "class",
    "overlay__registration-container"
  );

  const registrationButton = document.createElement("button");
  registrationButton.classList.add("overlay__registration-button", buttonColor);
  registrationButton.setAttribute("type", "button");

  // depending on if the event is a premium webinar or not, fire different click events
  if (event.premium) {
    registrationButton.addEventListener(
      "click",
      redirectRegistration.bind(null)
    );
  } else {
    registrationButton.addEventListener(
      "click",
      registerUserForEvent.bind(null, event.title)
    );
    registrationButton.id = "overlay__registration-button";
  }

  // change button text based on if event is premium webinar and on user's registration status
  if (event.premium) {
    registerButtonText = "Get Premium";
  } else {
    registerButtonText = "Register Now!";
  }

  registrationButton.appendChild(document.createTextNode(registerButtonText));

  registrationButtonContainer.appendChild(registrationButton);

  footer.appendChild(registrationButtonContainer);

  return footer;
};

/**
 * Remove specified overlay from the DOM and switch overlay status to closed
 * @param {String} element Element's class name
 */
const removeOverlayFromDOM = (element) => {
  element.style.display = "none";
  element.removeChild(element.firstElementChild);
  overlayStatus = !overlayStatus;
};

/**
 * Insert and display overlay in the DOM
 * @param {Object} event Event data object
 * @param {String} element Event Parent class name
 * @param {String} className Event class name
 */
const insertOverlayIntoDOM = (event, element, className) => {
  overlayStatus = !overlayStatus;
  if (overlayStatus) {
    createEventOverlay(event, className);
    element.style.display = "flex";
    element.style.alignItems = "center";
    element.style.justifyContent = "center";
  }
};

/**
 * Loop through events and check to see if event has been registered for.
 * Swtich event status to 'registered' and display confirmation for the user.
 * @param {String} event Event title
 */
const registerUserForEvent = (eventTitle) => {
  const overlayRegistrationMessage = createRegistrationConfirmationMessage();
  const overlayFooter = document.getElementById("overlay__footer");

  let regError;
  events.forEach((e) => {
    if (e.title === eventTitle) {
      if (e.status === "registered") regError = true;
      else e.status = "registered";
    }
  });

  // add reg message to footer
  overlayFooter.appendChild(overlayRegistrationMessage);

  // display reg message
  overlayRegistrationMessage.style.display = "flex";
  overlayRegistrationMessage.style.alignItems = "center";
  overlayRegistrationMessage.style.justifyContent = "center";

  // show either success or error message
  if (regError) {
    overlayRegistrationMessage.style.backgroundColor = "#b91b15";
    overlayRegistrationMessage.innerHTML = "Already Registered!";
  } else {
    overlayRegistrationMessage.style.backgroundColor = "#48b915";
  }

  // remove message after 2 seconds
  setInterval(() => {
    overlayRegistrationMessage.style.display = "none";
  }, 2000);
};

/**
 * Redirect user to vanhack's premium page
 */
const redirectRegistration = () => {
  window.open("https://vanhack.com/premium");
};

const createRegistrationConfirmationMessage = () => {
  const registrationSuccess = document.createElement("div");
  registrationSuccess.classList.add("overlay__registration-success");
  registrationSuccess.id = "overlay__registration-success";
  registrationSuccess.style.display = "none";
  registrationSuccess.appendChild(document.createTextNode("Registered!"));
  return registrationSuccess;
};

/**
 * Close overlays and remove overlay children from DOM when clicking outside of the overlay-container
 * @param {Event} event DOM event
 */
window.onclick = (event) => {
  if (event.target == overlayEventDetails) {
    removeOverlayFromDOM(overlayEventDetails);
  } else if (event.target == overlayPremiumSignup) {
    removeOverlayFromDOM(overlayPremiumSignup);
  }
};

/**
 * Close overlays and remove overlay children from DOM when clicking the ESC key
 * @param {Event} event DOM event
 */
window.onkeydown = (event) => {
  if (event.keyCode == 27 && overlayEventDetails.style.display == "flex") {
    removeOverlayFromDOM(overlayEventDetails);
  } else if (
    event.keyCode == 27 &&
    overlayPremiumSignup.style.display == "flex"
  ) {
    removeOverlayFromDOM(overlayPremiumSignup);
  }
};

/**
 * Setup event listeners when application is loading to prevent
 * them from throwing null errors
 */
document.addEventListener("DOMContentLoaded", () => {
  const loadData = () => {
    // wait for colors to load before creating events and assigning them to events
    if (typeof colors !== "undefined") {
      events = [
        {
          title: "We Still Hacking Amidst COVID19!",
          date: "June 26, 2020",
          position: "top",
          premium: false,
          status: "unregistered",
          location: "Vancouver, BC",
          type: "hackathon",
          color: {
            colorStart: colors.hackathon.start,
            colorEnd: colors.hackathon.end,
          },
          icon: icons.hackathon,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "BCIT Hackathon Live!",
          date: "June 27, 2020",
          position: "top",
          premium: false,
          status: "unregistered",
          location: "Burnaby, BC",
          type: "hackathon",
          color: {
            colorStart: colors.hackathon.start,
            colorEnd: colors.hackathon.end,
          },
          icon: icons.hackathon,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Biggest Xmas Hackathon in Canada",
          date: "Dec 26, 2020",
          position: "top",
          premium: false,
          status: "unregistered",
          location: "Remote",
          type: "hackathon",
          color: {
            colorStart: colors.hackathon.start,
            colorEnd: colors.hackathon.end,
          },
          icon: icons.hackathon,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Let's Take a Leap Into This New Adventure!",
          date: "June 30, 2020",
          position: "top",
          premium: false,
          status: "unregistered",
          location: "Toronto, ON",
          type: "leap",
          color: {
            colorStart: colors.leap.start,
            colorEnd: colors.leap.end,
          },
          icon: icons.leap,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Come Join Our Women's Coding Bootcamp!",
          date: "Aug 7, 2020",
          position: "top",
          premium: false,
          status: "unregistered",
          location: "Chicago, IL",
          type: "leap",
          color: {
            colorStart: colors.leap.start,
            colorEnd: colors.leap.end,
          },
          icon: icons.leap,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Rebuilding our organization in 3 easy steps",
          date: "July 3, 2020",
          position: "top",
          premium: false,
          status: "unregistered",
          location: "New York, NY",
          type: "mission",
          color: {
            colorStart: colors.mission.start,
            colorEnd: colors.mission.end,
          },
          icon: icons.mission,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Rebuilding our organization in 3 easy steps",
          date: "July 3, 2020",
          position: "top",
          premium: false,
          status: "unregistered",
          location: "New York, NY",
          type: "mission",
          color: {
            colorStart: colors.mission.start,
            colorEnd: colors.mission.end,
          },
          icon: icons.mission,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Let's do this",
          date: "Aug 6, 2020",
          position: "top",
          premium: false,
          status: "unregistered",
          location: "Vancouver, BC",
          type: "mission",
          color: {
            colorStart: colors.mission.start,
            colorEnd: colors.mission.end,
          },
          icon: icons.mission,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Expanding dev teams post COVID",
          date: "Sept 15, 2020",
          position: "top",
          premium: false,
          status: "unregistered",
          location: "Los Angeles, CA",
          type: "mission",
          color: {
            colorStart: colors.mission.start,
            colorEnd: colors.mission.end,
          },
          icon: icons.mission,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Node.js Meetup in Seattle",
          date: "July 15, 2020",
          position: "bottom",
          premium: false,
          status: "unregistered",
          location: "Seattle, WA",
          type: "meetup",
          color: {
            colorStart: colors.meetup.start,
            colorEnd: colors.meetup.end,
          },
          icon: icons.meetup,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Come Learn About AWS Services!",
          date: "July 30, 2020",
          position: "bottom",
          premium: false,
          status: "unregistered",
          location: "Vancouver, WA",
          type: "meetup",
          color: {
            colorStart: colors.meetup.start,
            colorEnd: colors.meetup.end,
          },
          icon: icons.meetup,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "OpenGL Webinar",
          date: "July 12, 2020",
          position: "bottom",
          premium: false,
          status: "unregistered",
          location: "Seattle, WA",
          type: "webinar--free",
          color: {
            colorStart: colors.webinar.start,
            colorEnd: colors.webinar.end,
          },
          icon: icons.webinar,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Java Webinar with special guest",
          date: "July 13, 2020",
          position: "bottom",
          premium: true,
          status: "unregistered",
          location: "Seattle, WA",
          type: "webinar--premium",
          color: {
            colorStart: colors.webinar.start,
            colorEnd: colors.webinar.end,
          },
          icon: icons.webinar,
          premiumIcon: icons.premium,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
        {
          title: "Special Webinar with VSW Team!",
          date: "July 14, 2020",
          position: "bottom",
          premium: true,
          status: "unregistered",
          location: "Los Angeles, CA",
          type: "webinar--premium",
          color: {
            colorStart: colors.webinar.start,
            colorEnd: colors.webinar.end,
          },
          icon: icons.webinar,
          premiumIcon: icons.premium,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor dolor 
          ullamcorper maximus tincidunt. Vestibulum mattis enim a neque auctor luctus. 
          Aenean molestie venenatis arcu, quis volutpat metus vehicula vitae. Nullam 
          porttitor, quam tincidunt blandit tristique, nisl tortor sagittis nulla, 
          ullamcorper dignissim ligula odio ac ipsum. Curabitur metus risus, ultricies 
          ut ex at, consequat tempus est. Etiam iaculis odio a arcu varius, et volutpat `,
        },
      ];
    } else {
      // keep reloading const until =  DOM render=>s
      window.setTimeout(loadData, 250);
      window.setTimeout(init, 250);
    }
  };
  // Initialize
  loadData();
  // run this const when =  application first loads in the DO=>M
  init();
});
