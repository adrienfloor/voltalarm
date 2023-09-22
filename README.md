# Getting Started with Voltalarm

This project is a technical assessment from [Volta Medical](https://www.volta-medical.com/). It consist of creating an ElectronJS app in Typescript with ReactJS. We want to build an alarm clock that handles alarm functionnality. It should persist data with the help of Sqlite (sqlite3 library). It uses React context for simple handling of state management as I think props drilling in ReactJS can quickly get dirty.

## How to

Git clone this project then cd into it. Install the dependencies :

### `npm install`

Run the app in the development mode.\
### `npm run electron:dev`

The page will reload if you make edits.\
You will also see any lint errors in the console.

**Note: this is an ongoing project, it is not tested yet**

If I had more time I would do more typing, use Jest for unit testing, and maybe install Cypress for some end to end testing. I would internationalize the app, make it more responsive, and add more features.

This has not been used in production mode yet, so this would have to be tested. Please note that I am running this app on a Mac with M1 pro chip with macOS Monterey 12.4. I have not tested the app on Windows nor Linux.

I have used Tailwind CSS and DaisyUI library (black theme) to quickly get up and running with the UI.

## Some resources I have used to bootstrap this project

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

[I took a lood at this boilerplate](https://github.com/yhirose/react-typescript-electron-sample-with-create-react-app-and-electron-builder#react-typescript-electron-sample-with-create-react-app-and-electron-builder)

[Node Sqlite3](https://www.npmjs.com/package/sqlite3)

[Tailwind CSS](https://tailwindcss.com/)

[DaisyUI](https://daisyui.com/)
