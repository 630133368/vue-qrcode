# vue-qrcode


<qr-code :options="options" ref="qrcode"/>
option = {
          width: 300,  // canvas宽度
          height: 300,  // canvas长度
          background: '#fff',  // 固定字段 canvas背景色
          correctLevel: 2,  // canvas容错等级   1 - 4 
          foreground: '#000000', // canvas二维码填充色
          render: 'canvas', // canvas 渲染方法
          text: '', // canvas下方是否需要填写文本  ，  需要则直接输入文本  比如 "推广员 : AAA"
          codeUrl: '', // canvas 扫描的链接
          typeNumber: -1, // 固定字段
          imgSrc: '', // 是否需要在二维码中间存放图片， 需要则 直接输入图片链接
          imgWidth: 0,  // canvas 中间图片渲染大小
          imgHeight: 0, // canvas 中间图片渲染大小
          textConfig: { // canvas下方文本字段配置
              textHeight: 0,  // canvas下方文本字段占用高度
              fontSize: 36, // canvas 下方文本字段的大小
              color: '#000',  // canvas 下方文本字段的填充色
          },
      };
