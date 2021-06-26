<template>
  <div style="margin;8px">
    <!-- <Card style="padding: 14px; margin: 8px">
      <DataSearchForm :forms="forms" />
      <input
        prepend-icon="file"
        type="file"
        truncate-length="15"
        label="上传新文件"
        id="fileinput"
        :disabled="uploader.inProgress"
        ref="fileinput"
        @change="uploadIt"
      />
    </Card> -->
    <div>
      <DataTable
        header-row-class-name="color-header"
        :column="table.column"
        :data="books"
      >
        <template v-slot:cover="{row}">
          <img
            :src="row.cover"
            width="100"
            height="100"
          />
        </template>
        <!-- <template v-slot:url="{row}">
          <a :href="getUrl(row.fileId)">下载地址</a>
        </template> -->
        <!-- <template v-slot:operation>
          <el-button size="small">删除</el-button>
        </template> -->
      </DataTable>
    </div>
  </div>
</template>

  <script>
import DataTable from '../../components/organisms/DataTable'
import DataSearchForm from '../../components/organisms/DataSearchForm'
import Card from '../../components/atoms/Card'
import UserFiles from '../../../lib/features/books/app/collections';
import { Books } from '../../../lib/features/books/app/collections'
import _ from 'lodash'
import localforage from 'localforage'
import SparkMD5 from "spark-md5";
import BookModel from '../../utils/BookModel'
import BookUtil from '../../utils/BookUtil'
export default {
  components: {
    DataTable,
    DataSearchForm,
    Card
  },
  meteor: {
    $subscribe: {
      // We subscribe to the 'threads' publication
      books: [],
      userfiles: []
    },
    books () {
      console.log('收到', Books.find())
      return Books.find();
    },
  },
  filters: {
    size (size) {
      return `${(size / 1000000).toFixed(2)}Mb`
    }
  },
  data () {
    return {
      fileInfo: null,
      uploader: {
        id: null,
        uploading: [],
        progress: 0,
        inProgress: false
      },
      forms: {
        col: 3,
        fields: [
          {
            label: '预警时间',
            prop: 'date',
            component: 'date-picker',
            type: 'datetime',
            placeholder: '选择日期',
            'value-format': 'yyyy-MM-dd HH:mm',
            format: 'yyyy-MM-dd HH:mm',
            size: 'small',
          },
          {
            label: '审核时间',
            prop: 'aduit',
            component: 'date-picker',
            type: 'datetime',
            placeholder: '选择日期',
            'value-format': 'yyyy-MM-dd HH:mm',
            format: 'yyyy-MM-dd HH:mm',
            size: 'small',
          },
          {
            label: '所属地区',
            prop: 'address',
            component: 'address',
            size: 'small',
          },
          {
            label: '预警来源',
            prop: 'source',
            component: 'select',
            size: 'small',
            options: [
              {
                label: '不限',
                value: null,
              },
              {
                label: '居民自报',
                value: 1,
              },
              {
                label: '系统预警',
                value: 2,
              },
            ],
          },
          {
            label: '居民类型',
            prop: 'pType',
            component: 'select',
            size: 'small',
            options: [
              {
                label: '不限',
                value: null,
              },
              {
                label: '脱贫监测户',
                value: 1,
              },
              {
                label: '边缘户',
                value: 2,
              },
              {
                label: '其他居民',
                value: 3,
              },
            ],
          },
          {
            label: '审核状态',
            prop: 'status',
            component: 'select',
            size: 'small',
            options: [
              {
                label: '不限',
                value: null,
              },
              {
                label: '待审核',
                value: 1,
              },
              {
                label: '已审核',
                value: 2,
              },
              {
                label: '未审核',
                value: 3,
              },
              {
                label: '已取消',
                value: 4,
              },
            ],
          },
        ],
      },
      table: {
        column: [
          {
            prop: 'cover',
            label: '封面',
            scopedSlots: true,
            width: 130
          },
          {
            prop: 'name',
            label: '名称',
            width: 150
          },
          {
            prop: 'author',
            label: '作者',
            with: 100

          },
          {
            prop: 'description',
            label: '描述信息',
            'show-overflow-tooltip': true
          },
          {
            prop: 'publisher',
            label: '出版社',
            width: 150
          },
          {
            prop: 'url',
            label: '下载地址',
            scopedSlots: true,
            width: 200
          },
          {
            prop: 'operation',
            label: '操作',
            width: '100',
            scopedSlots: true,
          },
        ],
      },
    }
  },
  computed: {
    hasUploading () {
      return !_.isEmpty(this.uploader.uploading)
    }
  },
  methods: {
    getUrl (id) {
      const result = UserFiles.findOne({ _id: id })

      if (result) {
        return result.link();
      } else {
        return false
      }

    },
    uploadIt (e) {
      e.preventDefault();
      console.log(e.currentTarget.files[0])
      let file = e.currentTarget.files[0]
      if (file) {
        let uploadInstance = UserFiles.insert({
          file: file,
          meta: {
            locator: this.fileLocator,
            userId: Meteor.userId()
          },
          chunkSize: 'dynamic',
          allowWebWorkers: true
        }, false)
        this.uploading = uploadInstance;
        this.inProgress = true
        uploadInstance.on('start', () => {
          console.log('Starting')
        })
        uploadInstance.on('end', (error, fileObj) => {
          console.log('On end File Object:', fileObj)
        })
        uploadInstance.on('uploaded', (error, fileObj) => {
          if (window.FileReader) {
            console.log('lll')
            this.uploader.id = fileObj._id
            this.getMd5WithBrowser(file, this.uploader.id)
          }
        })
        uploadInstance.on('error', (error, fileObj) => {
          alert('上传错误:', error)
        })
        uploadInstance.on('progress', (progress, fileObj) => {
          console.log('Upload Percentage:', progress)
          this.progress = progress
        })
        uploadInstance.start()
      }
    },
    removeFile (item) {
      let conf = confirm('Are you sure you want to delete the file?') || false;
      if (conf == true) {
        Meteor.call('RemoveFile', { _id: item._id }, function (err, res) {
          if (err)
            console.log(err);
        })
      }
    },
    renameFile (item) {

      let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
      let prompt = window.prompt('New file name?', item.fileName);

      // Replace any non valid characters, also do this on the server
      if (prompt) {
        prompt = prompt.replace(validName, '-');
        prompt.trim();
      }

      if (!_.isEmpty(prompt)) {
        Meteor.call('RenameFile', item._id, prompt, function (err, res) {
          if (err)
            console.log(err);
        })
      }
    },
    handleAddBook (book, id) {
      let self = this;
      return new Promise((resolve, reject) => {
        localforage.getItem('books').then(bookArr => {
          if (bookArr == null) {
            bookArr = [];
          }
          bookArr.push(book);
          localforage
            .setItem("books", bookArr)
          Meteor.call('books.add', {
            fileId: id,
            ...book
          })
          console.log()
          this.uploader = {
            id: null,
            uploading: [],
            progress: 0,
            inProgress: false
          }
          console.log('handleAddBook', book)
        })
      });
    },
    handleBook (file, md5, id) {
      let self = this;
      let extension = file.name.split(".").reverse()[0];
      let bookName = file.name.substr(0, file.name.length - extension.length - 1);
      let book = null
      return new Promise((resolve, reject) => {
        //md5重复不导入
        let isRepeat = false;
        localforage.getItem('books').then(bookArr => {
          if (bookArr == null) {
            bookArr = [];
          }
          if (bookArr.length > 0) {
            bookArr.forEach((item) => {
              if (item.md5 === md5) {
                isRepeat = true;
                resolve();
              }
            });
          }
          //解析图书，获取图书数据
          if (!isRepeat) {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = async (e) => {
              if (!e.target) {
                reject();
                throw new Error();
              }
              let cover = "";
              const epub = ePub(e.target.result, "binary");
              console.log('epub')
              epub.loaded.metadata
                .then((metadata) => {
                  if (!e.target) {
                    reject();
                    throw new Error();
                  }
                  epub
                    .coverUrl()
                    .then(async (url) => {
                      if (url) {
                        var reader = new FileReader();
                        let blob = await fetch(url)
                          .then((r) => r
                            .blob());
                        reader.readAsDataURL(blob);
                        console.log('coverUrl')
                        reader.onloadend =
                          async () => {

                            cover = reader
                              .result;
                            let key,
                              name,
                              author,
                              description,
                              publisher;
                            [name, author,
                              description,
                              publisher
                            ] = [
                                metadata.title,
                                metadata
                                  .creator,
                                metadata
                                  .description,
                                metadata
                                  .publisher,
                              ];
                            let format =
                              "EPUB";
                            key = new Date()
                              .getTime() +
                              "";

                            let book =
                              new BookModel(
                                key,
                                name,
                                author,
                                description,
                                md5,
                                cover,
                                format,
                                publisher
                              );
                            console.log('key')
                            this.handleAddBook(
                              book, id)
                            BookUtil.addBook(
                              key, e
                                .target
                              .result);
                            resolve();
                          };
                      } else {
                        cover = "noCover";
                        let key,
                          name,
                          author,
                          publisher,
                          description;
                        [name, author, description,
                          publisher
                        ] = [
                            metadata.title,
                            metadata.creator,
                            metadata.description,
                            metadata.publisher,
                          ];
                        let format =
                          "EPUB";
                        key = new Date().getTime() +
                          "";
                        let book = new BookModel(
                          key,
                          name,
                          author,
                          description,
                          md5,
                          cover,
                          format,
                          publisher
                        );
                        this.handleAddBook(book);
                        BookUtil.addBook(key, e.target
                          .result);
                        resolve();
                      }
                    })
                    .catch((err) => {
                      console.log(err, "err");
                      reject();
                    });
                })
                .catch(() => {
                  console.log("Error occurs");
                  reject();
                });

            }

          }
        })
      });
    },
    getMd5WithBrowser (file, id) {
      let extension = file.name.split(".").reverse()[0];
      return new Promise((resolve, reject) => {
        //这里假设直接将文件选择框的dom引用传入
        //这里需要用到File的slice( )方法，以下是兼容写法

        var blobSlice =
          (File).prototype.slice ||
          (File).prototype.mozSlice ||
          (File).prototype.webkitSlice,
          chunkSize = 2097152, // 以每片2MB大小来逐次读取
          chunks = Math.ceil(file.size / chunkSize),
          currentChunk = 0,
          spark = new SparkMD5(), //创建SparkMD5的实例
          fileReader = new FileReader();
        fileReader.onload = async (e) => {
          if (!e.target) {
            reject();
            throw new Error();
          }
          spark.appendBinary(e.target.result); // append array buffer
          currentChunk += 1;
          if (currentChunk < chunks) {
            loadNext();
          } else {
            let md5 = spark.end(); // 完成计算，返回结果
            await this.handleBook(file, md5, id);
            resolve();
          }
        };

        const loadNext = () => {
          var start = currentChunk * chunkSize,
            end = start + chunkSize >= file.size ? file.size : start + chunkSize;

          fileReader.readAsBinaryString(blobSlice.call(file, start, end));
        };

        loadNext();
      });
    }
  },
}
  </script>
<style>
</style>