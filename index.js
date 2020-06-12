const events = [
  {
    id: 1,
    title: "We still hacking amidst COVID19!",
    date: "June 26, 2020",
    location: "Vancouver, BC",
    type: "vanhackathon",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla nunc augue, non auctor leo mattis id. Curabitur ultrices ligula orci, ac iaculis neque tempor eu. Cras porta purus quis velit auctor, ac bibendum neque iaculis. Ut turpis ligula, semper ac lacinia hendrerit, rhoncus ut tortor. Donec tempor auctor orci sit amet consectetur. Vestibulum at mi ut erat volutpat pharetra convallis a tellus. Sed eget elit malesuada, tincidunt purus facilisis, laoreet mauris. Duis malesuada justo at nulla pretium congue. Fusce nec porttitor orci. Sed dapibus metus non laoreet pulvinar. Curabitur eget sodales purus. Donec at leo ut nulla elementum molestie. Curabitur ac consectetur lectus, quis vestibulum augue. Sed sed imperdiet urna.",
  },
];

const eventsListHackathon = document.querySelector("#events-list__hackathon");
const eventInfoButton = document.getElementById("event-info-button");

function init() {
  events.forEach(function (event) {
    createEventItem(event);
  });
}

function createEventItem(event) {
  const eventItem = document.createElement("div");
  eventItem.setAttribute("class", "events__item");

  const header = createEventHeader();
  const border = createEventBorder();
  const content = createEventContent(event);
  const footer = createEventFooter();

  eventItem.appendChild(header);
  eventItem.appendChild(border);
  eventItem.appendChild(content);
  eventItem.appendChild(footer);

  eventsListHackathon.appendChild(eventItem);
}

function createEventHeader() {
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
    "events__item-icon-gradient--hackathon"
  );

  eventItemHeaderIcon.innerHTML = `
                      <svg width="0" height="0">
                        <radialGradient
                          id="hackathon-rg"
                          r="150%"
                          cx="25%"
                          cy="110%"
                        >
                          <stop stop-color="#0675ce" offset="0" />
                          <stop stop-color="#25c1cb" offset="0.9" />
                        </radialGradient>
                      </svg>
                      <i class="fas fa-laptop-code fa-2x"></i>
  `;

  eventItemHeaderWrapper.appendChild(eventItemHeaderIcon);
  eventItemHeader.appendChild(eventItemHeaderWrapper);

  return eventItemHeader;
}

function createEventBorder() {
  const eventBorder = document.createElement("div");
  eventBorder.classList.add("events__item-header-border", "lg--hackathon");

  return eventBorder;
}

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

function createEventFooter() {
  const eventFooter = document.createElement("div");
  eventFooter.setAttribute("class", "events__item-footer");

  const eventSocialMedia = document.createElement("div");
  eventSocialMedia.classList.add(
    "events__item-twitter",
    "events__item-icon-gradient--hackathon"
  );

  const svg = document.createElement("svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");

  const radialGradient = document.createElement("radialGradient");
  radialGradient.setAttribute("id", "hackathon-rg");
  radialGradient.setAttribute("r", "150%");
  radialGradient.setAttribute("cx", "25%");
  radialGradient.setAttribute("cy", "110%");

  const stop = document.createElement("stop");
  stop.setAttribute("stop-color", "#0675ce");
  stop.setAttribute("offset", "0");

  const stop2 = document.createElement("stop");
  stop2.setAttribute("stop-color", "#25c1cb");
  stop2.setAttribute("offset", "0.9");

  const icon = document.createElement("i");
  icon.classList.add("fab", "fa-twitter", "fa-lg");

  radialGradient.appendChild(stop);
  radialGradient.appendChild(stop2);

  svg.appendChild(radialGradient);

  eventSocialMedia.appendChild(svg);
  eventSocialMedia.appendChild(icon);

  const eventDetails = document.createElement("div");
  eventDetails.setAttribute("class", "events__item-details");

  const eventDetailsButton = document.createElement("button");
  eventDetailsButton.classList.add(
    "events__item-details-button",
    "events__item-details-button--hackathon"
  );
  eventDetailsButton.setAttribute("id", "event-info-button");
  eventDetailsButton.appendChild(document.createTextNode("Details"));

  eventDetails.appendChild(eventDetailsButton);

  eventFooter.appendChild(eventSocialMedia);
  eventFooter.appendChild(eventDetails);

  return eventFooter;
}

document.addEventListener('DOMContentLoaded', function () {
  eventInfoButton.addEventListener('click', function(e) {
    e.preventDefault();
  
    console.log('clicked')
  })
});
if (eventInfoButton) {
  
}
window.onload = function() {
}

init();
