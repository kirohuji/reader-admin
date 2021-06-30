import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/**
 * Adds the admin role if its the first user
 */
// Accounts.onCreateUser(({ profile }, user) => {
//   if (Meteor.users.findOne({})) {
//     return {
//       ...user,
//       profile,
//       roles: {
//         __global_roles__: ['reader'],
//       },
//     };
//   }

//   return {
//     ...user,
//     profile,
//     roles: {
//       __global_roles__: ['owner'],
//     },
//   };
// });
Accounts.config({ 
  loginExpirationInDays: 7
}); 
Meteor.publish(null,function(){
  if(this.userId){
    return Meteor.roleAssignment.find({'user._id': this.userId})
  }else{
    this.ready()
  }
})