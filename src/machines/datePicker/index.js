import { isValidDate, format as formatDate } from 'utils/date'
import { createMachine, assign, spawn, send } from 'xstate'
import { createCalendarMachine } from 'machines/calendar'

export const datePickerMachine = createMachine(
  {
    id: 'datePicker',
    initial: 'startup',
    context: {
      inputDateString: null,
      format: 'YYYY/MM/DD',
      selectedDate: new Date(),
      calendarActor: null,
      onChangeHook: () => {},
    },
    states: {
      startup: {
        entry: 'init',
        always: 'idle',
      },
      idle: {
        on: {
          OPEN: { actions: 'openCalendar' },
          CLICK: 'typing',
        },
      },
      typing: {
        entry: 'closeCalendar',
        on: {
          OPEN: { actions: 'openCalendar' },
          CHANGE: [
            {
              target: '.finished',
              cond: { type: 'isValidDate' },
              actions: [
                'updateDateString',
                'updateSelectedDate',
                'updateCalendar',
                'triggerOnChangeHook',
              ],
            },
            {
              target: '.invalid',
              actions: ['updateDateString'],
            },
          ],
        },
        initial: 'finished',
        states: {
          finished: {},
          invalid: {},
        },
      },
    },
    on: {
      UPDATE: {
        target: 'idle',
        actions: ['syncSelectedDateWithCalendar', 'triggerOnChangeHook'],
      },
    },
  },
  {
    guards: {
      isValidDate: ({ format }, { date }) => isValidDate(date, format),
    },
    actions: {
      init: assign({
        calendarActor: ({ selectedDate }) =>
          spawn(createCalendarMachine({ initDate: selectedDate })),
        inputDateString: ({ format, selectedDate }) =>
          formatDate(selectedDate, format),
      }),
      openCalendar: send('OPEN', { to: ({ calendarActor }) => calendarActor }),
      closeCalendar: send('CLOSE', {
        to: ({ calendarActor }) => calendarActor,
      }),
      updateCalendar: send(
        (_, { date }) => ({ type: 'UPDATE', date: new Date(date) }),
        { to: ({ calendarActor }) => calendarActor }
      ),
      updateSelectedDate: assign({
        selectedDate: (_, { date }) => new Date(date),
      }),
      updateDateString: assign({
        inputDateString: (_, { date }) => date,
      }),
      syncSelectedDateWithCalendar: assign({
        inputDateString: ({ format }, { date }) => formatDate(date, format),
        selectedDate: (_, { date }) => new Date(date),
      }),
      triggerOnChangeHook: ({ onChangeHook, selectedDate }) =>
        onChangeHook(new Date(selectedDate)),
    },
  }
)
