import { MessageBox } from "element-ui";
import { Message } from "element-ui";
import { postFormAPI, getCategory } from "../api/api";
export default {
  install(Vue) {
    Vue.prototype.deleteConfirm = (params) => {
      MessageBox.confirm(params.content, params.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.type || "warning"
      })
        .then(() => {
          params.fn;
          Message.success({
            message: "删除成功!"
          });
        })
        .catch(() => {
          Message.success({
            message: "已取消删除"
          });
        });
    };
    Vue.prototype.showNum = () => {
      console.log("调用了全局方法");
    };
    Vue.prototype.unixTimeToDateTime = (time) => {
      // var timeTrans = new Date(parseInt(time) * 1000);
      // return timeTrans.toLocaleString("chinese", { hour12: false });

      let now = new Date(time * 1000);
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      let hour = now.getHours() < 12 ? now.getHours() + 12 : now.getHours();
      let minute = now.getMinutes();
      return year + "/" + month + "/" + date + "   " + hour + ":" + minute;
    };
  }
};
