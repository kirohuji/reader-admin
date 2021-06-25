import user, { plugin as UserPlugin } from './modules/user';
import app from './modules/app'
import permission from './modules/permission'
import getters from './getters'
export default {
  plugins: [UserPlugin], // Connects Meteor's reactive user state to the store using Tracker
  modules: {
    user,
    app,
    permission
  },
  getters
};
