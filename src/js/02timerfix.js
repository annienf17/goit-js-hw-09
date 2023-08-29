onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      // Here, you can reset or update your countdown display
      countdownDisplay.textContent = "00 00 00 00";
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      buttonStart.disabled = false;
      selectedDate = selectedDates[0];
      Notiflix.Notify.success("The selected date is later than the current one");
    }};