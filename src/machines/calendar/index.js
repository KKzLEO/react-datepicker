import {
  generateCalender,
  generateMonthCalender,
  generateYearCalender,
} from 'utils/calendar'
import { subtract, add, isSameMonth, isSameDacade } from 'utils/date'
import { isNil } from 'utils/base'
import { createMachine, assign, sendParent } from 'xstate'

export const createCalendarMachine = ({ initDate }) =>
  createMachine(
    {
      id: 'calendar',
      initial: 'startup',
      context: {
        calendarDate: initDate,
        dayCalendar: [],
        monthCalendar: [],
        yearCalendar: [],
      },
      states: {
        startup: {
          entry: 'init',
          always: 'close',
        },
        close: {
          on: {
            OPEN: 'open.history',
            UPDATE: {
              actions: [
                'updateCalendar',
                'updateDayCalendar',
                'updateMonthCalendar',
              ],
            },
          },
        },
        open: {
          initial: 'selectingDate',
          states: {
            selectingDate: {
              on: {
                NAV_UP: 'selectingMonth',
                PREV: {
                  actions: [
                    { type: 'subtractCalendarDate', payload: { months: 1 } },
                    'updateDayCalendar',
                  ],
                },
                NEXT: {
                  actions: [
                    { type: 'addCalendarDate', payload: { months: 1 } },
                    'updateDayCalendar',
                  ],
                },
                SELECT: {
                  target: '#calendar.close',
                  cond: 'isSameMonth',
                  actions: [
                    'updateCalendarDate',
                    'syncSelectedDateWithCalendar',
                  ],
                },
              },
            },
            selectingMonth: {
              on: {
                NAV_UP: 'selectingYear',
                PREV: {
                  actions: [
                    {
                      type: 'subtractCalendarDate',
                      payload: { years: 1 },
                    },
                    'updateMonthCalendar',
                  ],
                },
                NEXT: {
                  actions: [
                    { type: 'addCalendarDate', payload: { years: 1 } },
                    'updateMonthCalendar',
                  ],
                },
                SELECT: {
                  target: 'selectingDate',
                  actions: ['updateCalendarDate', 'updateDayCalendar'],
                },
              },
            },
            selectingYear: {
              on: {
                PREV: { actions: ['previousDecade'], cond: 'canPrevDacade' },
                NEXT: { actions: ['nextDecade'], cond: 'canNextDacade' },
                SELECT: {
                  target: 'selectingMonth',
                  cond: 'isSameDacade',
                  actions: ['updateCalendarDate', 'updateMonthCalendar'],
                },
              },
            },
            history: {
              type: 'history',
            },
          },
          on: {
            CLOSE: 'close',
          },
        },
      },
    },
    {
      guards: {
        isValidDate: () => {},
        canPrevDacade: ({ yearCalendar }) => yearCalendar[0] !== null,
        canNextDacade: ({ yearCalendar }) =>
          yearCalendar[yearCalendar.length - 1] !== null,
        isSameMonth: ({ calendarDate }, { payload: { year, month, day } }) =>
          isSameMonth(calendarDate, new Date(year, month, day)),
        isSameDacade: ({ yearCalendar }, { payload: { year } }) =>
          isSameDacade(yearCalendar[1], year),
      },
      actions: {
        init: assign({
          dayCalendar: ({ calendarDate }) =>
            generateCalender(
              calendarDate.getFullYear(),
              calendarDate.getMonth() + 1
            ),
          monthCalendar: ({ calendarDate }) =>
            generateMonthCalender(calendarDate.getFullYear()),
          yearCalendar: ({ calendarDate }) =>
            generateYearCalender(calendarDate.getFullYear()),
        }),
        updateDayCalendar: assign({
          dayCalendar: ({ calendarDate }) =>
            generateCalender(
              calendarDate.getFullYear(),
              calendarDate.getMonth() + 1
            ),
        }),
        updateMonthCalendar: assign({
          monthCalendar: ({ calendarDate }) =>
            generateMonthCalender(calendarDate.getFullYear()),
        }),
        updateCalendarDate: assign({
          calendarDate: (
            { calendarDate },
            { payload: { year, month, day } }
          ) => {
            const newDate = new Date(calendarDate)

            if (!isNil(year)) newDate.setFullYear(year)
            if (!isNil(month)) newDate.setMonth(month)
            if (!isNil(day)) newDate.setDate(day)

            return newDate
          },
        }),
        subtractCalendarDate: assign({
          calendarDate: ({ calendarDate }, _, { action: { payload } }) => {
            const { months, years } = payload

            return subtract(calendarDate, { months, years })
          },
        }),
        addCalendarDate: assign({
          calendarDate: ({ calendarDate }, _, { action: { payload } }) => {
            const { months, years } = payload

            return add(calendarDate, { months, years })
          },
        }),
        syncSelectedDateWithCalendar: sendParent(({ calendarDate }) => ({
          type: 'UPDATE',
          date: calendarDate,
        })),
        updateCalendar: assign({
          calendarDate: (_, { date }) => new Date(date),
        }),
        previousDecade: assign({
          yearCalendar: ({ yearCalendar }) =>
            generateYearCalender(yearCalendar[1] - 10),
        }),
        nextDecade: assign({
          yearCalendar: ({ yearCalendar }) =>
            generateYearCalender(yearCalendar[1] + 10),
        }),
      },
    }
  )
