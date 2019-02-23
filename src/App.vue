<template>
    <div id="app">
        <qr-code :options="options" ref="qrcode"/>
        <button @click="click">点击</button>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import qrCode from './components/QrCode.vue';
@Component({
    components: {
        qrCode,
    },
})
export default class App extends Vue {
    private value: string = 'https://www.baidu.com/';
    private img: any = require('./assets/logo.png');
    private options: any = {
        codeUrl: 'https://www.baidu.com/',
        imgSrc: this.img,
        imgWidth: 200,
        imgHeight: 100,
        text: '啊实打实大师打算奥术大师多发生的发生',
    }
    private click() {
        const qrcode: any = this.$refs.qrcode;
        qrcode.downLoad(0, 'aaa.png');
        // this.options.text = 'https://www.baidu.com/s?wd=%E6%96%B0%E6%B5%AA&rsv_spt=1&rsv_iqid=0xd715f2550006d165&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&oq=%25E6%25B7%2598%25E5%25AE%259D&inputT=1013&rsv_t=a53eTjZ%2FUcyIuzrcz%2BbdkEbcDT7Sx3T32a2gzCA%2BOOtzOmlgvTUOj2tiFaxmtpyhUutd&rsv_sug3=17&rsv_sug1=17&rsv_sug7=100&rsv_pq=b11e8f220006e2c3&rsv_sug2=0&rsv_sug4=2647';
        // this.options.imgSrc = this.img;
    }
}
</script>
