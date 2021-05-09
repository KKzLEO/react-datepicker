### Overview

Created date picker component by using React/XState
DEMO: https://kkzleo.github.io/react-datepicker/

#### Debug mode

If you wanna inspect XState machine, try to add url param `?debug=true` to open state chart

### Plugin/Library

1. styled-components
2. xstate
3. react
4. react-icons

### Environment

1. Node 14

### How to run

1. npm install
2. npm run start

### Props

| Name                 | Type           | Default        | Required? | Description                                                                                                            |
| -------------------- | -------------- | -------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| onChange             | func           | noop           | false     | A hook it will be triggered after user selected the date or inputted a correct date string.                            |
| value                | String or Date | new Date()     | false     | The initial value of date picker                                                                                       |
| label                | String         | ''             | false     | The text of date picker                                                                                                |
| format               | String         | YYYY/MM/DD     | false     | The format of date, if you enable input mode, it will be used to check if the input string is correct.                 |
| id                   | String         | ''             | false     | The ID of DOM                                                                                                          |
| ref                  | React Ref      | null           | false     | The ref of input                                                                                                       |
| className            | String         | ''             | false     | The class name of root component of date picker                                                                        |
| hasError             | Boolean        | false          | false     | Using helper text as error message and showing it below the input field                                                |
| helperText           | String         | ''             | false     | The text it will be displayed below the input field                                                                    |
| icon                 | node           | null           | false     | Icon of calendar                                                                                                       |
| canInput             | Boolean        | false          | false     | If true, user can input date string                                                                                    |
| invalidFormatMessage | String         | Invalid format | false     | If the input of date string is incorrect, the message will be displayed below the input field and OVERRIDE helper text |
