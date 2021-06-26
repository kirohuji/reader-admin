<template>
  <div style="display: flex;
    justify-content: center;">
    <el-transfer
      style="text-align: left; display: inline-block"
      :value="myBooks"
      filterable
      :titles="['书库', '我的书架']"
      :button-texts="['到左边', '到右边']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="booksByUserId"
    >
      <span slot-scope="{ option }">{{ option.label }}</span>
    </el-transfer>
  </div>
</template>

<script>
import { Books, UsersBooks } from '../../../../lib/features/books/app/collections'
export default {
  props: ['userId'],
  meteor: {
    $subscribe: {
      usersbooks: [],
      books: []
    },
    booksByUserId () {
      return Books.find().fetch().map(item => {
        return {
          key: item._id,
          label: item.name,
          disabled: item.userId ? false : item.userId === this.userId
        }
      })
    },
    myBooks () {
      const userBookLinker = Meteor.users.getLink(this.userId, 'books');
      return userBookLinker.find().fetch().map(item => item._id)
    },
  },
  methods: {
    handleChange (value, direction, movedKeys) {
      switch (direction) {
        case 'right':
          value.forEach(element => {
            Meteor.call('books.insert', {
              bookId: element,
              userId: this.userId
            })
          });
          break;
        case 'left':
          movedKeys.forEach(element => {
            Meteor.call('books.remove', {
              bookId: element,
              userId: this.userId
            })
          });
          break;
      }
    }
  }
};
</script>
<style>
</style>