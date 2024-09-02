
    async function CurrentUserMeetings(id, eventTitle, endDateTime, startDateTime, description, checkInAddress, meetingDetails, whatIdName, whatIdId) {
      const splitDate = startDateTime.split("T")[0];
      console.log("split date", splitDate); // 2024-09-11

      const [year, month, day] = splitDate.split('-');
      const dayWithoutLeadingZero = parseInt(day, 10);
      const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1];

      const formattedDate = `${dayWithoutLeadingZero} - ${monthName}`;
      console.log(formattedDate); // Output: "11 - Sep"


      // const formattedDate = splitDate.split("-").reverse().join("/");
      const formattedStartTime = new Date(startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedEndTime = new Date(endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const OrgId = await fetchOrgInfo();
      const url = `https://crm.zoho.com/crm/org${OrgId}/tab/Events/${id}`;

      // Create the event card HTML with a link wrapping the entire card
      const eventCardHTML = `
          <div class="col-12">
              <a href="${url}" target="_blank" class="card-link">
                  <div class="card">
                      <div class="row no-gutters">
                          <div class="col-md-2 card-date">
                          ${dayWithoutLeadingZero}<br>
                            ${monthName}
                          </div>                          
                          <div class="col-md-8 card-details">
                              <div class="card-body">
                                  <h5 class="card-title">
                                      <i class="fas fa-calendar-day"></i> ${isValidValue(eventTitle) ? eventTitle : ""}
                                  </h5>
                                  <p><i class="fas fa-clock"></i> ${formattedStartTime} - ${formattedEndTime}</p>
                                  <p>${isValidValue(meetingDetails) ? meetingDetails : ""}</p>
                              </div>
                          </div>
                          <div class="col-md-2">
                              <div class="status-tag">
                                  <i class="fas fa-check-circle" style="color:#00D1B2"></i> Confirmed
                              </div>
                          </div>
                      </div>
                  </div>
              </a>
          </div>
      `;

      // Append the event card to the container in the UI
      const container = document.getElementById('event-cards');
      const eventCardElement = document.createElement('div');
      eventCardElement.innerHTML = eventCardHTML;
      container.appendChild(eventCardElement);
    }
