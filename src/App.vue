<template>
  <div id="app">
    <div class="main">
      <div class="buttonGroup">
        <a-button @click="onAdd" class="button addStyle">新增</a-button>
        <a-button @click="onEdit" :disabled="editDataLength !== 1" class="button editStyle">编辑</a-button>
        <a-button @click="onDelete" :disabled="editDataLength == 0" class="button deleteStyle">删除</a-button>
      </div>
      <div class="container1">
        <!-- 任务 -->
        <div class="part part1">
          <div class="title">
            <span>未分类</span>
            <span class="tag">[{{ ToDoList.length }}]</span>
          </div>
          <a-checkbox-group @change="onChange1">
            <a-checkbox class="content" v-for="(item, index) in ToDoList" :key="index" :value="item">
              {{ item.title }}
              <div class="timeDes">
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px">创建时间：{{ item?.date_time }}</span>
                  <!-- <a-tag class="timeline" color="rgba(9, 149, 192, 1)">{{ item?.date_time }}</a-tag> -->
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.keyword">关键词：{{ item?.keyword }}</span>
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.usetime1 && item?.usetime1 != 0">
                    计划用时：{{ item?.usetime1 }}
                  </span>
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.usetime1_1 && item?.usetime1_1 != 0">
                    已经用时：{{ item?.usetime1_1 }}
                  </span>
                </div>
              </div>
            </a-checkbox>
          </a-checkbox-group>
        </div>
        <!-- 正在做的任务 -->
        <div class="part part2">
          <div class="title">
            <span>正在做</span>
            <span class="tag">[{{ DoingList.length }}]</span>
          </div>
          <a-checkbox-group @change="onChange2">
            <a-checkbox class="content" v-for="(item, index) in DoingList" :key="index" :value="item">
              {{ item.title }}
              <div class="timeDes">
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px">创建时间：{{ item?.date_time }}</span>
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.keyword">关键词：{{ item?.keyword }}</span>
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.usetime1 && item?.usetime1 != 0">
                    计划用时：{{ item?.usetime1 }}
                  </span>
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.usetime1_1 && item?.usetime1_1 != 0">
                    已经用时：{{ item?.usetime1_1 }}
                  </span>
                </div>
              </div>
            </a-checkbox>
          </a-checkbox-group>
        </div>
        <div class="part part3">
          <div class="title">
            <span>已完成</span>
            <span class="tag">[{{ DoneList.length }}]</span>
          </div>
          <a-checkbox-group @change="onChange3">
            <a-checkbox class="content content3" v-for="(item, index) in DoneList" :key="index" :value="item">
              {{ item.title }}
              <div class="timeDes">
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px">创建时间：{{ item?.date_time }}</span>
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.keyword">关键词：{{ item?.keyword }}</span>
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.usetime1 && item?.usetime1 != 0">
                    计划用时：{{ item?.usetime1 }}
                  </span>
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.usetime1_1 && item?.usetime1_1 != 0">
                    已经用时：{{ item?.usetime1_1 }}
                  </span>
                </div>
                <div>
                  <span style="color: rgb(33, 99, 119); font-size: 14px" v-if="item?.finish_time">完成时间：{{ item?.finish_time }}</span>
                  <!-- <a-tag class="timeline" color="rgba(9, 149, 192, 1)">{{ item?.date_time }}</a-tag> -->
                </div>
              </div>
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </div>
    </div>
    <a-modal
      :title="titles"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      cancelText="取消"
      okText="确定"
      class="popUp"
    >
      <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
        <a-form-model-item label="类别" prop="type">
          <a-select v-model="form.type" @change="handleChangeForm" placeholder="请选择类别">
            <a-select-option value="1">未分类</a-select-option>
            <a-select-option value="2">正在做</a-select-option>
            <a-select-option value="3">已完成</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="内容" prop="name">
          <a-input v-model="form.name" type="textarea" />
        </a-form-model-item>
        <a-form-model-item label="关键词">
          <a-input v-model="form.keyword" />
        </a-form-model-item>
        <a-form-model-item label="选择创建时间">
          <a-date-picker
            :show-time="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            placeholder="选择创建时间"
            v-model="form.date_time"
            @change="onChangeTime"
            @ok="onOkTime"
          />
          <!-- <a-date-picker :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" placeholder="选择时间" v-model="form.date_time" /> -->
        </a-form-model-item>
        <div style="display: flex; justify-content: flex-start">
          <a-form-model-item v-show="form.type == 2" label="计划用时">
            <a-input-number :min="0" v-model="form.usetime1" />
          </a-form-model-item>
          <a-form-model-item v-show="form.type == 2" label="已用时">
            <a-input-number :min="0" v-model="form.usetime1_1" />
          </a-form-model-item>
        </div>
        <a-form-model-item label="选择完成时间" v-show="form.type == 3">
          <a-date-picker
            :show-time="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            placeholder="选择完成时间"
            v-model="form.finish_time"
            @change="onChangeTimeFinish"
            @ok="onOkTimeFinish"
          />
          <!-- <a-date-picker :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" placeholder="选择时间" v-model="form.date_time" /> -->
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
export default {
  name: 'App',
  components: {},
  computed: {
    editDataLength() {
      return this.editDataList1.length + this.editDataList2.length + this.editDataList3.length;
    },
    editDataListAll() {
      return [...this.editDataList1, ...this.editDataList2, ...this.editDataList3];
    },
  },
  created() {
    // this.$message.success('操作成功！');
    this.init();
  },
  data() {
    return {
      titles: '卡片新增',
      // ToDo（任务）
      ToDoList: [],
      // Doing（正在做的任务）
      DoingList: [],
      // ReView（完成待验收）（待复盘）
      ReViewList: [],
      // Done（完成的任务）
      DoneList: [],
      visible: false,
      confirmLoading: false,
      date: undefined,
      year: undefined,
      month: undefined,
      dates: undefined,
      hour: undefined,
      minutes: undefined,
      seconds: undefined,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      form: {
        name: '',
        time: '',
        date_time: '',
        type: undefined,
        usetime1: 0,
        usetime1_1: 0,
        finish_time: '', // 完成时间
        keyword: '',
      },
      rules: {
        type: [{ required: true, message: '请选择类别', trigger: 'blur' }],
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }],
      },
      id: '',
      url: '',
      editDataList1: [], // 编辑数据列表
      editDataList2: [], // 编辑数据列表
      editDataList3: [], // 编辑数据列表
      deleteurl: '', // 删除的 url
      methodstype: 1, // 区别方法，1 表示新增，2 表示编辑
      styleObj: {
        top: '40px',
      },
    };
  },
  methods: {
    async init() {
      await this.init1();
      await this.init2();
      await this.init3();
    },
    init1() {
      return new Promise((resolve, reject) => {
        axios({
          // 设置请求类型
          method: 'GET',
          url: `http://localhost:2135/todolist?timestamp=${new Date().getTime()}`,
        }).then(response => {
          console.log(response);
          this.ToDoList = response.data.reverse();
          resolve();
        });
      });
    },
    init2() {
      return new Promise((resolve, reject) => {
        axios({
          // 设置请求类型
          method: 'GET',
          url: `http://localhost:2135/doinglist?timestamp=${new Date().getTime()}`,
        }).then(response => {
          console.log(response);
          this.DoingList = response.data.reverse();
          resolve();
        });
      });
    },
    init3() {
      return new Promise((resolve, reject) => {
        axios({
          // 设置请求类型
          method: 'GET',
          url: `http://localhost:2135/donelist?timestamp=${new Date().getTime()}`,
        }).then(response => {
          console.log(response);
          this.DoneList = response.data.reverse();
          resolve();
        });
      });
    },
    onChange1(e) {
      console.log(e);
      this.editDataList1 = e;
    },
    onChange2(e) {
      console.log(e);
      this.editDataList2 = e;
    },
    onChange3(e) {
      console.log(e);
      this.editDataList3 = e;
    },
    // 再进行一次判断，未分类中无“用时”，正在做中有一个“用时”，已完成中可以有一个“用时”，也可以有两个用时；
    handleChangeForm(e) {
      if (e == 2) {
        this.form.usetime1 = this.editDataListAll[0]?.usetime1 ? this.editDataListAll[0].usetime1 : 0;
      } else if (e == 3) {
        this.form.usetime1_1 = this.editDataListAll[0]?.usetime1 ? this.editDataListAll[0].usetime1 : 0;
      }
    },
    getTime() {
      this.date = new Date();
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth() + 1;
      this.month = this.month < 10 ? '0' + this.month : this.month;
      this.dates = this.date.getDate();
      this.dates = this.dates < 10 ? '0' + this.dates : this.dates;
      this.hour = this.date.getHours();
      this.hour = this.hour < 10 ? '0' + this.hour : this.hour;
      this.minutes = this.date.getMinutes();
      this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
      return `${this.year}-${this.month}-${this.dates} ${this.hour}:${this.minutes}`;
    },
    parcent1(item) {
      if (item.usetime1 == 0 || !item.usetime1) {
        return 100 * 1;
      } else {
        return ((item.usetime1_1 / item.usetime1) * 100).toFixed(0);
      }
    },
    // 卡片新增
    onAdd() {
      this.visible = true;
      this.methodstype = 1;
      this.titles = '卡片新增';
    },
    // 编辑采取的策略的是复制一条新的数据出来，再将原来的删除掉
    onEdit() {
      this.visible = true;
      this.methodstype = 2;
      this.titles = '卡片编辑';
      console.log('this.editDataListAll', this.editDataListAll);
      this.form.name = this.editDataListAll[0].title;
      this.form.keyword = this.editDataListAll[0].keyword;
      this.form.date_time = this.editDataListAll[0].date_time || this.getTime();
      this.form.type = this.editDataListAll[0].identifying;
      this.form.usetime1 = this.editDataListAll[0].usetime1 ? this.editDataListAll[0].usetime1 : 0;
      this.form.usetime1_1 = this.editDataListAll[0].usetime1_1 ? this.editDataListAll[0].usetime1_1 : 0;
      this.form.finish_time = this.editDataListAll[0].finish_time || '';
    },
    // 这里没有将多个 axios 分开，而是使用了 async 和 await 来规定它们的执行顺序
    async handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          new Promise((resolve, reject) => {
            if (this.form.type == 1) {
              this.url = `http://localhost:2135/todolist?timestamp=${new Date().getTime()}`;
            } else if (this.form.type == 2) {
              this.url = `http://localhost:2135/doinglist?timestamp=${new Date().getTime()}`;
            } else {
              this.url = `http://localhost:2135/donelist?timestamp=${new Date().getTime()}`;
            }
            resolve();
          }).then(() => {
            // 发送 AJAX 请求 (向服务端发送一个post类型的请求)
            axios({
              // 设置请求类型
              method: 'POST',
              // url
              url: this.url,
              // 设置请求体
              data: {
                id: nanoid(),
                title: this.form.name,
                keyword: this.form.keyword,
                date_time: this.form.date_time || this.getTime(),
                identifying: this.form.type,
                usetime1: this.form.usetime1,
                usetime1_1: this.form.usetime1_1,
                finish_time: this.form.type != 3 ? '' : this.form.finish_time || this.getTime(),
              },
            }).then(response => {
              this.visible = false;
              this.confirmLoading = false;
              this.form = {
                name: '',
                keyword: '',
                date_time: '',
                type: undefined,
                usetime1: 0,
                usetime1_1: 0,
                finish_time: '',
              };
              // 如果是编辑，要执行编辑中删除方法（该方法中有 init()（刷新页面）的定义）。
              if (this.methodstype == 2) {
                this.editOut();
              } else {
                // 如果是新增，要执行 init() 方法（刷新页面）
                this.init();
                // 如果是新增方法，执行完成后要清空这三个数组
                this.editDataList1 = [];
                this.editDataList2 = [];
                this.editDataList3 = [];
              }
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCancel() {
      this.visible = false;
      this.form = {
        name: '',
        date_time: '',
        time: '',
        type: undefined,
        usetime1: 0,
        usetime1_1: 0,
      };
    },
    // 编辑中删除
    editOut() {
      const identifying = this.editDataListAll[0].identifying;
      let url = '';
      switch (identifying) {
        case '1':
          url = `http://localhost:2135/todolist/${this.editDataListAll[0].id}`;
          break;
        case '2':
          url = `http://localhost:2135/doinglist/${this.editDataListAll[0].id}`;
          break;
        default:
          url = `http://localhost:2135/donelist/${this.editDataListAll[0].id}`;
      }

      axios({
        method: 'delete',
        url: ` ${url}?timestamp=${new Date().getTime()}`,
      })
        .then(response => {
          this.init();
          this.editDataList1 = [];
          this.editDataList2 = [];
          this.editDataList3 = [];
        })
        .catch(err => {
          this.init();
          this.editDataList1 = [];
          this.editDataList2 = [];
          this.editDataList3 = [];
        });
    },
    // 删除
    onDelete() {
      var that = this; // 把 this 里面的所有传给了 that
      this.$confirm({
        title: '您是否要删除此条数据?',
        icon: 'info-circle',
        okText: '是',
        cancelText: '否',
        onOk() {
          that.fetchSequentialData(that.editDataListAll);
          that.editDataList1 = [];
          that.editDataList2 = [];
          that.editDataList3 = [];
        },
        onCancel() {
          that.editDataList1 = [];
          that.editDataList2 = [];
          that.editDataList3 = [];
          that.init();
        }, // 取消
      });
    },

    // 批量删除
    async fetchSequentialData(urls) {
      const results = [];
      for (const url of urls) {
        try {
          if (url.identifying == 1) {
            await axios({
              method: 'delete',
              url: `http://localhost:2135/todolist/${url.id}?timestamp=${new Date().getTime()}`,
            }).then(response => {
              this.init();
            });
          } else if (url.identifying == 2) {
            await axios({
              method: 'delete',
              url: `http://localhost:2135/doinglist/${url.id}?timestamp=${new Date().getTime()}`,
            }).then(response => {
              this.init();
            });
          } else {
            await axios({
              method: 'delete',
              url: `http://localhost:2135/donelist/${url.id}?timestamp=${new Date().getTime()}`,
            }).then(response => {
              this.init();
            });
          }
        } catch (error) {
          console.error(`Error fetching ${url}: ${error}`);
        }
      }
      return results;
    },

    // 创建时时间选择
    onChangeTime(a, time) {
      console.log(a, time);
      this.form.date_time = time;
    },
    onOkTime() {},
    // 完成时时间选择
    onChangeTimeFinish(a, time) {
      console.log(a, time);
      this.form.finish_time = time;
    },
    onOkTimeFinish() {},
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
<style scoped lang="less">
.main {
  width: 100vw;
  height: 100vh;
  // background-image: url('./assets/bg.jpg');
  background-size: 100%;
  display: flex;
  justify-content: center;
  // align-items: center;
  overflow-x: hidden;
  position: relative;
  .mask1 {
    position: absolute;
    width: 100vw;
    height: 100%;
    z-index: -1000;
  }
  .buttonGroup {
    width: 12vw;
    height: 16vh;
    position: relative;
    border-radius: 6px;
    display: flex;
    flex-flow: column;
    .button {
      border-radius: 6px;
      border: 0px;
      box-shadow: 0 0 3px rgba(192, 192, 192, 1);
      font-family: '华文行楷';
      font-size: 18px;
      margin-right: 12px;
      // padding: 0 22px;
      margin-bottom: 10px;
    }
    .addStyle {
      margin-top: 1vh;
    }
  }

  .container1 {
    width: 68vw;
    height: 98vh;
    margin-top: 1vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .part {
      width: 30%;
      padding: 0px 10px 15px;
      overflow: auto;
      cursor: pointer;
      height: 100%;
      border-radius: 12px;
      .title {
        font-family: '华文行楷';
        font-weight: 400;
        text-align: center;
        font-size: 28px;
        padding-bottom: 8px;
        border-bottom: 1px solid #fff;
        width: 100%;
        height: 50px;
        position: relative;
        line-height: 50px;
        .tag {
          font-size: 14px;
          padding-left: 8px;
          position: absolute;
          top: 0;
          right: 0;
          line-height: 20px;
          color: #111;
          font-family: '微软雅黑';
          font-weight: 400;
        }
      }
      .content {
        width: 100%;
        margin-top: 8px;
        border-radius: 8px;
        padding: 15px 6px;
        font-size: 16px;
        position: relative;
        color: #111;
        box-shadow: 0 0 3px #777;
        .timeDes {
          display: inline-block;
          width: 100%;
          margin-top: 8px;
          padding: 8px;
          border-radius: 6px;
          box-shadow: 0 0 2px #bbb;
          .timeline {
            text-align: center;
          }
          .taghour {
            width: 80px;
            text-align: center;
          }
          .timeDes1 {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 4px 0;
          }
        }
      }
      .content3 {
        text-decoration: line-through;
      }
    }
    .part1 {
      background-color: rgba(151, 227, 250, 1);
      .content {
        background-color: rgba(213, 243, 252, 1);
      }
    }
    .part2 {
      background-color: rgba(235, 172, 231, 1);
      .content {
        background-color: rgba(252, 227, 250, 1);
      }
    }
    .part3 {
      background-color: rgba(155, 134, 231, 1);
      .content {
        background-color: rgba(218, 210, 250, 1);
      }
    }
  }
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 12px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 6px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:active {
  background: rgba(255, 0, 0, 0.4);
}
</style>
<style scoped>
.part >>> .ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0px;
}
.part >>> .ant-checkbox-group {
  display: block;
}
.part >>> .ant-checkbox {
  top: -0.16em;
}

.popUp >>> .ant-calendar-picker {
  width: 100% !important;
}
</style>

<style>
textarea.ant-input {
  height: 136px !important;
  min-height: 136px !important;
  max-height: 136px !important;
}

.ant-calendar-time-picker-select {
  overflow-y: auto !important;
}
</style>
